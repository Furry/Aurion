import { EventEmitter } from "events";

/**
 * The ConfigManager class, this handles all configuration file processing. 
 * @class
 * @extends EventEmitter
 * @emits warn
 * @emits log
 */
export class ConfigManager extends EventEmitter {
    constructor() {
        super()
    }
}