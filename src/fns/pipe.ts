type Fn<A, B> = (a: A) => B

export function pipe<A = any, B = any>(): Fn<A, B>
export function pipe<A, B>(f1: Fn<A, B>): Fn<A, B>
export function pipe<A, B, C>(f1: Fn<A, B>, f2: Fn<B, C>): Fn<A, C>
export function pipe<A, B, C, D>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>): Fn<A, D>
export function pipe<A, B, C, D, E>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>): Fn<A, E>
export function pipe<A, B, C, D, E, F>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>, f5: Fn<E, F>): Fn<A, F>
export function pipe<A, B, C, D, E, F, G>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>, f5: Fn<E, F>, f6: Fn<F, G>): Fn<A, G>
export function pipe(...fns: Fn<any, any>[]) {
    return (a: any) => fns.reduce((b, f) => f(b), a)
}


function sample() {
  const scale = (x: number) => x * 100
  const ceil = Math.ceil
  const toLocaleString = (x: number) => x.toLocaleString()
  const concat = (appendix: string) => (x: string) => x.concat(appendix)

  // Equivalent to:
  // x => concat('%')(toLocaleString(ceil(scale(x))))
  const toPercent = pipe(
    scale,
    ceil,
    toLocaleString,
    concat('%'),
  )

  console.log(toPercent(0.01)) // OUTPUTS: "1%"
}