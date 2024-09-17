import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Planet } from "./Planet";
import { PlanetType } from "../api";

export const Planets = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-planets"],
    queryFn: () =>
      axios.get<PlanetType[]>("https://rasp.kedywonline.uk/planets/getPlanets"),
  });

  if (isLoading) {
    return null;
  }

  return (
    <>
      {data?.data.map((planet) => (
        <Planet
          key={planet.name}
          name={planet.name}
          textureUrl={`https://proxy.kedywonline.uk/${planet.textureUrl}`}
          distance={planet.auDistance}
          size={planet.modelSize}
          placement={1}
        />
      ))}
    </>
  );
};
