# safely-try

`safelyTry()` is an elegant try-catch replacement for JavaScript / TypeScript

## Installation

```bash
npm i --save safely-try
```

### Usage

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
import safelyTry from 'safelyTry';

const [result, error] = safelyTry(somethingMightThrowException);
if (error) {
  handleTheError(error);
  return;
}
```

---

```typescript
// synchronous functions
safelyTry(() => 1) === [1, undefined]
safelyTry((x, y) => x + y, 1, 2) === [3, undefined]
safelyTry(() => { throw '1' }) === [undefined, '1']
safelyTry(() => { throw new Error('1') }) === [undefined, Error('1')]

// asynchronous functions
await safelyTry(async () => Promise.resolve(1)) === [1, undefined]
await safelyTry(async (x, y) => Promise.resolve(x + y), 1, 2) === [3, undefined]
await safelyTry(async () => Promise.reject('1')) === [undefined, '1']
await safelyTry(async () => Promise.reject(new Error('1'))) === [undefined, Error('1')]
```
