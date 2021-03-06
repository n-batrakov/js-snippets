type SortFn<T> = (a: T, b: T) => number

const identity = <T>(x: T) => x
const gt = (a: any, b: any) => a === b ? 0 : a > b ? 1 : -1

export function ascending<T = any>(select?: (x: T) => any): SortFn<T> {
  let f = select || identity
  return (a: T, b: T) => gt(f(a), f(b))
}

export function descending<T = any>(select?: (x: T) => any): SortFn<T> {
  let f = select || identity
  return (a: T, b: T) => 0 - gt(f(a), (f(b)))
}

export function combineSort<T>(...fns: SortFn<T>[]): SortFn<T> {
  return (a: T, b: T) =>
    fns.reduce(
      (n, f) => {
        return n === 0 ? f(a, b) : n
      },
      0,
    )
}

describe('sort', () => {
  it('can sort ascending', () => {
    let init = [1, 5, 3, 4, 2]

    let expected = [1, 2, 3, 4, 5]
    let actual = init.sort(ascending())

    expect(actual).toEqual(expected)
  })

  it('can sort descending', () => {
    let init = [1, 5, 3, 4, 2]

    let expected = [5, 4, 3, 2, 1]
    let actual = init.sort(descending())

    expect(actual).toEqual(expected)
  })

  it('can sort objects', () => {
    let init = [1, 5, 3, 4, 2].map(n => ({ n }))

    let expected = [1, 2, 3, 4, 5].map(n => ({ n }))
    let actual = init.sort(ascending(x => x.n))

    expect(actual).toEqual(expected)
  })

  it('can combine sort', () => {
    let init = [
      [0, 5],
      [5, 1],
      [2, 4],
      [2, 3],
      [0, 1],
    ]

    let expected = [
      [0, 1],
      [0, 5],
      [2, 3],
      [2, 4],
      [5, 1],
    ]

    let actual = init.sort(combineSort(
      ascending(x => x[0]),
      ascending(x => x[1]),
    ))

    expect(actual).toEqual(expected)
  })
})