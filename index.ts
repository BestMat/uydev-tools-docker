// ©2024 - BestMat UYDev - BestMat, Inc. - All rights reserved.
import { execSync } from "node:child_process";
import { writeFileSync } from "fs";

declare global {
    interface String {
        appendCommand(newCommand: string): string;
    }
}

String.prototype.appendCommand = function(this: string, newCommand: string): string {
    return this.concat(`\n${newCommand}`);
}

type ExposeType = {
    expose: boolean;
};

interface VMExposeType extends ExposeType {
    vmPort?: number;
    systemPort?: number;
};

export class Dockerfile {
    private id: string;
    private dockerfile: string;

    constructor(id: string) {
        this.id = id;
        this.dockerfile = "";
    }

    public pull(image: string): void {
        this.dockerfile = this.dockerfile.appendCommand(`FROM ${image}`);
    }

    public run(command: string): void {
        this.dockerfile = this.dockerfile.appendCommand(`RUN ${command}`);
    }

    public cd(dir: string): void {
        this.dockerfile = this.dockerfile.appendCommand(`WORKDIR ${dir}`);
    }

    public cp(from: string, to: string): void {
        this.dockerfile = this.dockerfile.appendCommand(`COPY ${from} ${to}`);
    }

    public user(user: string): void {
        this.dockerfile = this.dockerfile.appendCommand(`USER ${user}`);
    }

    public expose(port: number): void {
        this.dockerfile = this.dockerfile.appendCommand(`EXPOSE ${port}`);
    }

    public cmd(commands: string[]): void {
        this.dockerfile = this.dockerfile.appendCommand(`CMD [${commands.map(command => `"${command}"`).join(", ")}]`);
    }

    public print(): void {
        console.log(this.dockerfile);
    }

    public save(dir: string): void {
        writeFileSync(dir + "/Dockerfile", this.dockerfile);
    }
}

export default class DockerJS {
    private app: string;

    constructor(id: string, command: string[]) {
        const docker = new Dockerfile(id);

        docker.pull("node:12.18.1");
        docker.cd("/app");
        docker.cp("package.json", "package.json");
        docker.cp("package-lock.json", "package-lock.json");
        docker.run("npm install");
        docker.cp(".", ".");
        docker.cmd(command);
        docker.save(".")

        this.app = "";
    }

    public build(app: string, sudo?: true): string {
        this.app = app.toLowerCase();

        if (sudo) {
            return execSync(`sudo docker build --tag ${app} .`).toString();
        } else {
            return execSync(`docker build --tag ${app} .`).toString();
        }
    }

    public run(expose: VMExposeType, sudo?: true): string {
        if (expose.expose === false) {
            if (sudo) {
                return execSync(`sudo docker run ${this.app}`).toString();
            } else {
                return execSync(`docker run ${this.app}`).toString();
            }
        } else {
            if (sudo) {
                return execSync(`sudo docker run -d --publish ${expose.vmPort}:${expose.systemPort} ${this.app}`).toString();
            } else {
                return execSync(`docker run -d --publish ${expose.vmPort}:${expose.systemPort} ${this.app}`).toString();
            }
        }
    }
}