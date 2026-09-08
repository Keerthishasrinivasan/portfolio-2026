import React, { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

// Inner Neural AI Core with glowing nodes and lattice
function NeuralCore({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Group>(null);
  const outerSphereRef = useRef<THREE.Mesh>(null);
  const innerIcosaRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate particle constellation
  const { particlePositions, particleColors } = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color('#38bdf8'); // cyan
    const color2 = new THREE.Color('#818cf8'); // violet
    const color3 = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const radius = 2.0 + (Math.random() - 0.5) * 0.4;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = color1.clone().lerp(i % 2 === 0 ? color2 : color3, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    return { particlePositions: positions, particleColors: colors };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Subtle mouse tilt with damping
      const targetRotationX = mousePosition.y * 0.35;
      const targetRotationY = mousePosition.x * 0.45;

      meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotationX, 2, delta);
      meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotationY, 2, delta);
    }

    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y += delta * 0.12;
      outerSphereRef.current.rotation.x += delta * 0.06;
    }

    if (innerIcosaRef.current) {
      innerIcosaRef.current.rotation.y -= delta * 0.2;
      innerIcosaRef.current.rotation.z += delta * 0.1;
      const scale = 1 + Math.sin(t * 1.5) * 0.05;
      innerIcosaRef.current.scale.set(scale, scale, scale);
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer subtle geometric wireframe shell */}
      <mesh ref={outerSphereRef}>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.22}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner glowing core polyhedron */}
      <mesh ref={innerIcosaRef}>
        <dodecahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#38bdf8"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.65}
          wireframe
        />
      </mesh>

      {/* Dense glowing center node */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
      </mesh>

      {/* Orbiting particles / neural synapsing nodes */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleColors.length / 3}
            array={particleColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ambient glowing aura rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.012, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.7, 0.008, 16, 100]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

// Fallback when WebGL is unavailable or reduced motion is active
function FallbackCanvasGlow() {
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-cyan-500/20 bg-gradient-to-tr from-indigo-500/10 via-cyan-500/5 to-transparent backdrop-blur-3xl animate-pulse-slow">
        <div className="absolute inset-4 rounded-full border border-indigo-400/20 animate-spin-slow" />
        <div className="absolute inset-12 rounded-full border border-white/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-cyan-400/30 blur-md" />
          <div className="w-6 h-6 rounded-full bg-white/90 shadow-[0_0_20px_#38bdf8]" />
        </div>
      </div>
    </div>
  );
}

export const Hero3DCore: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coords between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (prefersReduced || !hasWebGL) {
    return <FallbackCanvasGlow />;
  }

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[560px] select-none">
      <Suspense fallback={<FallbackCanvasGlow />}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.75]} // limit dpr for mobile battery & performance
          className="w-full h-full"
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-4, -3, 2]} intensity={2} color="#818cf8" />
          <pointLight position={[3, 4, 3]} intensity={2.5} color="#38bdf8" />

          <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
            <NeuralCore mousePosition={mousePosition} />
          </Float>
        </Canvas>
      </Suspense>
    </div>
  );
};
