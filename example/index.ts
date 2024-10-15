// ©2024 - BestMat UYDev - BestMat, Inc. - All rights reserved.
import { randomUUID } from "crypto";
import DockerJS from "../index.js";

const vm = new DockerJS(randomUUID(), [ "node", "index.js" ]);
const buildStatus = vm.build("nagapillaiyar");
const runningStatus = vm.run({
    expose: true,
    vmPort: 8080,
    systemPort: 8080
});

console.log("Build Status:", buildStatus);
console.log("Run Status:", runningStatus);