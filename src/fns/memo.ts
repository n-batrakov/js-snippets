const memo = <A extends any[], B>(fn: ((...args: A) => B), getKey: (...args: A) => string | undefined) => {
  const storage: any = {}

  return (...args: A): B => {
    const key = getKey(...args)
    if (!key) return fn(...args)
    if (!(key in storage)) {
      const result = fn(...args)
      storage[key] = result
    }
    return storage[key]
  }
}
