declare function safelyTry<T>(fn: (...args: any[]) => T): [T?, unknown?] | Promise<[T?, unknown?]>;
