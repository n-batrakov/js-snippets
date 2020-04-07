type F0<A> = () => A
type F1<A, B> = (a: A) => B
type F2<A, B, C> = (a: A, b: B) => C
type F3<A, B, C, D> = (a: A, b: B, c: C) => D
type F4<A, B, C, D, E> = (a: A, b: B, c: C, d: D) => E

type CF0<A> = F0<A>
type CF1<A, B> = F1<A, B>
type CF2<A, B, C> = (a: A) => (b: B) => C
type CF3<A, B, C, D> = (a: A) => (b: B) => (c: C) => D
type CF4<A, B, C, D, E> = (a: A) => (b: B) => (c: C) => (d: D) => E

export function curry<A>(f: F0<A>): CF0<A>
export function curry<A, B>(f: F1<A, B>): CF1<A, B>
export function curry<A, B, C>(f: F2<A, B, C>): CF2<A, B, C>
export function curry<A, B, C, D>(f: F3<A, B, C, D>): CF3<A, B, C, D>
export function curry<A, B, C, D, E>(f: F4<A, B, C, D, E>): CF4<A, B, C, D, E>

export function curry(fn: any): any {
    return (...args: any[]) => args.length === fn.length
        ? fn.call(undefined, ...args)
        : curry(fn.bind(undefined, ...args))
}

describe('curry', () => {
    it('can curry 0-arry', () => {
        let f = () => 42

        let expected = 42
        let actual = curry(f)()

        expect(actual).toEqual(expected)
    })

    it('can curry 1-arry', () => {
        let inc = (a: number) => a + 1

        let expected = 42
        let actual = curry(inc)(41)

        expect(actual).toEqual(expected)
    })

    it('can curry 2-arry', () => {
        let mul = (a: number, b: number) => a * b

        let expected = 42
        let actual = curry(mul)(2)(21)

        expect(actual).toEqual(expected)
    })

    it('can curry 3-arry', () => {
        let join = (a: string, b: string, c: string) => `${a} ${b} ${c}`

        let expected = 'One Two Three'
        let actual = curry(join)('One')('Two')('Three')

        expect(actual).toEqual(expected)
    })

    it('can partially apply multiple arguments at once', () => {
        let join = (a: string, b: string, c: string) => `${a} ${b} ${c}`

        let expected = 'One Two Three'

        // Have to fight TypeScript here
        let actual = (curry(join) as any)('One', 'Two')('Three')

        expect(actual).toEqual(expected)
    })
})