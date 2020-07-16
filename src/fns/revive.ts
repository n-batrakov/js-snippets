const isPlainObject = (x: any) =>
  x !== null && typeof x === 'object' && Object.getPrototypeOf(x) === Object.prototype

export const revive = (x: any, f: (x: any, k?: string | number) => any, k?: string | number): any => {
  if (Array.isArray(x)) {
    return x.map((x, k) => revive(x, f, k))
  }

  if (isPlainObject(x)) {
    return Object.entries(x).reduce(
      (prev, [k, v]) => {
        prev[k] = revive(v, f, k)
        return prev
      },
      {} as any,
    )
  }

  return f(x, k)
}
