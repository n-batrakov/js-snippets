const fold = (nested: any): any => Object.entries(nested).reduce(
  (acc, [k, v]) => {
    if (v instanceof Date || typeof v !== 'object' || Array.isArray(v)) {
      acc[k] = v
      return acc
    }

    Object.entries(fold(v)).forEach(([k1, v1]) => {
      acc[`${k}.${k1}`] = v1
    })

    return acc
  },
  {} as any,
)

const unfold = (plain: any) => {
  let nested: any = {}

  Object.entries(plain).forEach(([k, v]) => {
    let parent = nested
    let keys = k.split('.')

    keys.forEach((key, i) => parent = parent[key] =
      i === keys.length - 1
        ? v
        : parent[key] || {},
    )
  })

  return nested
}


describe('fold', () => {
  it('fold nested', () => {
    let init = {
      a: 1,
      b: { a: 1, b: 2 },
      c: { a: { a: 1, b: 2 } },
    }

    let expected = {
      a: 1,
      'b.a': 1,
      'b.b': 2,
      'c.a.a': 1,
      'c.a.b': 2,
    }

    let actual = fold(init)

    expect(actual).toEqual(expected)
  })
})

describe('unfold', () => {
  it('unfold nested', () => {
    let init = {
      a: 1,
      'b.a': 1,
      'b.b': 2,
      'c.a.a': 1,
      'c.a.b': 2,
    }

    let expected = {
      a: 1,
      b: { a: 1, b: 2 },
      c: { a: { a: 1, b: 2 } },
    }

    let actual = unfold(init)

    expect(actual).toEqual(expected)
  })
})
