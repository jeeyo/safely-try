# safely-try

[![Test](https://github.com/jeeyo/safely-try/actions/workflows/test.yml/badge.svg)](https://github.com/jeeyo/safely-try/actions/workflows/test.yml)
[![npm](https://img.shields.io/npm/v/safely-try.svg)](https://www.npmjs.com/package/safely-try)

`safelyTry()` is a type-safe elegant try-catch replacement for JavaScript / TypeScript inspired by [Go error handling](https://go.dev/blog/error-handling-and-go).

## Installation

```bash
npm i --save safely-try
```

## Usage

Instead of using ugly native try-catch like this

```typescript
let result;
try {
  result = somethingMightThrowException();
} catch(e) {
  handleTheError(e);
}
```

you can use safelyTry to do something like this

```typescript
import safelyTry from 'safely-try';

const { data: result, error } = safelyTry(somethingMightThrowException);
if (error) {
  handleTheError(error);
  return;
}
```

---

```typescript
// synchronous functions
safelyTry(() => 1) === { data: 1, error: undefined }
safelyTry((x, y) => x + y, 1, 2) === { data: 3, error: undefined }
safelyTry(() => { throw '1' }) === { data: undefined, error: '1' }
safelyTry(() => { throw new Error('1') }) === { data: undefined, error: Error('1') }

// asynchronous functions
await safelyTry(async () => Promise.resolve(1)) === { data: 1, error: undefined }
await safelyTry(async (x, y) => Promise.resolve(x + y), 1, 2) === { data: 3, error: undefined }
await safelyTry(async () => Promise.reject('1')) === { data: undefined, error: '1' }
await safelyTry(async () => Promise.reject(new Error('1'))) === { data: undefined, error: Error('1') }
```
