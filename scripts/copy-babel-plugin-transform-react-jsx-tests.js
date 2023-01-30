import { execaCommand } from 'execa'
import { createHash } from 'node:crypto'
import { copyFile, cp, readdir, readFile, rm, stat } from 'node:fs/promises'
import path, { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const REPOSITORY = 'https://github.com/babel/babel'
const COMMIT = '41aac8b8037c566047a1f6792cc81c0e01613373'

const getTestName = (rootFolder, line) => {
  return (
    'babel-jsx-' +
    line
      .slice(rootFolder.length + 1)
      .toLowerCase()
      .trim()
      .replaceAll(' ', '-')
      .replaceAll('input.mjs', '')
      .replaceAll('input.js', '')
      .replaceAll('/', '-')
      .replaceAll('\\', '-')
      .slice(0, -1) +
    '.jsx'
  )
}

const getAllTestsInternal = async (
  allTests,
  seenHashes,
  rootFolder,
  folder
) => {
  const dirents = await readdir(folder, { withFileTypes: true })
  for (const dirent of dirents) {
    const filePath = `${folder}/${dirent.name}`
    if (dirent.isDirectory()) {
      await getAllTestsInternal(allTests, seenHashes, rootFolder, filePath)
      continue
    }
    if (dirent.name !== 'input.mjs' && dirent.name !== 'input.js') {
      continue
    }
    const buffer = await readFile(filePath)
    const hash = createHash('sha1').update(buffer).digest('hex')
    if (seenHashes.includes(hash)) {
      continue
    }
    seenHashes.push(hash)
    const name = getTestName(rootFolder, filePath)
    const destinationPath = join(root, 'test', 'cases', name)
    allTests.push({ filePath, destinationPath })
  }
  return allTests
}

const getAllTests = async (folder) => {
  const allTests = []
  const seenHashes = []
  const seenContents = []
  await getAllTestsInternal(allTests, seenHashes, folder, folder)
  return allTests
}

const main = async () => {
  process.chdir(root)
  await rm(`${root}/.tmp`, { recursive: true, force: true })
  await execaCommand(`git clone ${REPOSITORY} .tmp/babel-transform-react-jsx`)
  process.chdir(`${root}/.tmp/babel-transform-react-jsx`)
  await execaCommand(`git checkout ${COMMIT}`)
  process.chdir(root)
  await cp(
    `${root}/.tmp/babel-transform-react-jsx/packages/babel-plugin-transform-react-jsx/test/fixtures`,
    `${root}/.tmp/babel-jsx-cases`,
    { recursive: true }
  )
  const allTests = await getAllTests(`${root}/.tmp/babel-jsx-cases`)
  for (const test of allTests) {
    await copyFile(test.filePath, test.destinationPath)
  }
}

main()
