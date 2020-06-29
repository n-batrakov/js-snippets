import { Readable } from 'stream'

export const wait = (ms: number) => new Promise(x => setTimeout(x, ms))

async function * seqAsync(count: number, delay: number) {
  for (let i = 0; i < count; i++) {
    await wait(delay)
    yield i + 1

    if (i === 5) {
      throw new Error('Oh no!')
    }
  }
}

export const slowStream = (n: number, ms: number) => Readable.from(seqAsync(n, ms))