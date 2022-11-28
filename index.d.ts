declare function safelyTry<T>(fn: (...args: any[]) => T, ...args: any[]): [T?, unknown?] | PromiseLike<[T?, unknown?]>;
