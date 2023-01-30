import { execaCommand } from 'execa'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cp, readdir, readFile, rm, writeFile } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const COMMIT = '48c2ecccd17a41d34ce49d8b1bfeb4e3461e4e4f'

const getTestName = (line) => {
  return (
    'codemirror-' +
    line.toLowerCase().slice(1).trim().replaceAll(' ', '-').replaceAll('/', '-')
  )
}

const getTestContent = (lines) => {
  return lines.join('\n').trim() + '\n'
}

const parseFile = (content) => {
  const tests = []
  const lines = content.split('\n')
  let state = 'top'
  let testName = ''
  let testLines = []
  for (const line of lines) {
    switch (state) {
      case 'top':
        if (line.startsWith('#')) {
          testName = getTestName(line)
          state = 'content'
        } else {
          // ignore
        }
        break
      case 'content':
        if (line.startsWith('==>')) {
          tests.push({ testName, testContent: getTestContent(testLines) })
          state = 'top'
          testName = ''
          testLines = []
        } else {
          testLines.push(line)
        }
        break
      default:
        break
    }
  }
  return tests
}

const getAllTests = async (folder) => {
  const dirents = await readdir(folder)
  const allTests = []
  for (const dirent of dirents) {
    const filePath = `${folder}/${dirent}`
    const fileContent = await readFile(filePath, 'utf8')
    const parsed = parseFile(fileContent)
    allTests.push(...parsed)
  }
  return allTests
}

const main = async () => {
  process.chdir(root)
  await rm(`${root}/.tmp`, { recursive: true, force: true })
  await execaCommand(
    `git clone https://github.com/lezer-parser/js .tmp/code-mirror-js`
  )
  process.chdir(`${root}/.tmp/code-mirror-js`)
  await execaCommand(`git checkout ${COMMIT}`)
  process.chdir(root)
  await cp(
    `${root}/.tmp/code-mirror-js/test`,
    `${root}/.tmp/code-mirror-cases`,
    { recursive: true }
  )
  await rm(`${root}/.tmp/code-mirror-cases/test-js.js`)
  await rm(`${root}/.tmp/code-mirror-cases/typescript.txt`)
  const allTests = await getAllTests(`${root}/.tmp/code-mirror-cases`)
  for (const test of allTests) {
    await writeFile(`${root}/test/cases/${test.testName}.jsx`, test.testContent)
  }
}

main()
