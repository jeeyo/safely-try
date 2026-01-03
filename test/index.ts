import safelyTry, { safelyTryTuple } from '../src';

// https://stackoverflow.com/a/73461648/3562309
export function assert<T extends never>() { }
type TypeEqualityGuard<A, B> = Exclude<A, B> | Exclude<B, A>;

describe('safelyTry type assert', () => {
  it('should infer correct data type (string)', () => {
    const { data, error } = safelyTry(() => 'hello');
    if (error === undefined) {
      assert<TypeEqualityGuard<typeof data, string>>();
    }
  });

  it('should infer correct data type (number)', () => {
    const { data, error } = safelyTry(() => 1);
    if (error === undefined) {
      assert<TypeEqualityGuard<typeof data, number>>();
    }
  });

  it('should infer correct error type', () => {
    const { data, error } = safelyTry(() => 1);
    if (data === undefined) {
      assert<TypeEqualityGuard<typeof error, Error>>();
    }
  });
});


describe('safelyTryTuple type assert', () => {
  it('should infer correct data type (string)', () => {
    const [data, error] = safelyTryTuple(() => 'hello');
    if (error === undefined) {
      assert<TypeEqualityGuard<typeof data, string>>();
    }
  });

  it('should infer correct data type (number)', () => {
    const [data, error] = safelyTryTuple(() => 1);
    if (error === undefined) {
      assert<TypeEqualityGuard<typeof data, number>>();
    }
  });

  it('should infer correct error type', () => {
    const [data, error] = safelyTryTuple(() => 1);
    if (data === undefined) {
      assert<TypeEqualityGuard<typeof error, Error>>();
    }
  });
});

describe('safelyTry', () => {
  it('should return { data: 1, error: undefined } when called with a synchronous function that returns 1 without errors', () => {
    expect(safelyTry(() => 1)).toStrictEqual({ data: 1, error: undefined });
  });

  it('should return { data: 3, error: undefined } when called with a synchronous function that returns sum of 1 and 2 without errors', () => {
    expect(safelyTry((x, y) => x + y, 1, 2)).toStrictEqual({ data: 3, error: undefined });
  });

  it('should return { data: undefined, error: "1" } when called with a synchronous function that throws "1"', () => {
    expect(safelyTry(() => { throw '1' })).toStrictEqual({ data: undefined, error: '1' });
  });

  it('should return { data: undefined, error: Error("1") } when called with a synchronous function that throws an error with message "1"', () => {
    expect(safelyTry(() => { throw new Error('1') })).toStrictEqual({ data: undefined, error: Error('1') });
  });
});

describe('safelyTryTuple', () => {
  it('should return [1, undefined] when called with a synchronous function that returns 1 without errors', () => {
    expect(safelyTryTuple(() => 1)).toStrictEqual([1, undefined]);
  });

  it('should return [3, undefined] when called with a synchronous function that returns sum of 1 and 2 without errors', () => {
    expect(safelyTryTuple((x, y) => x + y, 1, 2)).toStrictEqual([3, undefined]);
  });

  it('should return [undefined, "1"] when called with a synchronous function that throws "1"', () => {
    expect(safelyTryTuple(() => { throw '1' })).toStrictEqual([undefined, '1']);
  });

  it('should return [undefined, Error("1")] when called with a synchronous function that throws an error with message "1"', () => {
    expect(safelyTryTuple(() => { throw new Error('1') })).toStrictEqual([undefined, Error('1')]);
  });
});

describe('await safelyTry()', () => {
  it('should return { data: 1, error: undefined } when called with an asynchronous function that returns 1 without errors', async () => {
    expect(await safelyTry(async () => Promise.resolve(1))).toStrictEqual({ data: 1, error: undefined });
  });

  it('should return { data: 3, error: undefined } when called with an asynchronous function that returns sum of 1 and 2 without errors', async () => {
    expect(await safelyTry(async (x, y) => Promise.resolve(x + y), 1, 2)).toStrictEqual({ data: 3, error: undefined });
  });

  it('should return { data: undefined, error: "1" } when called with an asynchronous function that rejects with "1"', async () => {
    expect(await safelyTry(async () => Promise.reject('1'))).toStrictEqual({ data: undefined, error: '1' });
  });

  it('should return { data: undefined, error: Error("1") } when called with an asynchronous function that rejects with an error with message "1"', async () => {
    expect(await safelyTry(async () => Promise.reject(new Error('1')))).toStrictEqual({ data: undefined, error: Error('1') });
  });

  it('should return { data: undefined, error: "1" } when called with an asynchronous function that throws "1"', async () => {
    expect(await safelyTry(async () => { throw '1' })).toStrictEqual({ data: undefined, error: '1' });
  });

  it('should return { data: undefined, error: Error("1") } when called with an asynchronous function that throws an error with message "1"', async () => {
    expect(await safelyTry(async () => { throw new Error('1') })).toStrictEqual({ data: undefined, error: Error('1') });
  });
});


describe('await safelyTryTuple()', () => {
  it('should return [1, undefined] when called with an asynchronous function that returns 1 without errors', async () => {
    expect(await safelyTryTuple(async () => Promise.resolve(1))).toStrictEqual([1, undefined]);
  });

  it('should return [3, undefined] when called with an asynchronous function that returns sum of 1 and 2 without errors', async () => {
    expect(await safelyTryTuple(async (x, y) => Promise.resolve(x + y), 1, 2)).toStrictEqual([3, undefined]);
  });

  it('should return [undefined, "1"] when called with an asynchronous function that rejects with "1"', async () => {
    expect(await safelyTryTuple(async () => Promise.reject('1'))).toStrictEqual([undefined, '1']);
  });

  it('should return [undefined, Error("1")] when called with an asynchronous function that rejects with an error with message "1"', async () => {
    expect(await safelyTryTuple(async () => Promise.reject(new Error('1')))).toStrictEqual([undefined, Error('1')]);
  });

  it('should return [undefined, "1"] when called with an asynchronous function that throws "1"', async () => {
    expect(await safelyTryTuple(async () => { throw '1' })).toStrictEqual([undefined, '1']);
  });

  it('should return [undefined, Error("1")] when called with an asynchronous function that throws an error with message "1"', async () => {
    expect(await safelyTryTuple(async () => { throw new Error('1') })).toStrictEqual([undefined, Error('1')]);
  });
});
