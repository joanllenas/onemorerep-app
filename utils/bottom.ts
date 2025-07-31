/**
 * Make sure all switch cases are covered but return a value on the deafult clause.
 */
export function bottomWithReturn<T>(_: never, returnValue: T): T {
  return returnValue;
}

/**
 * Make sure all switch cases are covered and throw an Error otherwise
 */
export function bottom(_: never): never {
  throw new Error('Exhaustive matching violation');
}
