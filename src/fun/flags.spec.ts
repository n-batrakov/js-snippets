export const encode = (xs: boolean[]): number => xs
  .map((x, i) => x ? Math.pow(2, i) : 0)
  .reduce((value, pow) => value | pow, 0)

export const decode = (value: number, len: number): boolean[] => Array(len).fill(undefined)
  .map((_, i) => Math.pow(2, i))
  .map(pow => (value & pow) === pow)



describe('flags', () => {
  it('encode <-> decode', () => {
    let init = Object.values({
      monday: true,    // 1
      tuesday: false,  // 2
      wednesday: true, // 4
      thursday: true,  // 8
      friday: false,   // 16
      saturday: false, // 32
      sunday: false,   // 64
    })

    let actualEnc = encode(init)
    let actualDec = decode(actualEnc, init.length)

    expect(actualEnc).toEqual(1 | 4 | 8)
    expect(actualDec).toEqual(init)
  })
})
