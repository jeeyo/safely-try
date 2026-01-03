function isPromise<T, S>(obj: PromiseLike<T> | S): obj is PromiseLike<T> {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && 'then' in obj && typeof obj.then === 'function';
}

export default function safelyTry<T, E = Error>(fn: (((...args: any[]) => T) | (() => T)), ...args: any[]):
  T extends PromiseLike<any>
  ? Promise<{ data: undefined, error: E }> | Promise<{ data: Awaited<T>, error: undefined }>
  : { data: undefined, error: E } | { data: T, error: undefined } {
  try {
    // try calling the function
    const x = fn(...args);

    // asynchronous functions
    if (isPromise(x)) {
      // @ts-ignore
      return Promise.resolve(x)
        .then(
          (value: Awaited<T>) => ({ data: value, error: undefined }),
          (error: E) => ({ data: undefined, error: error }),
        );
    }

    // synchronous functions
    // @ts-ignore
    return { data: x, error: undefined };
  }
  catch (error) {
    // @ts-ignore
    return { data: undefined, error: error as E };
  }
};

export function safelyTryTuple<T, E = Error>(fn: (((...args: any[]) => T) | (() => T)), ...args: any[]):
  T extends PromiseLike<any>
  ? Promise<[undefined, E]> | Promise<[Awaited<T>, undefined]>
  : [undefined, E] | [T, undefined] {
  try {
    // try calling the function
    const x = fn(...args);

    // asynchronous functions
    if (isPromise(x)) {
      // @ts-ignore
      return Promise.resolve(x)
        .then(
          (value: Awaited<T>) => [value, undefined],
          (error: E) => [undefined, error],
        );
    }

    // synchronous functions
    // @ts-ignore
    return [x, undefined];
  }
  catch (error) {
    // @ts-ignore
    return [undefined, error as E];
  }
}
