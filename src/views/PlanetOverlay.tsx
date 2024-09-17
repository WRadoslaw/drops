import { Button, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { routes } from "../misc/routes";
import { PlanetType } from "../api";
import { useState } from "react";

export const PlanetOverlay = () => {
  const params = useParams();
  const [detailsOpen, setDetailsOpen] = useState(true);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["singlePlanet", params.name],
    queryFn: () =>
      axios.get<PlanetType>(
        `https://rasp.kedywonline.uk/planets/getPlanet?name=${params.name}`,
      ),
  });

  console.log("match", data?.data);
  return (
    <>
      {" "}
      <motion.div
        initial={{
          height: "0%",
        }}
        animate={{
          height: "80%",
        }}
        transition={{
          duration: 0.1,
        }}
        className="absolute overflow-hidden flex flex-col bg-black bottom-0 border-stone-50 rounded-t-lg left-0 right-0 transition-all duration-300"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <img src={data?.data.picture} className="h-full object-contain " />
            <div className="absolute inset-0 z-10">
              <div
                onClick={() => setDetailsOpen(false)}
                className="flex justify-between h-[500px] p-4 lg:p-8"
              >
                <h3 className="z-10 text-3xl">{data?.data.name}</h3>

                <div className="flex gap-2">
                  {!detailsOpen ? (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetailsOpen(true);
                      }}
                      className="text-white "
                      variant="shadow"
                    >
                      Details
                    </Button>
                  ) : (
                    <div />
                  )}
                  <Button
                    variant="bordered"
                    className="text-white"
                    onClick={() => navigate(routes.root())}
                  >
                    Close
                  </Button>
                </div>
              </div>
              <AnimatePresence>
                {detailsOpen ? (
                  <motion.div
                    initial={{ top: "100%" }}
                    exit={{ top: "100%" }}
                    animate={{ top: "30%" }}
                    className="absolute overflow-y-auto rounded-t-lg p-2 flex flex-col gap-2 bg-foreground-400 bg-opacity-55  bottom-0 left-0 right-0 lg:p-8"
                  >
                    <Row name="Name" value={data?.data.name ?? ""} />
                    <Row
                      name="Distance from Sun"
                      value={data?.data.distanceFromSun ?? ""}
                    />
                    <Row name="Tagline" value={data?.data.tagline ?? ""} />
                    <Row
                      name="Year length (Earth days)"
                      value={data?.data.yearLength ?? ""}
                    />
                    <Row
                      name="Number of moons"
                      value={data?.data.numberOfMoons ?? ""}
                    />
                    <Row
                      name="Description"
                      value={
                        data?.data.description
                          ? data.data.description + data.data.description
                          : ""
                      }
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

const Row = (props: { name: string; value: string | number }) => {
  return (
    <div className="flex flex-col w-full">
      <p className="font text-small">{props.name}: </p>
      <p className="font-semibold text-small">{props.value}</p>
    </div>
  );
};
