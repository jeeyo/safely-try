function isPromise<T, S>(obj: PromiseLike<T> | S): obj is PromiseLike<T> {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && 'then' in obj && typeof obj.then === 'function';
}

function safelyTry<T>(fn: (((...args: any[]) => T) | (() => T)), ...args: any[]):
  T extends Promise<any>
    ? Promise<{ data: undefined, error: unknown } | { data: Awaited<T>, error: undefined }>
    : { data: undefined, error: unknown } | { data: T, error: undefined }
{
  try {
    // try calling the function
    const x = fn(...args);

    // asynchronous functions
    if (isPromise(x)) {
      // @ts-ignore
      return Promise.resolve(x)
        .then(
          value  => ({ data: value as Awaited<T>, error: undefined }),
          error => ({ data: undefined, error: error as unknown }),
        );
    }

    // synchronous functions
    // @ts-ignore
    return { data: x, error: undefined };
  }
  catch(error) {
    // @ts-ignore
    return { data: undefined, error: error as unknown };
  }
};

export default safelyTry;
