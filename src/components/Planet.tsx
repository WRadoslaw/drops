import { useNavigate } from "react-router-dom";
import { useMountEffect } from "../hooks/useMountEffect";
import { getFirstObjectWithName } from "../misc/three.helpers";
import { useScene } from "../providers/scene/scene.hooks";
import * as THREE from "three";
import { routes } from "../misc/routes";

type PlanetProps = {
  name: string;
  size: number;
  distance: number;
  textureUrl: string;
  placement: number;
};

export const Planet = ({ textureUrl, size, distance, name }: PlanetProps) => {
  const { scene, controls, renderer, camera, mountRef } = useScene();
  const navigate = useNavigate();

  useMountEffect(
    () => {
      const init = async () => {
        if (scene && controls && renderer && camera) {
          const geometry = new THREE.SphereGeometry(size, 32, 32);
          const loader = new THREE.TextureLoader();
          const texture = await loader.loadAsync(textureUrl);
          const material = new THREE.MeshBasicMaterial({
            map: texture,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.userData.name = name;
          mesh.position.x = distance;
          mesh.name = name.toLowerCase();
          scene?.add(mesh);

          const animate = () => {
            requestAnimationFrame(animate);

            // const angle = Date.now() * 0.0001 * (1 / placement);
            // mesh.position.x = Math.cos(angle) * distance;
            // mesh.position.z = Math.sin(angle) * distance;
            const angle = (Date.now() * 0.0001) / Math.sqrt(distance); // Kepler's third law approximation
            mesh.position.x = Math.cos(angle) * distance;
            mesh.position.y = Math.sin(angle) * distance;
            controls.update();
            renderer.render(scene, camera);
          };

          animate();

          const orbitGeometry = new THREE.RingGeometry(
            distance - 0.001,
            distance + 0.001,
            64,
          );
          const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0xfffff,
            side: THREE.DoubleSide,
            opacity: 1,
          });
          const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
          scene.add(orbitMesh);

          const onClick = (e: MouseEvent) => {
            const planet = getFirstObjectWithName(
              e,
              window,
              camera,
              scene,
              name,
            );
            if (planet) {
              const currentRotation = camera.rotation.clone();

              const direction = new THREE.Vector3()
                .subVectors(camera.position, mesh.position)
                .normalize();
              camera.position
                .copy(mesh.position)
                .addScaledVector(direction, 0.4);
              camera.rotation.copy(currentRotation);
              controls.target.copy(mesh.position);
              controls.update();
              renderer.render(scene, camera);

              setTimeout(() => {
                navigate(routes.planetInfo(name));
              }, 400);
            }
          };

          mountRef.current?.addEventListener("click", onClick);

          return () => {
            mountRef.current?.removeEventListener("click", onClick);
            console.log("clean");
          };
        }
      };

      init();
    },
    () => !!(scene && controls && renderer && camera),
  );

  return null;
};
