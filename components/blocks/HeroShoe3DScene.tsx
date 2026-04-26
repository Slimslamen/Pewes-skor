"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { MotionValue } from "motion/react";
import * as THREE from "three";

useGLTF.preload("/Pewes.glb");

// Keyframes are in "normalized" space — the ShoeModel below scales the GLB so
// its longest axis is 1 unit and re-centers it on the origin. Shoe length is
// along Z. +Z is assumed to be the heel end (where the collar opening sits);
// flip all Z signs if the camera dives toward the toe instead.
// Camera arcs in the XY plane (no horizontal spin). Both pos.z and look.z
// share the same offset so the forward vector stays in XY — no image spin.
// The +Z offset pans the frame to the left (camera right = -Z), with the
// offset scaling proportionally to the zoom level so the pan reads as a
// consistent ~250 px left shift across the top-view segment.
const KEYFRAMES = [
  // side profile — shoe reads horizontally across the frame
  { t: 0.0,  pos: new THREE.Vector3(2.4,  0.15, 0),     look: new THREE.Vector3(0, 0,    0),     fov: 34 },
  // swing upward, still centred (no Z offset yet)
  { t: 0.35, pos: new THREE.Vector3(0.8,  1.6,  0),     look: new THREE.Vector3(0, 0.1,  0),     fov: 26 },
  // above the shoe — start panning 250 px left (Z=0.078 at this zoom depth)
  { t: 0.65, pos: new THREE.Vector3(0.04, 1.3,  0.078), look: new THREE.Vector3(0, 0.1,  0.078), fov: 16 },
  // extreme close-up — sole fills frame, 250 px left (Z=0.002 at fov=4)
  { t: 1.0,  pos: new THREE.Vector3(0.03, 0.28, 0.002), look: new THREE.Vector3(0, 0.18, 0.002), fov: 4  },
] as const;

// Canvas background lerps from surface-container → surface so the seam between
// the hero and the next section (BrandsBar, bg-surface) disappears.
const BG_COLOR_START = new THREE.Color("#edeeef");
const BG_COLOR_END = new THREE.Color("#f8f9fa");

function ShoeModel() {
  const gltf = useGLTF("/Pewes.glb");

  const { centered, fitScale } = useMemo(() => {
    const scene = gltf.scene;
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const fitScale = 1 / maxDim;
    const centered = new THREE.Vector3(-center.x, -center.y, -center.z);

    // One-time diagnostic so we can verify the GLB's native shape in the browser console.
    if (typeof window !== "undefined") {
      console.log("[Pewes.glb] size:", size.toArray(), "center:", center.toArray(), "maxDim:", maxDim);
    }

    return { centered, fitScale };
  }, [gltf]);

  // Native orientation first. If the sole faces the wrong way after loading,
  // we can add a rotation on this outer group once we know the native axes.
  return (
    <group scale={fitScale}>
      <group position={centered}>
        <primitive object={gltf.scene} />
      </group>
    </group>
  );
}

function CameraRig({ progress }: { progress: MotionValue<number> }) {
  const { camera, scene } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const bgColor = useRef(new THREE.Color().copy(BG_COLOR_START));

  useFrame(() => {
    const p = Math.min(1, Math.max(0, progress.get()));

    let i = 0;
    for (; i < KEYFRAMES.length - 1; i++) {
      if (p <= KEYFRAMES[i + 1].t) break;
    }
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[Math.min(i + 1, KEYFRAMES.length - 1)];
    const span = Math.max(0.0001, b.t - a.t);
    const localT = Math.min(1, Math.max(0, (p - a.t) / span));

    targetPos.current.lerpVectors(a.pos, b.pos, localT);
    targetLook.current.lerpVectors(a.look, b.look, localT);
    const targetFov = a.fov + (b.fov - a.fov) * localT;

    camera.position.lerp(targetPos.current, 0.12);
    camera.lookAt(targetLook.current);

    if (camera instanceof THREE.PerspectiveCamera && Math.abs(camera.fov - targetFov) > 0.01) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.15);
      camera.updateProjectionMatrix();
    }

    // Blend background toward the next section's surface color across the
    // last third of the scroll so the hero dissolves into BrandsBar.
    const bgT = THREE.MathUtils.smoothstep(p, 0.65, 1.0);
    bgColor.current.lerpColors(BG_COLOR_START, BG_COLOR_END, bgT);
    if (scene.background instanceof THREE.Color) {
      scene.background.copy(bgColor.current);
    }
  });

  return null;
}

// Loading placeholder — a subtle wireframe cube at the origin so the user
// sees *something* while the 64 MB GLB streams in.
function LoadingPlaceholder() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.6;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.4, 0.2, 0.8]} />
      <meshStandardMaterial color="#725a39" roughness={0.55} metalness={0.1} />
    </mesh>
  );
}

interface Props {
  progress: MotionValue<number>;
  reducedMotion?: boolean;
  isMobile?: boolean;
}

export default function HeroShoe3DScene({ progress, reducedMotion = false, isMobile = false }: Props) {
  return (
    <Canvas
      shadows={!isMobile}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, preserveDrawingBuffer: false }}
      camera={{ fov: 34, position: [2.4, 0.15, 0], near: 0.005, far: 100 }}
      className="absolute inset-0"
    >
      <color attach="background" args={["#edeeef"]} />
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#ffffff", "#b8b8b8", 0.6]} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.4}
        castShadow={!isMobile}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.6} />
      <directionalLight position={[0, -3, 3]} intensity={0.35} />

      <Suspense fallback={<LoadingPlaceholder />}>
        <ShoeModel />
      </Suspense>

      {!reducedMotion && <CameraRig progress={progress} />}
    </Canvas>
  );
}
