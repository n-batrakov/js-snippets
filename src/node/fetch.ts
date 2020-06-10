import http from 'http'
import https from 'https'

type RequestInit = http.RequestOptions
type Response = http.IncomingMessage

const success = (x?: number) => x && x >= 200 && x <= 299
const redirect = (x?: number) => x && x >= 300 && x <= 399

const request = async (uri: string, opts: RequestInit): Promise<Response> => {
  let secure = uri.startsWith('https:')
  let makeRequest = secure ? https.request : http.request

  return new Promise((res, rej) => {
    let req = makeRequest(uri, opts, res)

    req
      .on('timeout', () => req.destroy(new Error('Request timed out')))
      .on('error', rej)
      .end()
  })
}

const followRedirects = (opts: RequestInit, max: number) => (response: Response): Promise<Response> => {
  let { statusCode, headers } = response
  let { location } = headers

  if (redirect(statusCode)) {
    if (max > 1 && location) {
      return request(location, opts).then(followRedirects(opts, max - 1))
    } else {
      return Promise.reject(new Error('Too many redirects'))
    }
  } else {
    return Promise.resolve(response)
  }
}

export const ensureSuccessStatusCode = (response: Response) => {
  let { statusCode, statusMessage } = response

  if (success(statusCode)) {
    return response
  } else {
    let status = `${statusCode} ${statusMessage || ''}`
    throw new Error(`Response status code does not indicate success (${status})`)
  }
}

export const fetch = (uri: string, init?: RequestInit): Promise<Response> => {
  let opts = { method: 'GET', ...init }
  return request(uri, opts).then(followRedirects(opts, 5))
}
