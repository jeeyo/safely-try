declare function safely<T>(fn: (...args: any[]) => T): [T?, unknown?] | Promise<[T?, unknown?]>;
