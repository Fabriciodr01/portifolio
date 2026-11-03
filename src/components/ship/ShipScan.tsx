import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useRef, useState, type PointerEvent, type RefObject } from 'react'
import * as THREE from 'three'

const MODEL_URL = `${import.meta.env.BASE_URL}models/federal-corvette.bin`
const ORANGE = new THREE.Color('#ff7100')
const SCAN_SECONDS = 1.8
const SCAN_REACH = 1.3
const PITCH_LIMIT = 0.6
// The nose is at -z; a slight negative x rotation dips it and lifts the engines.
const NOSE_DOWN = -0.16

const align4 = (n: number) => Math.ceil(n / 4) * 4

/**
 * Decodes the file written by scripts/obj-to-edges.mjs: an edge block then a hull block, each a 16-byte header
 * (vertex count, index count, index width), Int16 positions normalised to [-1, 1], then Uint16 or Uint32 indices.
 */
function decode(buf: ArrayBuffer) {
  let offset = 0
  const next = () => {
    const [nPos, nIdx, wide] = new Uint32Array(buf, offset, 4)
    const pos = new Int16Array(buf, offset + 16, nPos * 3)
    const idxOffset = offset + 16 + align4(nPos * 6)
    const idx = wide ? new Uint32Array(buf, idxOffset, nIdx) : new Uint16Array(buf, idxOffset, nIdx)
    offset = idxOffset + align4(idx.byteLength)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Int16BufferAttribute(pos, 3, true))
    geo.setIndex(new THREE.BufferAttribute(idx, 1))
    return geo
  }
  const edges = next()
  const hull = next()
  hull.computeVertexNormals()
  return { edges, hull }
}

type Model = ReturnType<typeof decode>

/**
 * Hull of the hologram: near-black so it hides the lines behind it, with an orange fresnel rim (surfaces seen
 * edge-on glow, which outlines the silhouette from any angle) and faint screen-space scanlines.
 * Pushed back with polygonOffset so the edge lines drawn on its surface always win the depth test.
 */
function hullMaterial(plane: THREE.Plane) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: ORANGE } },
    side: THREE.DoubleSide,
    clipping: true,
    clippingPlanes: [plane],
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    vertexShader: /* glsl */ `
      #include <common>
      #include <clipping_planes_pars_vertex>
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
        #include <clipping_planes_vertex>
      }`,
    fragmentShader: /* glsl */ `
      #include <clipping_planes_pars_fragment>
      uniform vec3 uColor;
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        #include <clipping_planes_fragment>
        float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 3.0);
        float scan = step(2.0, mod(gl_FragCoord.y, 3.0));
        gl_FragColor = vec4(vec3(0.03, 0.018, 0.008) + uColor * (rim * 0.3 + scan * 0.035), 1.0);
      }`,
  })
}

/** Shared between pointer handlers (outside the Canvas) and the frame loop (inside it), so it lives in a ref, not state. */
type Rig = { dragging: boolean; x: number; y: number; vx: number; vy: number; yaw: number; pitch: number }

function Ship({ model, rig, reduce }: { model: Model; rig: RefObject<Rig>; reduce: boolean }) {
  const group = useRef<THREE.Group>(null!)
  const scan = useRef(reduce ? 1 : 0)
  const gl = useThree((s) => s.gl)

  // Scan-in: a world-space clipping plane sweeps top to bottom, revealing the hull like a scanner beam.
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), reduce ? SCAN_REACH : -SCAN_REACH), [reduce])
  const lines = useMemo(
    () => new THREE.LineBasicMaterial({ color: ORANGE, transparent: true, opacity: 0.9, clippingPlanes: [plane], fog: true }),
    [plane],
  )
  const hull = useMemo(() => hullMaterial(plane), [plane])
  useEffect(() => { gl.localClippingEnabled = true }, [gl])
  useEffect(() => () => { lines.dispose(); hull.dispose() }, [lines, hull])

  useFrame((_, dt) => {
    const r = rig.current
    if (scan.current < 1) {
      scan.current = Math.min(1, scan.current + dt / SCAN_SECONDS)
      plane.constant = SCAN_REACH * (2 * (1 - (1 - scan.current) ** 3) - 1)
    }
    if (!r.dragging) {
      // Inertia after a drag, then settle back to a slow idle spin.
      r.vx *= 0.94
      r.vy *= 0.94
      r.yaw += r.vx + (reduce ? 0 : dt * 0.18)
      r.pitch += r.vy
    }
    r.pitch = THREE.MathUtils.clamp(r.pitch, -PITCH_LIMIT, PITCH_LIMIT)
    // XYZ order = turntable: yaw spins the ship level on its ring, pitch tilts the whole stand towards the camera.
    group.current.rotation.set(r.pitch, r.yaw, 0, 'XYZ')
  })

  return (
    <group ref={group} position-y={0.12}>
      <group scale={1.4} rotation-x={NOSE_DOWN}>
        <mesh geometry={model.hull} material={hull} />
        <lineSegments geometry={model.edges} material={lines} />
      </group>
      <polarGridHelper
        args={[1.45, 8, 3, 64, ORANGE, ORANGE]}
        position={[0, -0.35, 0]}
        onUpdate={(h: THREE.PolarGridHelper) => {
          const m = h.material as THREE.LineBasicMaterial
          m.transparent = true
          m.opacity = 0.12
          m.depthWrite = false
        }}
      />
    </group>
  )
}

/** Orange hologram of the Federal Corvette. Drag to rotate (horizontal only on touch, so vertical swipes still scroll). */
export default function ShipScan() {
  const reduce = useReducedMotion() ?? false
  const host = useRef<HTMLDivElement>(null)
  const rig = useRef<Rig>({ dragging: false, x: 0, y: 0, vx: 0, vy: 0, yaw: -0.7, pitch: 0.35 })
  const [model, setModel] = useState<Model | null>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let alive = true
    let loaded: Model | null = null
    fetch(MODEL_URL)
      .then((r) => r.arrayBuffer())
      .then((buf) => { if (alive) setModel((loaded = decode(buf))) })
    return () => {
      alive = false
      loaded?.edges.dispose()
      loaded?.hull.dispose()
    }
  }, [])

  // Stop rendering while the panel is off screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    if (host.current) io.observe(host.current)
    return () => io.disconnect()
  }, [])

  const onPointerDown = (e: PointerEvent) => {
    const r = rig.current
    r.dragging = true
    r.x = e.clientX
    r.y = e.clientY
    r.vx = r.vy = 0
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: PointerEvent) => {
    const r = rig.current
    if (!r.dragging) return
    r.vx = (e.clientX - r.x) * 0.008
    r.vy = e.pointerType === 'touch' ? 0 : (e.clientY - r.y) * 0.006
    r.yaw += r.vx
    r.pitch += r.vy
    r.x = e.clientX
    r.y = e.clientY
  }
  const onPointerUp = () => { rig.current.dragging = false }

  return (
    <div
      ref={host}
      className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {!model && <p className="type-caption grid h-full place-items-center">Scanning…</p>}
      {model && (
        <Canvas
          className="[filter:drop-shadow(0_0_3px_rgb(255_113_0/0.65))]"
          frameloop={visible ? 'always' : 'never'}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 4.4], fov: 26, near: 0.1, far: 12 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ scene }) => { scene.fog = new THREE.Fog('#100c08', 3.8, 5.6) }}
        >
          <Ship model={model} rig={rig} reduce={reduce} />
        </Canvas>
      )}
      <p aria-hidden className="pointer-events-none absolute bottom-0 left-0 type-caption">
        <span className="hidden sm:inline">Drag to rotate</span><span className="sm:hidden">Swipe to rotate</span>
      </p>
    </div>
  )
}
