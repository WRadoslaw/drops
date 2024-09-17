import { useContext } from "react";
import { SceneContext } from "./scene.provider";

export const useScene = () => {
  const ctx = useContext(SceneContext);

  if (!ctx) {
    throw Error("useScene hook has to be used inside SceneProvider");
  }

  return ctx;
};
