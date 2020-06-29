type HtmlAttrs = { [key: string]: string }
type HtmlElement = string
type Child = HtmlComponent | HtmlElement
type HtmlComponent = (...children: Array<Child | Child[]>) => HtmlElement
type HtmlOperator<TAttrs extends HtmlAttrs = HtmlAttrs> = (attrs?: TAttrs) => HtmlComponent

const attr = (x?: HtmlAttrs) => x === undefined ? '' : Object
  .entries(x)
  .reduce((acc, [k, v]) => `${acc} ${k}="${v}"`, '')

function renderComponent(x: Child | Child[]): string {
  return typeof x === 'function' ? x([])
    : Array.isArray(x) ? x.map(renderComponent).join('')
    : x
}

const renderChildren = (xs: Array<Child | Child[]>) => xs.map(renderComponent).join('')

export const tag = <TAttrs extends HtmlAttrs = HtmlAttrs>(tag: string): HtmlOperator<TAttrs> => {
  return a => (...c) => `<${tag}${attr(a)}>${renderChildren(c)}</${tag}>`
}

export const selfClosingTag = <TAttrs extends HtmlAttrs = HtmlAttrs>(tag: string): ((attrs?: TAttrs) => () => HtmlElement) => {
  return a => () => `<${tag}${attr(a)} />`
}

export const html = tag('html')
export const body = tag('body')
export const head = tag('head')
export const div = tag('div')
export const span = tag('span')
export const p = tag('p')
export const a = tag('a')
export const br = selfClosingTag('br')


function sample() {
  let htmlString = html()([
    head(),
    body()(
      p()([
        '123',
        span()('<i>Italics</i>'),
      ]),
    ),
  ])
}
