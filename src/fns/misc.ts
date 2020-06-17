export const assertNever = (_: never) => {}

export const head  = <T = any>([x]: T[]) => x
export const tail  = <T = any>([, ...x]: T[]) => x
export const last  = <T = any>(xs: T[]) => xs.length === 0 ? undefined : xs[xs.length - 1]
export const index = <T = any>(idx: number) => (xs: T[]) => idx >= xs.length ? undefined : xs[idx]

export const identity = <T = any>(x: T) => x
export const pluck = <T>(k: keyof T) => (x: T) => x[k]

export const isNullOrUndefined = <T>(x: T | null | undefined): x is null | undefined => x === null || x === undefined ? true : false
export const notNullOrUndefined = <T>(x: T | null | undefined): x is T => x === null || x === undefined ? false : true

export const range = (len: number, start: number = 0) => Array(len).fill(0).map((_, i) => i + start)
export const alphabet = range(26, 97).map(x => String.fromCharCode(x))

export const max = <T>(gt: (a: T, b: T) => boolean, init: T) => (xs: T[]): T => xs.reduce(
    (prev, next) => gt(prev, next) ? prev : next,
    init,
  )