import { MutableRefObject } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type SceneContextValue = {
  scene: THREE.Scene | null;
  controls: OrbitControls | null;
  renderer: THREE.WebGLRenderer | null;
  camera: THREE.PerspectiveCamera | null;
  mountRef: MutableRefObject<HTMLDivElement | null>;
  // addNamedOnClick: (name: string, cb: () => void) => void;
  // removeNamedOnClick: (name: string, cb: () => void) => void;
};
