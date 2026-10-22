import { readFileSync, writeFileSync } from 'node:fs';
const path = 'src/app/scene.js';
let source = readFileSync(path, 'utf8');
const marker = "  signal.throwIfAborted();\n  return { viewer, tileset, mapStackController, operations };";
if (!source.includes(marker)) throw new Error('Scene startup hook changed; review required');
source = source.replace(marker, `  // Horizon Pages preview: default view only, never override shared scene URLs.
  if (!window.location.search && !window.location.hash) {
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(-116.7805, 47.6777, 14000),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-60),
        roll: 0,
      },
    });
    viewer.scene.requestRender();
  }
` + marker);
writeFileSync(path, source);
console.log('Horizon Pages opening camera set to Coeur d’Alene, Idaho.');
