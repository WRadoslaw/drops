import { memo } from "react";
import { useMountEffect } from "../hooks/useMountEffect";
import { useScene } from "../providers/scene/scene.hooks";
import * as THREE from "three";
import sunTexture from "../assets/textures/sunmap.jpg";
import { kilometersToAu } from "../misc/distances";

const Sun_ = () => {
  const { scene } = useScene();

  useMountEffect(
    () => {
      const sunGeometry = new THREE.SphereGeometry(
        kilometersToAu(1392700) * 10,
        32,
        32,
      );
      const textureLoader = new THREE.TextureLoader();
      const sunMaterial = new THREE.MeshBasicMaterial({
        map: textureLoader.load(sunTexture),
      });
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      scene?.add(sun);
    },
    () => !!scene,
  );

  return null;
};

export const Sun = memo(Sun_);
