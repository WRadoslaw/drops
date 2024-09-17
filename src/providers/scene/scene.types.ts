import { MutableRefObject } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

export type SceneContextValue = {
  scene: THREE.Scene | null;
  controls: TrackballControls | null;
  renderer: THREE.WebGLRenderer | null;
  camera: THREE.PerspectiveCamera | null;
  mountRef: MutableRefObject<HTMLDivElement | null>;
};
