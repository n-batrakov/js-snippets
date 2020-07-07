const isPlainObject = (x: any) =>
  x !== null &&
  typeof x === 'object' &&
  Object.getPrototypeOf(x) === Object.prototype

const concatObject = (a: any, b: any) => Object.keys(b).filter(k => k in a).reduce(
  (acc, k) => {
    acc[k] = concat(a[k], b[k])
    return acc
  },
  { ...a, ...b },
)

const concatArray = (a: any[], b: any[]): any[] => a.concat(b)

export function concat(a: any, b: any) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return concatArray(a, b)
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    return concatObject(a, b)
  }

  return b
}

describe('isPlainObject', () => {
  class Class {}
  let Ctor: any = function () {}

  it.each([
    [null, false],
    [undefined, false],
    [1, false],
    [false, false],
    ['', false],
    [Symbol(42), false],
    [() => {}, false],
    [[], false],
    [new Date(), false],
    [new Class(), false],
    [new Ctor(), false],
    [{}, true],
    [new Object({ a: 42 }), true],
    [{ a: { b: { c: 42 } } }, true],
  ])('%s -> %s', (init, expected) => {
    let actual = isPlainObject(init)

    if (expected) {
      expect(actual).toBeTruthy()
    } else {
      expect(actual).toBeFalsy()
    }
  })
})

describe('concat', () => {
  it.each([
    [null, null, null],
    [undefined, undefined, undefined],
    [1, 2, 2],
    ['one', 'two', 'two'],
    [new Date('2020-07-01'), new Date('2020-07-07'), new Date('2020-07-07')],
    [[1, 2, 3], [4, 5, 6], [1, 2, 3, 4, 5, 6]],
    [{ a: 1 }, { a: 2 }, { a: 2 }],
    [{ a: 1, b: 2 }, { a: 2 }, { a: 2, b: 2 }],
    [{ a: 1 }, { a: 2, b: 2 }, { a: 2, b: 2 }],
    [{ a: 1, b: 2 }, { a: 2, b: undefined }, { a: 2, b: undefined }],
    [{ a: { b: 1, c: 2 } }, { a: { b: 2 } }, { a: { b: 2, c: 2 } }],
    [{ a: [1] }, { a: [2] }, { a: [1, 2] }],
  ])('(%s, %s) -> %s', (a, b, expected) => {
    let actual = concat(a, b)

    expect(actual).toEqual(expected)
  })
})