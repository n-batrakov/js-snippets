export type Next<A, B> = (context: A) => B
export type Middleware<A, B> = (context: A, next: Next<A, B>) => B

export function combineMiddleware<A, B>(...middleware: Middleware<A, B>[]): Next<A, B> {
  return middleware.reduceRight<Next<A, B>>(
    (prev, next) => (ctx: A) => next(ctx, prev),
    () => { throw new Error('No middleware handled the context') },
  )
}


function sample() {
  type M = Middleware<number, string>
  const m1: M = (ctx, next) => ctx === 1 ? 'One' : next(ctx)
  const m2: M = (ctx, next) => ctx === 2 ? 'Two' : next(ctx)
  const fallback: M = () => 'Unknown'

  const middlware = combineMiddleware(m1, m2, fallback)

  console.log(middlware(1)) // One
  console.log(middlware(2)) // Two
  console.log(middlware(3)) // Unknown
}
