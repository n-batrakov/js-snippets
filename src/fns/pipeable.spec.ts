type Fn<A, B> = (a: A) => B

const createPipe = (a: any) => (...fns: Fn<any, any>[]) => fns.reduce((b, f) => f(b), a)

export type Pipeable<A> = A & {
    pipe(): A,
    pipe<B>(f1: Fn<A, B>): B
    pipe<B, C>(f1: Fn<A, B>, f2: Fn<B, C>): C
    pipe<B, C, D>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>): D
    pipe<B, C, D, E>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>): E
    pipe<B, C, D, E, F>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>, f5: Fn<E, F>): F
    pipe<B, C, D, E, F, G>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>, f5: Fn<E, F>, f6: Fn<F, G>): G,
}

export const pipeable = <T>(x: T): Pipeable<T> => ({
    ...x,
    pipe: createPipe(x),
})

describe('pipeable', () => {
    type A = { a: string[] }

    const empty = (): A => ({ a: [] })

    const operator = (a: string) => (x: A): A => ({ ...x, a: [...x.a, a] })

    it('pipe', () => {
        let actual = pipeable(empty()).pipe(operator('test'))

        let expected: A = { a: ['test'] }

        expect(actual).toEqual(expected)
    })
})
