import safely from '../src';

describe('safely()', () => {

  test('should return [1, undefined] when called with a synchronous function that returns 1 without errors', () => {
    expect(safely(() => 1)).toStrictEqual([1, undefined]);
  });

  test('should return [undefined, Error("1")] when called with a synchronous function that throws an error with message "1"', () => {
    expect(safely(() => { throw new Error('1'); })).toStrictEqual([undefined, Error('1')]);
  });

  test('should return [undefined, "1"] when called with a synchronous function that throws "1"', () => {
    expect(safely(() => { throw '1' })).toStrictEqual([undefined, '1']);
  });
});

describe('await safely()', () => {

  test('should return [1, undefined] when called with an asynchronous function that returns 1 without errors', async () => {
    expect(await safely(async () => Promise.resolve(1))).toStrictEqual([1, undefined]);
  });

  test('should return [undefined, Error("1")] when called with an asynchronous function that rejects with an error with message "1"', async () => {
    expect(await safely(async () => Promise.reject(new Error('1')))).toStrictEqual([undefined, Error('1')]);
  });

  test('should return [undefined, "1"] when called with an asynchronous function that rejects with "1"', async () => {
    expect(await safely(async () => Promise.reject('1'))).toStrictEqual([undefined, '1']);
  });

  test('should return [undefined, Error("1")] when called with an asynchronous function that throws an error with message "1"', async () => {
    expect(await safely(async () => { throw new Error('1'); })).toStrictEqual([undefined, Error('1')]);
  });

  test('should return [undefined, "1"] when called with an asynchronous function that throws "1"', async () => {
    expect(await safely(async () => { throw '1' })).toStrictEqual([undefined, '1']);
  });
});
