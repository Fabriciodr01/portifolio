// Converts a triangle-mesh OBJ into the hologram file read by src/components/ship/ShipScan.tsx.
//
// The source OBJ (~22 MB, 200k triangles) is far too heavy for a web page, so it is reduced to two things:
//   - a simplified hull, drawn as a dark solid so lines behind the ship are hidden (that occlusion is what makes the
//     in-game hologram readable, versus a see-through wireframe);
//   - "feature" edges of that same hull: open boundaries and creases sharper than `angle` degrees, longer than
//     `minLength` (fraction of the longest axis). Taking them from the simplified hull rather than the original
//     keeps every line exactly on the surface it is drawn over, so none of them sink behind it.
//
// Usage: node scripts/obj-to-edges.mjs <in.obj> <out.bin> [triangles=12000] [angle=50] [minLength=0.004]
//
// Output: two blocks, edges then hull, both laid out as (little endian)
//   Uint32[4]  vertexCount, indexCount, wideIndices (0|1), reserved
//   Int16[vertexCount*3]  positions, centred on the bounding box and scaled so the longest axis spans [-1, 1]
//   (padding to 4 bytes)
//   Uint16|Uint32[indexCount]  indices (line pairs for edges, triangles for the hull)
//   (padding to 4 bytes)
import { readFileSync, statSync, writeFileSync } from 'node:fs'
import { MeshoptSimplifier } from 'meshoptimizer'

const [, , input, output, trisArg = '12000', angleArg = '50', minLengthArg = '0.004'] = process.argv
if (!input || !output) {
  console.error('usage: node scripts/obj-to-edges.mjs <in.obj> <out.bin> [triangles] [angle] [minLength]')
  process.exit(1)
}

const raw = []
const tris = []
for (const line of readFileSync(input, 'utf8').split('\n')) {
  if (line.startsWith('v ')) {
    const p = line.trim().split(/\s+/)
    raw.push(+p[1], +p[2], +p[3])
  } else if (line.startsWith('f ')) {
    const idx = line.trim().split(/\s+/).slice(1).map((t) => {
      const n = parseInt(t, 10)
      return n < 0 ? raw.length / 3 + n : n - 1
    })
    for (let i = 1; i + 1 < idx.length; i++) tris.push(idx[0], idx[i], idx[i + 1])
  }
}

const min = [Infinity, Infinity, Infinity]
const max = [-Infinity, -Infinity, -Infinity]
for (let i = 0; i < raw.length; i += 3) {
  for (let k = 0; k < 3; k++) {
    min[k] = Math.min(min[k], raw[i + k])
    max[k] = Math.max(max[k], raw[i + k])
  }
}
const longest = Math.max(...max.map((m, k) => m - min[k]))

// OBJ exporters duplicate vertices at UV/normal seams; weld them so the simplifier and the edge pass see shared edges.
const eps = longest * 1e-5
const welded = []
const weldKey = new Map()
const remap = new Uint32Array(raw.length / 3)
for (let i = 0; i < remap.length; i++) {
  const key = `${Math.round(raw[i * 3] / eps)},${Math.round(raw[i * 3 + 1] / eps)},${Math.round(raw[i * 3 + 2] / eps)}`
  let id = weldKey.get(key)
  if (id === undefined) {
    id = welded.length / 3
    weldKey.set(key, id)
    welded.push(raw[i * 3], raw[i * 3 + 1], raw[i * 3 + 2])
  }
  remap[i] = id
}
const positions = new Float32Array(welded)
const source = Uint32Array.from(tris, (v) => remap[v])

// Prune drops small disconnected pieces (antennas, greebles) that would only add noise at panel size.
await MeshoptSimplifier.ready
const [hull] = MeshoptSimplifier.simplify(source, positions, 3, Number(trisArg) * 3, 0.02, ['Prune'])

// Edge key packs both vertex ids into one number (ids stay well below 2^26, so the product is exact).
const PACK = 2 ** 26
const crease = Math.cos((Number(angleArg) * Math.PI) / 180)
const minLength = Number(minLengthArg) * longest
const edgeNormals = new Map()
for (let t = 0; t < hull.length; t += 3) {
  const a = hull[t], b = hull[t + 1], c = hull[t + 2]
  if (a === b || b === c || a === c) continue
  const ux = positions[b * 3] - positions[a * 3], uy = positions[b * 3 + 1] - positions[a * 3 + 1], uz = positions[b * 3 + 2] - positions[a * 3 + 2]
  const vx = positions[c * 3] - positions[a * 3], vy = positions[c * 3 + 1] - positions[a * 3 + 1], vz = positions[c * 3 + 2] - positions[a * 3 + 2]
  let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx
  const len = Math.hypot(nx, ny, nz)
  if (len === 0) continue
  nx /= len; ny /= len; nz /= len
  for (const [p, q] of [[a, b], [b, c], [c, a]]) {
    const key = p < q ? p * PACK + q : q * PACK + p
    const list = edgeNormals.get(key)
    if (list) list.push(nx, ny, nz)
    else edgeNormals.set(key, [nx, ny, nz])
  }
}

const edges = []
for (const [key, n] of edgeNormals) {
  const a = Math.floor(key / PACK), b = key % PACK
  const length = Math.hypot(positions[a * 3] - positions[b * 3], positions[a * 3 + 1] - positions[b * 3 + 1], positions[a * 3 + 2] - positions[b * 3 + 2])
  if (length < minLength) continue
  let feature = n.length === 3
  for (let i = 3; !feature && i < n.length; i += 3) feature = n[0] * n[i] + n[1] * n[i + 1] + n[2] * n[i + 2] < crease
  if (feature) edges.push(a, b)
}

const centre = min.map((m, k) => (m + max[k]) / 2)
const half = longest / 2
const pad4 = (bytes) => new Uint8Array((4 - (bytes % 4)) % 4)

/** Re-indexes `indices` onto only the vertices it uses, then serialises it as one block. */
function block(indices) {
  const used = new Map()
  const local = new Uint32Array(indices.length)
  const quantised = []
  indices.forEach((v, i) => {
    let id = used.get(v)
    if (id === undefined) {
      id = used.size
      used.set(v, id)
      for (let k = 0; k < 3; k++) quantised.push(Math.round(((positions[v * 3 + k] - centre[k]) / half) * 32767))
    }
    local[i] = id
  })
  const wide = used.size > 0xffff
  const pos = Int16Array.from(quantised)
  const idx = wide ? local : Uint16Array.from(local)
  const header = new Uint32Array([used.size, idx.length, wide ? 1 : 0, 0])
  return [header, pos, pad4(pos.byteLength), idx, pad4(idx.byteLength)].map((a) => Buffer.from(a.buffer))
}

writeFileSync(output, Buffer.concat([...block(edges), ...block(hull)]))
console.log(`${source.length / 3} -> ${hull.length / 3} triangles, ${edges.length / 2} edges, ${statSync(output).size} bytes`)
