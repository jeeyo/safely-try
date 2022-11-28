function isPromise<T, S>(obj: PromiseLike<T> | S): obj is PromiseLike<T> {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && 'then' in obj && typeof obj.then === 'function';
}

const safelyTry = <T>(fn: (...args: any[]) => T, ...args: any[]) => {

  let returnValues: T | PromiseLike<T> | undefined = undefined;
  let exceptionThrown: unknown | undefined = undefined;

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
    returnValues = x;
  }
  catch(error) { exceptionThrown = error; }
  return [returnValues, exceptionThrown];
};

export default safelyTry;
