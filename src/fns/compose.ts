type Fn<A, B> = (a: A) => B

export function compose<A = any, B = any>(): Fn<A, B>
export function compose<A, B>(f1: Fn<A, B>): Fn<A, B>
export function compose<A, B, C>(f1: Fn<B, C>, f2: Fn<A, B>): Fn<A, C>
export function compose<A, B, C, D>(f1: Fn<C, D>, f2: Fn<B, C>, f3: Fn<A, B>): Fn<A, D>
export function compose<A, B, C, D, E>(f1: Fn<D, E>, f2: Fn<C, D>, f3: Fn<B, C>, f4: Fn<A, B>): Fn<A, E>
export function compose<A, B, C, D, E, F>(f1: Fn<E, F>, f2: Fn<D, E>, f3: Fn<C, D>, f4: Fn<B, C>, f5: Fn<A, B>): Fn<A, F>
export function compose<A, B, C, D, E, F, G>(f1: Fn<F, G>, f2: Fn<E, F>, f3: Fn<D, E>, f4: Fn<C, D>, f5: Fn<B, C>, f6: Fn<A, B>): Fn<A, G>
export function compose(...fns: Fn<any, any>[]) {
    return (a: any) => fns.reduceRight((b, f) => f(b), a)
}

function sample() {
  const scale = (x: number) => x * 100
  const ceil = Math.ceil
  const toLocaleString = (x: number) => x.toLocaleString()
  const concat = (appendix: string) => (x: string) => x.concat(appendix)

  // Equivalent to:
  // x => concat('%')(toLocaleString(ceil(scale(x))))
  const toPercent = compose(
    concat('%'),
    toLocaleString,
    ceil,
    scale,
  )

  console.log(toPercent(0.01)) // OUTPUTS: "1%"
}