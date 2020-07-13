import { readFileSync } from "fs";
import { EOL } from "os";
import { EventEmitter } from "events";

interface ProxyManagerOptions {
    file: string,
    test: boolean
}

/**
 * The ProxyManager class, where queueing and usages are controlled. 
 * @class
 * @extends EventEmitter
 * @emits warn
 * @emits log
 */
export class ProxyManager extends EventEmitter {

    private proxies: Array<string> = [];
    private options: ProxyManagerOptions;

    constructor(options: ProxyManagerOptions = {file: "./proxies.txt", test: false}) {
        super();
        this.proxies = [];
        this.options = options;
    }

    /**
     * The entry point for the proxy manager, a synchronous function to cache all our proxies.
     */
    loadProxies() {
        const pendingLoad: Array<string> = readFileSync(this.options.file, "utf8").split(EOL)
        for (const proxy in pendingLoad) {
            if (this.proxies.includes(proxy)) {
                this.emit("warn", `Proxy ${proxy} already loaded!`)
            } else {
                this.emit("log", `Proxy ${proxy} loaded!`)
            }
        }
    }

}