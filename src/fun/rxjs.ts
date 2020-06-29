interface Observer<A> {
  next(x: A): void
  error(e: string | Error): void
  complete(): void
}

type Unsubscribe = () => void
type Subscribe<A> = (obs: Observer<A>) => Unsubscribe | undefined
type Operator<A, B> = (o: Observable<A>) => Observable<B>

const emptyFn = () => {}

class Observable<A> {
  constructor(
    private sub: Subscribe<A>,
  ) {}

  public subscribe(obs: Partial<Observer<A>>): Unsubscribe {
    let safeObserver = this.getSafeObserver(obs)
    return this.sub(safeObserver) || emptyFn
  }

  public pipe(...op: Operator<any, any>[]) {
    op.reduce((acc, x) => x(acc), this)
  }

  private getSafeObserver(obs: Partial<Observer<A>>): Observer<A> {
    return {
      next: obs.next ?? emptyFn,
      complete: obs.complete ?? emptyFn,
      error: obs.error ?? emptyFn,
    }
  }
}


const map = <A, B>(f: (x: A) => B): Operator<A, B> =>
  ($: Observable<A>) => new Observable<B>(obs => $.subscribe({
    next: x => obs.next(f(x)),
    error: e => obs.error(e),
    complete: () => obs.complete(),
  }))

const reduce = <A, B>(f: (acc: B, x: A) => B, init: B) => ($: Observable<A>) => new Observable<B>((obs) => {
  let acc = init

  return $.subscribe({
    next: (x) => {
      acc = f(acc, x)
    },
    error: e => obs.error(e),
    complete: () => {
      obs.next(acc)
      obs.complete()
    },
  })
})

const of = <A>(...xs: A[]) => new Observable((obs) => {
  xs.forEach(x => obs.next(x))
  obs.complete()

  return () => {}
})

function sample() {
  of(1, 2, 3).pipe(
    map(x => x + 1),
    reduce((a, b) => a + b, 0),
  )
}
