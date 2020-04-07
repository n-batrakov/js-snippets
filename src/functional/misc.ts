export const head  = <T = any>([x]: T[]) => x
export const tail  = <T = any>([, ...x]: T[]) => x
export const last  = <T = any>(xs: T[]) => xs.length === 0 ? undefined : xs[xs.length - 1]
export const index = <T = any>(idx: number) => (xs: T[]) => idx >= xs.length ? undefined : xs[idx]

export const identity = <T = any>(x: T) => x
export const pluck = <T>(k: keyof T) => (x: T) => x[k]

export const isNullOrUndefined = <T>(x: T): x is null | undefined => x === null || x === undefined ? true : false
export const notNullOrUndefined = <T>(x: T): x is T => x === null || x === undefined ? false : true