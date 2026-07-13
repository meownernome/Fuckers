export class Logger {
  private static formatTime(): string {
    return new Date().toISOString().replace('T', ' ').substring(0, 19);
  }

  static info(message: string, ...args: unknown[]): void {
    console.log(`[${this.formatTime()}] [INFO] ${message}`, ...args);
  }

  static warn(message: string, ...args: unknown[]): void {
    console.warn(`[${this.formatTime()}] [WARN] ${message}`, ...args);
  }

  static error(message: string, error?: Error | unknown): void {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error(`[${this.formatTime()}] [ERROR] ${message}`, errMsg);
  }

  static debug(message: string, ...args: unknown[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[${this.formatTime()}] [DEBUG] ${message}`, ...args);
    }
  }

  static rateLimit(message: string, retryAfter: number): void {
    console.warn(`[${this.formatTime()}] [RATELIMIT] ${message} - Retry after ${retryAfter}ms`);
  }

  static success(message: string, ...args: unknown[]): void {
    console.log(`[${this.formatTime()}] [SUCCESS] ${message}`, ...args);
  }
}