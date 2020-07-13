const scale = (
  (xmin: number, xmax: number) =>
    (from: number, to: number) =>
      (x: number) => {
        let factor = (x - xmin) / (xmax - xmin)
        return from + (to - from) * factor
      }
)

const scaleFraction = scale(0, 1)

const scaleToByte = scaleFraction(0, 255)

const randomByte = () => Math.floor(scaleToByte(Math.random()))

const randomBytes = (len: number) => new Array(len).fill(undefined).map(randomByte)

const toHex = (byte: number) => byte.toString(16).padStart(2, '0')

const group = (groupLengths: number[], separator: string) => {
  let i = 0
  let j = 0

  return (acc: string, x: string): string => {
    if (i++ < groupLengths[j]) {
      return `${acc}${x}`
    } else {
      i = 1; j++
      return `${acc}${separator}${x}`
    }
  }
}

const formatUuid = group([4, 2, 2, 2, 6], '-')

export const uuid = () =>
  randomBytes(16).map(toHex).reduce(formatUuid, '')


describe('uuid', () => {
  it('generates uuid', () => {
    let actual = uuid()

    let expected = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

    expect(actual).toMatch(expected)
  })
})