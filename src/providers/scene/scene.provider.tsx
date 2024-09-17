import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createContext, ReactNode, useMemo, useRef, useState } from "react";
import { SceneContextValue } from "./scene.types";
import { useMountEffect } from "../../hooks/useMountEffect";

export const SceneContext = createContext<SceneContextValue | null>(null);

export const SceneProvider = (props: { children: ReactNode }) => {
  const [scene, setScene] = useState<SceneContextValue["scene"]>(null);
  const [renderer, setRenderer] = useState<SceneContextValue["renderer"]>(null);
  const [controls, setControls] = useState<SceneContextValue["controls"]>(null);
  const [camera, setCamera] = useState<SceneContextValue["camera"]>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);

  useMountEffect(() => {
    const newScene = new THREE.Scene();
    const newCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const newRenderer = new THREE.WebGLRenderer();

    newRenderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(newRenderer.domElement);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      sizeAttenuation: true,
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3),
    );
    const stars = new THREE.Points(starGeometry, starMaterial);
    newScene.add(stars);

    newCamera.position.z = 1;

    // Add orbit controls
    const newControls = new OrbitControls(newCamera, newRenderer.domElement);
    newControls.enableDamping = true;
    newControls.dampingFactor = 0.05;

    // Handle window resize
    const handleResize = () => {
      newCamera.aspect = window.innerWidth / window.innerHeight;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);
    setControls(newControls);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(newRenderer.domElement);
    };
  });

  const value = useMemo((): SceneContextValue => {
    return {
      scene,
      camera,
      controls,
      renderer,
      mountRef,
    };
  }, [scene, camera, controls, renderer]);

  return (
    <SceneContext.Provider value={value}>
      <div ref={mountRef} style={{ width: "10%", height: "10vh" }} />
      {props.children}
    </SceneContext.Provider>
  );
};
