import * as THREE from "three";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useScene } from "../providers/scene/scene.hooks";
import { routes } from "../misc/routes";
import { useNavigate } from "react-router-dom";
import { client } from "../api";

export const TopBar = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { scene, camera, controls, renderer } = useScene();
  const { data } = useQuery({
    queryKey: [value, "search"],
    queryFn: () =>
      client.get<{ value: string; label: string }[]>(
        `/planets/searchPlanets?name=${value}`,
      ),
  });

  const handlePlanetSelection = (planet: string) => {
    const mesh = scene?.getObjectByName(planet);
    if (scene && camera && mesh && controls && renderer) {
      const currentRotation = camera.rotation.clone();

      const direction = new THREE.Vector3()
        .subVectors(camera.position, mesh.position)
        .normalize();
      camera.position.copy(mesh.position).addScaledVector(direction, 0.4);
      camera.rotation.copy(currentRotation);
      controls.target.copy(mesh.position);
      controls.update();
      renderer.render(scene, camera);

      setTimeout(() => {
        navigate(routes.planetInfo(planet));
      }, 400);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0  z-10 p-4 md:left-1/2 lg:left-3/4">
      <div className="absolute inset-0  opacity-40" />
      <Autocomplete
        label="Find your planet"
        size="sm"
        className="text-black"
        variant="faded"
        selectorIcon={null}
        onInputChange={setValue}
        onSelectionChange={(key) => handlePlanetSelection(key as string)}
      >
        {(data?.data || []).map((option) => (
          <AutocompleteItem key={option.value} className="text-black">
            {option.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};
