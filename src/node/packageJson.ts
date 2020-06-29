import fs from 'fs'
import { dirname, join } from 'path'

export type PackageJson = {
  name?: string,
  description?: string,
  version?: string,
  scripts?: {
      [key: string]: string,
  },
  author?: string,
  license?: string,
  [key: string]: any,
}

export function packageJson() : PackageJson | null {
  if (require?.main?.filename === undefined) {
    return null
  }

  let baseDir = dirname(require.main.filename)
  let filepath = searchFile(baseDir, 'package.json')

  return filepath === null ? null : parseJson(fs.readFileSync(filepath, 'utf-8'))
}

function searchFile(baseDir: string, filename: string): string | null {
  let filepath = join(baseDir, filename)
  let isExists = fs.existsSync(filepath)

  if (isExists) {
    return filepath
  }

  let parent = dirname(baseDir)
  if (parent === baseDir) {
    return null
  }

  return searchFile(parent, filename)
}

function parseJson(str: string) {
  try {
    return JSON.parse(str)
  } catch {
    return null
  }
}