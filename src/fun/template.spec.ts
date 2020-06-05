const restTail = <T>(xs: T[]): [T[], T] => {
    let rest = xs.slice(0, -1)
    let tail = xs[xs.length - 1]

    return [rest, tail]
}

const sliceMany = (points: [number, number][], str: string): [string[], string[]] => points.reduce(
    ([left, right], [a, b], i, xs) => {
        let len = i === 0 ? 0 : xs[i - 1][1]
        let start = a - len
        let end = b - len

        let [strings, source] = restTail(left)

        let head = source.slice(0, start)
        let curr = source.slice(start, end)
        let tail = source.slice(end)

        return [[...strings, head, tail], [...right, curr]]
    },
    [[str], []],
)


const toBreakpoint = (match: RegExpExecArray): [number, number] =>
    [match.index, match.index + match[0].length]

function* matchAll(regexp: RegExp, str: string) {
    let m
    while ((m = regexp.exec(str))) yield m
}

export type TemplateOptions = {
    variableExpression?: RegExp,
}

export const templateEngine = (options?: TemplateOptions) => {
    let opts = options || {}
    let regexp = opts.variableExpression || /(\{\w+\})/g

    return (template: string, values: { [key: string]: any }) => {
        let points = Array.from(matchAll(regexp, template)).map(toBreakpoint)
        let [strings, variables] = sliceMany(points, template)

        return strings.reduce(
            (acc, str, i) => {
                if (i >= variables.length) {
                    return `${acc}${str}`
                }

                let key = variables[i].slice(1, -1)

                if (key in values) {
                    let val = values[key]
                    return `${acc}${str}${val}`
                } else {
                    throw new Error(`Template variable value for '${key}' is not provided`)
                }
            },
            '',
        )
    }
}

describe('template', () => {
    it('replace single variable', () => {
        let replace = templateEngine()

        let actual = replace('{x}', { x: 1 })
        let expected = '1'

        expect(actual).toEqual(expected)
    })

    it('replace multiple variables', () => {
        let replace = templateEngine()

        let actual = replace('{one}{two}{three}', { one: 1, two: 2, three: 3 })
        let expected = '123'

        expect(actual).toEqual(expected)
    })

    it('leave static text', () => {
        let replace = templateEngine()

        let actual = replace('[ {one}, {two}, {three} ]', { one: 1, two: 2, three: 3 })
        let expected = '[ 1, 2, 3 ]'

        expect(actual).toEqual(expected)
    })

    it('ignore unused values', () => {
        let replace = templateEngine()

        let actual = replace('test', { one: 1 })
        let expected = 'test'

        expect(actual).toEqual(expected)
    })

    it('throw on absent values', () => {
        let replace = templateEngine()

        let actual = () => replace('{one}', {})

        expect(actual).toThrowError()
    })

    it('empty template', () => {
        let replace = templateEngine()

        let actual = replace('', {})
        let expected = ''

        expect(actual).toEqual(expected)
    })
})