import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// Vị trí / tỉ lệ của "tổ ấm" theo từng kiểu slide
const POSES = {
  hero: { pos: [2.7, 0.05, 0], scale: 1.2, rings: 1 },
  section: { pos: [3.2, 0.05, -0.5], scale: 1.2, rings: 1 },
  game: { pos: [-8.8, 3.1, -6], scale: 0.6, rings: 0.35 },
  content: { pos: [8.6, 3.3, -6], scale: 0.6, rings: 0.35 },
  // slide poster ô chữ: đẩy ngôi nhà ra sau góc trên, không che poster
  away: { pos: [10.5, 5.2, -9], scale: 0.4, rings: 0 },
}

// Trái tim chuẩn hóa: rộng ~1, tâm (0,0), mũi nhọn quay xuống
function heartPath(target, scale = 1, cx = 0, cy = 0) {
  const k = scale / 22
  const P = (x, y) => [cx + (x - 5) * k, cy - (y - 9.5) * k]
  const seg = [
    [5, 5, 4, 0, 0, 0],
    [-6, 0, -6, 7, -6, 7],
    [-6, 11, -3, 15.4, 5, 19],
    [12, 15.4, 16, 11, 16, 7],
    [16, 7, 16, 0, 10, 0],
    [7, 0, 5, 5, 5, 5],
  ]
  target.moveTo(...P(5, 5))
  for (const [a, b, c, d, e, f] of seg) target.bezierCurveTo(...P(a, b), ...P(c, d), ...P(e, f))
  return target
}

function houseShape() {
  const s = new THREE.Shape()
  s.moveTo(-0.95, -1.05)
  s.lineTo(0.95, -1.05)
  s.lineTo(0.95, 0.28)
  s.lineTo(1.22, 0.28)
  s.lineTo(0, 1.32)
  s.lineTo(-1.22, 0.28)
  s.lineTo(-0.95, 0.28)
  s.closePath()
  s.holes.push(heartPath(new THREE.Path(), 1.05, 0, -0.32))
  return s
}

function Home({ pose }) {
  const group = useRef()
  const house = useRef()
  const heart = useRef()
  const rings = useRef()

  const houseGeo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(houseShape(), {
      depth: 0.24,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.06,
      bevelSegments: 6,
      curveSegments: 32,
    })
    g.translate(0, 0, -0.12)
    return g
  }, [])

  const heartGeo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(heartPath(new THREE.Shape(), 0.78, 0, 0), {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.08,
      bevelSegments: 8,
      curveSegments: 32,
    })
    g.center()
    return g
  }, [])

  const target = useMemo(() => new THREE.Vector3(), [])
  useFrame((state, dt) => {
    const p = POSES[pose] ?? POSES.content
    const t = state.clock.elapsedTime
    target.set(...p.pos)
    const k = 1 - Math.pow(0.02, dt)
    group.current.position.lerp(target, k)
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, p.scale, k))
    // lắc nhẹ quanh mặt chính diện để luôn thấy rõ hình ngôi nhà
    house.current.rotation.y = Math.sin(t * 0.55) * 0.5
    heart.current.rotation.y = Math.sin(t * 0.55 + 0.6) * 0.7
    heart.current.scale.setScalar(1 + Math.sin(t * 2.4) * 0.05)
    const px = state.pointer.x * 0.25
    const py = state.pointer.y * 0.2
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -py, k)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, px * 0.3, k)
    rings.current.rotation.z += dt * 0.12
    rings.current.children.forEach((r, i) => {
      r.rotation.x += dt * (0.15 + i * 0.08)
      r.material.opacity = THREE.MathUtils.lerp(r.material.opacity, 0.5 * p.rings, k)
    })
  })

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh ref={house} geometry={houseGeo}>
          <meshStandardMaterial color="#f2c14e" metalness={1} roughness={0.2} envMapIntensity={1.4} />
        </mesh>
        <group position={[0, -0.32, 0]}>
          <mesh ref={heart} geometry={heartGeo}>
            <meshStandardMaterial
              color="#e8385a"
              emissive="#7a0a14"
              emissiveIntensity={0.6}
              metalness={0.6}
              roughness={0.25}
              envMapIntensity={1.2}
            />
          </mesh>
        </group>
      </Float>
      <group ref={rings}>
        {[1.9, 2.3, 2.75].map((r, i) => (
          <mesh key={r} rotation={[Math.PI / 2 + i * 0.5, i * 0.7, 0]}>
            <torusGeometry args={[r, 0.008 + i * 0.002, 16, 160]} />
            <meshBasicMaterial color={i === 1 ? '#ff8fab' : '#f2c14e'} transparent opacity={0} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function CameraRig() {
  useFrame((state, dt) => {
    const k = 1 - Math.pow(0.05, dt)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.4, k)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.3, k)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene3D({ pose = 'content' }) {
  return (
    <div className="scene3d" aria-hidden="true">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} color="#fff1d6" />
        <pointLight position={[-4, -2, 3]} intensity={30} color="#ff4a3a" />
        <Home pose={pose} />
        <Sparkles count={140} scale={[16, 9, 6]} size={2.4} speed={0.35} color="#f7d488" opacity={0.7} />
        <Sparkles count={50} scale={[14, 8, 4]} size={4} speed={0.2} color="#ff9fb5" opacity={0.45} />
        <CameraRig />
        {/* Môi trường phản chiếu dựng bằng Lightformer — không tải HDR từ mạng, chạy offline được */}
        <Environment resolution={256}>
          <Lightformer intensity={4} position={[0, 5, -6]} scale={[10, 2, 1]} color="#fff4de" />
          <Lightformer intensity={3} position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color="#ff5a3c" />
          <Lightformer intensity={2} position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} color="#ffd27a" />
          <Lightformer form="ring" intensity={3} position={[0, 0, 6]} scale={3} color="#ffffff" />
        </Environment>
      </Canvas>
    </div>
  )
}
