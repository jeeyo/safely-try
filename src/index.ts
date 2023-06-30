function isPromise<T, S>(obj: PromiseLike<T> | S): obj is PromiseLike<T> {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && 'then' in obj && typeof obj.then === 'function';
}

function safelyTry<T>(fn: (((...args: any[]) => T) | (() => T)), ...args: any[]): T extends Promise<any> ? Promise<[undefined, unknown] | [Awaited<T>, undefined]> : [undefined, unknown] | [T, undefined] {
  try {
    // try calling the function
    const x = fn(...args);

    // asynchronous functions
    if (isPromise(x)) {
      // @ts-ignore
      return Promise.resolve(x)
        .then(
          value  => [value as Awaited<T>, undefined],
          error => [undefined, error as unknown]
        );
    }

    // synchronous functions
    // @ts-ignore
    return [x, undefined];
  }
  catch(error) {
    // @ts-ignore
    return [undefined, error];
  }
};

export default safelyTry;
