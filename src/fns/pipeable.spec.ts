type Fn<A, B> = (a: A) => B

type R<T> = Pipeable<T>

export class Pipeable<A> {
  constructor(private ctx: A) {}

  value() { return this.ctx }

  pipe(): R<A>
  pipe<B>(f1: Fn<A, B>): R<B>
  pipe<B, C>(f1: Fn<A, B>, f2: Fn<B, C>): R<C>
  pipe<B, C, D>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>): R<D>
  pipe<B, C, D, E>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>): R<E>
  pipe<B, C, D, E, F>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>, f5: Fn<E, F>): R<F>
  pipe<B, C, D, E, F, G>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>, f5: Fn<E, F>, f6: Fn<F, G>): R<G>
  pipe(...fns: Fn<any, any>[]) {
    return new Pipeable(fns.reduce((b, f) => f(b), this.ctx))
  }
}

export const pipeable = <T>(x: T) => new Pipeable(x)

describe('pipeable', () => {
  type A = { a: string[] }

  const empty = (): A => ({ a: [] })

  const operator = (a: string) => (x: A): A => ({ ...x, a: [...x.a, a] })

  it('pipe', () => {
    let actual = pipeable(empty()).pipe(operator('test')).value()

    let expected: A = { a: ['test'] }

    expect(actual).toEqual(expected)
  })

  it('double pipe', () => {
    let actual = pipeable(empty()).pipe(operator('a')).pipe(operator('b')).value()

    let expected: A = { a: ['a', 'b'] }

    expect(actual).toEqual(expected)
  })
})
