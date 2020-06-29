const switch$ = (obj) => {
  let fns = Object.entries(obj).map(([k, v]) => {
    let f = new Function(`return (${k})`)()

    return [f, v]
  })

  return (x) => {
    let [, v] = fns.find(([f]) => f(x)) || []

    return v
  }
}
const default$ = () => true


function sample() {
  let select = switch$({
    [x => x.n === 42]: 'The Answer',
    [x => x.n > 1000]: 'Big number',
    [x => x.n % 2 === 0]: 'Odd',
    [x => x.n % 2 === 1]: 'Even',
    [default$]: 'default',
  })

  console.log(select({ n: 42 }))
}

