import * as THREE from "three";

export function getFirstObjectWithName(
  event: MouseEvent,
  window: Window,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  name: string,
) {
  const raycaster = new THREE.Raycaster();

  const mousePointer = getMouseVector2(event, window);
  const intersections = checkRayIntersections(
    mousePointer,
    camera,
    raycaster,
    scene,
  );
  const list = getObjectsByName(intersections, name);

  if (typeof list[0] !== "undefined") {
    return list[0];
  }

  return null;
}

export function getMouseVector2(event: MouseEvent, window: Window) {
  const mousePointer = new THREE.Vector2();

  mousePointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  return mousePointer;
}

export function checkRayIntersections(
  mousePointer: THREE.Vector2,
  camera: THREE.PerspectiveCamera,
  raycaster: THREE.Raycaster,
  scene: THREE.Scene,
) {
  raycaster.setFromCamera(mousePointer, camera);

  const intersections = raycaster.intersectObjects(scene.children, true);

  return intersections;
}

export function getObjectsByName(
  objectList: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[],
  name: string,
) {
  return objectList.filter((singleObject) => {
    const objectName = singleObject.object.userData.name || "Unnamed Object";
    return objectName.includes(name);
  });
}
