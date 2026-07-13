"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
class Logger {
    info(message, ...args) {
        console.log(`[${new Date().toISOString()}] INFO: ${this.formatMessage(message, args)}`);
    }
    warn(message, ...args) {
        console.warn(`[${new Date().toISOString()}] WARN: ${this.formatMessage(message, args)}`);
    }
    error(message, ...args) {
        if (message instanceof Error) {
            console.error(`[${new Date().toISOString()}] ERROR: ${message.message}`);
            if (message.stack)
                console.error(message.stack);
        }
        else {
            console.error(`[${new Date().toISOString()}] ERROR: ${this.formatMessage(message, args)}`);
        }
    }
    formatMessage(message, args) {
        if (args.length === 0)
            return message;
        if (message.includes('{0}')) {
            return message.replace(/\{(\d+)\}/g, (_, index) => String(args[parseInt(index)]) || '');
        }
        const parts = args.map(a => (a instanceof Error ? `${a.message}\n${a.stack}` : String(a)));
        return `${message} ${parts.join(' ')}`;
    }
}
exports.Logger = Logger;
exports.logger = new Logger();
