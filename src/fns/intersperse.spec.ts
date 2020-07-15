export const intersperse = <T>(xa: T[], xb: T[]): T[] => {
  let len = xa.length > xb.length ? xa.length + xb.length : xa.length * 2
  let res = Array(len).fill(undefined)
  let j = 0

  for (let i = 0; i < xa.length; i++) {
    res[j++] = xa[i]
    if (i < xb.length) res[j++] = xb[i]
  }

  return res
}

describe('intersperse', () => {
  it('a == b', () => {
    let xa = [1, 2, 3, 4]
    let xb = [11, 12, 13, 14]

    let expected = [1, 11, 2, 12, 3, 13, 4, 14]
    let actual = intersperse(xa, xb)

    expect(actual).toEqual(expected)
  })

  it('a > b', () => {
    let xa = [1, 2, 3, 4]
    let xb = [11]

    let expected = [1, 11, 2, 3, 4]
    let actual = intersperse(xa, xb)

    expect(actual).toEqual(expected)
  })

  it('a < b', () => {
    let xa = [1]
    let xb = [11, 12, 13]

    let expected = [1, 11]
    let actual = intersperse(xa, xb)

    expect(actual).toEqual(expected)
  })

  it('[], b', () => {
    let xa: number[] = []
    let xb = [11, 12, 13]

    let expected: number[] = []
    let actual = intersperse(xa, xb)

    expect(actual).toEqual(expected)
  })

  it('a, []', () => {
    let xa = [1, 2, 3]
    let xb: number[] = []

    let expected = [1, 2, 3]
    let actual = intersperse(xa, xb)

    expect(actual).toEqual(expected)
  })
})