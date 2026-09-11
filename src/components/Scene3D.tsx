import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { CodeStep } from '@/lib/explainCode';

interface Scene3DProps {
  steps: CodeStep[];
}

export default function Scene3D({ steps }: Scene3DProps) {
  if (steps.length === 0) return null;
  const positions = computePositions(steps.length);

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl border border-bg-border bg-bg-surface sm:h-[500px]">
      <Canvas camera={{ position: [0, 2, 14], fov: 50 }}>
        <ambientLight intensity={0.35} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#F2B705" />
        <pointLight position={[-10, -8, -5]} intensity={0.6} color="#38D9A9" />
        <pointLight position={[0, 0, 8]} intensity={0.3} color="#E7ECF7" />
        <RotatingGroup steps={steps} positions={positions} />
        <Particles count={80} radius={12} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          autoRotate
          autoRotateSpeed={0.6}
          minDistance={7}
          maxDistance={22}
        />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-bg-border bg-bg/80 px-3 py-1.5 backdrop-blur-sm">
        <span className="font-mono text-xs text-text-dim">
          {steps.length} nodes · drag to orbit · scroll to zoom
        </span>
      </div>
    </div>
  );
}

function computePositions(count: number): [number, number, number][] {
  const positions: [number, number, number][] = [];
  const radius = Math.max(3.5, count * 0.55);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const y = ((i % 3) - 1) * 1.8;
    positions.push([Math.cos(angle) * radius, y, Math.sin(angle) * radius]);
  }
  return positions;
}

function RotatingGroup({
  steps,
  positions,
}: {
  steps: CodeStep[];
  positions: [number, number, number][];
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {steps.map((step, i) => (
        <group key={i} position={positions[i]}>
          <NodeMesh index={i} title={step.title} total={steps.length} />
        </group>
      ))}

      {positions.slice(1).map((_, i) => (
        <Line
          key={`line-${i}`}
          points={[positions[i], positions[i + 1]]}
          color="#243154"
          lineWidth={1.5}
          dashed
          dashScale={3}
        />
      ))}
    </group>
  );
}

function NodeMesh({
  index,
  title,
  total,
}: {
  index: number;
  title: string;
  total: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isAmber = index % 2 === 0;
  const color = isAmber ? '#F2B705' : '#38D9A9';

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.position.y = Math.sin(t + index * 0.5) * 0.2;
      meshRef.current.rotation.x = t * 0.3 + index;
      meshRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
      <TextSprite text={`${index + 1}. ${title}`} />
      <Ring index={index} total={total} />
    </group>
  );
}

function Ring({ index, total }: { index: number; total: number }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const isAmber = index % 2 === 0;

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={ringRef} scale={1.2}>
      <ringGeometry args={[0.75, 0.8, 32]} />
      <meshBasicMaterial
        color={isAmber ? '#F2B705' : '#38D9A9'}
        transparent
        opacity={0.25}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function TextSprite({ text }: { text: string }) {
  const sprite = useMemo(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 64;
    if (ctx) {
      ctx.fillStyle = 'rgba(10, 15, 28, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#243154';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
      ctx.fillStyle = '#E7ECF7';
      ctx.font = '600 22px "IBM Plex Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const s = new THREE.Sprite(material);
    s.position.set(0, -1.0, 0);
    s.scale.set(2.2, 0.28, 1);
    return s;
  }, [text]);

  return <primitive object={sprite} />;
}

function Particles({ count, radius }: { count: number; radius: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = radius * (0.5 + Math.random() * 0.5);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count, radius]);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#243154"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
