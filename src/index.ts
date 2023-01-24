function isPromise<T, S>(obj: PromiseLike<T> | S): obj is PromiseLike<T> {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && 'then' in obj && typeof obj.then === 'function';
}

const safelyTry = <T>(fn: ((...args: any[]) => T) | (() => T), ...args: any[]): [undefined, unknown] | [T, undefined] | PromiseLike<[undefined, unknown] | [T, undefined]> => {

  try {

    // try calling the function
    const x = fn(...args);

    // asynchronous functions
    if (isPromise(x)) {
      return Promise.resolve(x)
        .then(
          value  => [value as T, undefined],
          error => [undefined, error as unknown]
        );
    }

    // synchronous functions
    return [x, undefined];

  }
  catch(error) {
    return [undefined, error];
  }

};

export default safelyTry;
