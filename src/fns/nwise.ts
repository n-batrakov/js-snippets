function nwise<T>(xs: T[], n: number): T[][] {
  let size = Math.ceil(xs.length / n)
  let result = new Array<T[]>(size)

  for (let i = 0; i < result.length; i++) {
    result[i] = xs.slice(i * n, (i * n) + n)
  }

  return result
}
