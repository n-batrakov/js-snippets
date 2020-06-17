type F<A extends Array<any>, B> = (...args: A) => B

export function choice<A extends Array<any>, B>(
    fn: F<A, B>,
    nf: F<A, B>,
    f: F<A, boolean>,
) {
    return (...args: A) => f(...args) ? fn(...args) : nf(...args)
}


function sample() {
    let double = (x: number) => x * 2
    let halve = (x: number) => x / 2
    let odd = (x: number) => x % 2 === 1

    let doubleOrHalve = choice(double, halve, odd)

    console.log(doubleOrHalve(3)) // OUTPUTS: 6
    console.log(doubleOrHalve(4)) // OUTPUTS: 2
}