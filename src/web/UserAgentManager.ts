interface AgentControllerOptions {
    unsafe?: boolean,
    crawler?: boolean
}

/**
 * ! These UserAgents are NOT fool proof. They're designed to look valid to humans, but might not be valid to scanners.
 * The main controlling class for UserAgents and other browser emulating fields.
 */
export class AgentController {
    /**
     * @typedef {Object} AgentControllerOptions
     * @property {boolean=false} unsafe If the UserAgent generator should care about producing valid looking agents
     * @property {boolean=false} crawler If the UserAgent should be Crawler-Like. 
     */
    /**
     * The constructor for the AgentController
     * @constructor
     * @param AgentControllerOptions options
     */
    constructor(options: AgentControllerOptions = {}) {
        Object.assign(options, {unsafe: false, crawler: false})
    }

    private get version(): number {
        return Math.floor(Math.random() * 10)
    }

    private get engine(): string {
        const opts: Array<string> = [
            "Mozilla",
            `Netscape ${this.version + 1}.${this.version} (Irix)`,
            `Netscape ${this.version}.${this.version} (SunOS)`,
            `Arora ${this.version}.${this.version}${this.version}.${this.version} (BSD/Haiku)`,
            `Arora ${this.version}.${this.version}${this.version}.${this.version} (NetBSD)`,
            `Chrome ${this.version+1}${this.version}.${this.version} (BSD/Haiku)`
        ];
        return opts[Math.floor(Math.random() * opts.length)]
    }

    private get platform(): string {
        const opts: Array<string> = [
            `(compatible; MSIE ${this.version + 1}.${this.version}; Windows NV ${this.version + 1}.${this.version}; WOW64; Trident/${this.version + 1}.${this.version})`,
            `(compatible; MSIE ${this.version + 1}.${this.version}; Windows NT ${this.version + 1}.${this.version}; WOW32; Arrow/${this.version + 1}.${this.version})`,
            `(compatible; MSIE ${this.version + 1}.${this.version}; Windows NT ${this.version + 1}.${this.version}; Win32; Arrow/${this.version + 1}.${this.version})`,
            `(compatible; MSIE ${this.version + 1}.${this.version}; Windows NT ${this.version + 1}.${this.version}; WOW64; Arrow/${this.version + 1}.${this.version})`,
            `(X11; Linux i686; rv:${this.version*10}.0.${this.version})`,
            `(X11; U; Linux x86_64; us; rv:${this.version+1}.${this.version}.${this.version}.${this.version*10})`,
            `(X11; U; Linux x86_64; eu; rv:${this.version+1}.${this.version}.${this.version}.${this.version*10})`,
            `(X11; U; Linux x64; us; rv:${this.version+1}.${this.version}.${this.version}.${this.version*10})`,
            `(X11; U; Linux x64; eu; rv:${this.version+1}.${this.version}.${this.version}.${this.version*10})`,
            `(X11; U; Linux x32; us; rv:${this.version+1}.${this.version}.${this.version}.${this.version*10})`,
            `(X11; U; Linux x32; eu; rv:${this.version+1}.${this.version}.${this.version}.${this.version*10})`,
            `(X11; FreeBSD amd64) AppleWebKit/${this.version+1}${this.version}${this.version}.5 (KHTML like Gecko)`,
            `(X11; FreeBSD amd32) AppleWebKit/${this.version+1}${this.version}${this.version}.5 (KHTML like Gecko)`,
            `(X11; FreeBSD i64) AppleWebKit/${this.version+1}${this.version}${this.version}.5 (KHTML like Gecko)`,
            `(X11; FreeBSD i32) AppleWebKit/${this.version+1}${this.version}${this.version}.5 (KHTML like Gecko)`
        ]
        return opts[Math.floor(Math.random() * opts.length)]
    }

    get randomUserAgent(): string {
        return `${this.engine}/${this.version + 1}.${this.version}`
    }
}