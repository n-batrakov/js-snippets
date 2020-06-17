export type Scalar = boolean | number | string

export type Obj<T> = { [key: string]: T }

export type Fn<A, B> = (x: A) => B

export type Tuple<A, B> = [A, B]
export type Tuple3<A, B, C> = [A, B, C]
export type Tuple4<A, B, C, D> = [A, B, C, D]
export type Tuple5<A, B, C, D, E> = [A, B, C, D, E]
export type Tuple6<A, B, C, D, E, F> = [A, B, C, D, E, F]