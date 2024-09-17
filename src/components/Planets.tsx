import { useQuery } from "@tanstack/react-query";
import { Planet } from "./Planet";
import { client, PlanetType } from "../api";

export const Planets = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-planets"],
    queryFn: () => client.get<PlanetType[]>("/planets/getPlanets"),
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
