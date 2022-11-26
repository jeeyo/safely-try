import isPromise from 'is-promise';

const safelyTry = <T>(fn: (...args: any[]) => T) => {

  let returnValues: T | Promise<T> | undefined = undefined;
  let exceptionThrown: unknown | undefined = undefined;

  try {

    // try calling the function
    const x = fn();

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
