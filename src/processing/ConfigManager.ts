import { promisify } from "bluebird";
import * as wSync from "walk-sync"

import { EventEmitter } from "events";
import { readFileSync } from "fs";

const readFileAsync = promisify(readFileSync);

interface ConfigEntry {
    [key: string]: Object
}

interface ConfigCache {
    [key: string]: ConfigEntry
}

/**
 * The ConfigManager class, this handles all configuration file processing. 
 * @class
 * @extends EventEmitter
 * @emits warn
 * @emits log
 */
export class ConfigManager extends EventEmitter {

    config: ConfigCache;

    constructor() {
        super();
        this.config = {}
    }

    /**
     * Loads a directory of configuration files, overriding existing names.
     * @param directory 
     */
    async loadDirectory(directory: string) {
        const files = wSync.default(directory, { directories: false, includeBasePath: true }).filter((file) => file.endsWith(".json"))
        for (const file of files) {
            const contents = await readFileAsync(file, "utf8")
            try {
                const mod = JSON.parse(contents as string)
                if (mod["request"]["url"]) return this.emit("warn", `url field missing in ${file}`)
                if (mod["request"]["method"]) return this.emit("warn", `method field missing in ${file}`)
                if (mod["request"]["random"]) return this.emit("warn", `useragent field missing in ${file}`)
                if (mod["request"]["proxy"]) return this.emit("warn", `proxy field missing in ${file}`)
                if (mod["request"]["jsonpath"]) return this.emit("warn", `jsonpath field missing in ${file}`)

                this.config[file.split("/").reverse()[0].replace(".json", "")] = mod
            } catch {
                this.emit("warn", `Could not read ${file}`)
            }
        }
    }
}