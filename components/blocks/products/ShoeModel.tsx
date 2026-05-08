"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function ModelInner({ path }: { path: string }) {
  const gltf = useGLTF(path);

  const { centered, fitScale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return {
      fitScale: 1 / maxDim,
      centered: new THREE.Vector3(-center.x, -center.y, -center.z),
    };
  }, [gltf]);

  return (
    <group scale={fitScale}>
      <group position={centered}>
        <primitive object={gltf.scene} />
      </group>
    </group>
  );
}

export default function ShoeModel({ path }: { path: string }) {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      camera={{ fov: 34, position: [2.4, 0.15, 0], near: 0.005, far: 100 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#ffffff", "#b8b8b8", 0.6]} />
      <directionalLight position={[3, 5, 2]} intensity={1.4} />
      <directionalLight position={[-3, 4, -2]} intensity={0.6} />
      <directionalLight position={[0, -3, 3]} intensity={0.35} />
      <Suspense fallback={null}>
        <ModelInner path={path} />
      </Suspense>
    </Canvas>
  );
}
