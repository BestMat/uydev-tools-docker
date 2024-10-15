# uydev-tools-docker
UYDev Docker.js is a lightweight, JavaScript-based tool that simplifies Dockerfile creation and Docker container management directly from Node.js. This tool helps you automate Dockerfile generation, image building, and container launching with ease, all from a single JavaScript class. **This project is a Docker Tool for JavaScript.**

## Features:

* **Create Dockerfiles Programmatically:** Build Dockerfiles on the fly using predefined commands such as FROM, RUN, COPY, WORKDIR, etc.
* **Docker Image Automation:** Automatically build Docker images directly from Node.js using the execSync command.
* **Container Management**: Easily run Docker containers with optional port exposure using a simple API.
* **Custom Commands:** Programmatically append commands to the Dockerfile in sequence.

## API Reference:
**DockerJS Class**

**Constructor:** new DockerJS(id: string, command: string[])
* id: Unique identifier for the Dockerfile.
* command: Array of commands to execute when the Docker container starts.
  
**Methods**
* `pull(image: string)`: Add a FROM statement in the Dockerfile to pull a base image.
* `run(command: string)`: Add a RUN command to execute shell commands inside the container.
* `cd(dir: string)`: Change the working directory inside the container. **(WORKDIR)**
* `cp(from: string, to: string)`: Copy files from the host system to the Docker container.
* `user(user: string)`: Set the user under which the container commands will run.
* `expose(port: number)`: Expose a port inside the Docker container.
* `cmd(commands: string[])`: Set the default command for the container.
* `build(app: string, sudo?: boolean)`: Build the Docker image. Pass sudo: true for elevated privileges.
* `run(expose: VMExposeType, sudo?: boolean)`: Run the Docker container. Set expose: true to publish ports. Pass sudo: true to run with elevated privileges.

## Installation and Usage:
* Clone the repository: `git clone github.com/BestMat/uydev-tools-docker.git`.
* Ensure you have Docker installed and running on your system.
* Install necessary dependencies:
    ```sh
    npm install
    ```
### Import and Create a DockerJS Instance
```typescript
import { randomUUID } from "crypto";
import DockerJS from "./node_modules/uydev-tools-docker/index.ts";

// Create a DockerJS instance with a unique identifier and command array
const vm = new DockerJS(randomUUID(), ["node", "index.js"]);
```

## Build a Docker Image
To build a Docker image, use the build method. You can pass a boolean sudo parameter for elevated privileges if required. The app name must be **lowercase string**.

```typescript
const buildStatus = vm.build("myappimage", true); // Replace "myappimage" with your app name
console.log("Build Status:", buildStatus);
```

## Run a Docker Container
```typescript
const runningStatus = vm.run({
    expose: true,       // Expose ports
    vmPort: 8080,       // Map 8080 on the VM
    systemPort: 8080    // To 8080 on the system
}, true);               // Pass true to use sudo

console.log("Run Status:", runningStatus);
```
---
**©2024 BestMat UYDev - BestMat, Inc. - All rights reserved.**
