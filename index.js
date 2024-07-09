const path = require('node:path')
const fsAsync = require('node:fs/promises')

const baseFolder = path.join(__dirname, 'baseFolder')

const createFolderSystem = async () => {
    try {
        await fsAsync.mkdir(baseFolder, {recursive: true})
        for (let i = 1; i <= 5; ++i) {
            const childFolder = path.join(baseFolder, `childFolder_${i}`)
            await fsAsync.mkdir(childFolder, {recursive: true})
            for (let n = 1; n <= 5; ++n) {
                const fileName = path.join(childFolder, `text_file_${i}_${n}.txt`)
                await fsAsync.writeFile(fileName, `Beautiful text ${i} ${n}`, {encoding: "utf-8"})
            }
        }
    } catch (e) {
        console.log(e)
    }
}

const readFolderSystem = async (objectPath) => {
    try {
        const stat = await fsAsync.stat(objectPath)
        console.log(objectPath, ` - this is a ${stat.isFile() ? 'file' : 'folder'}`)
        const result = stat.isDirectory() ? await fsAsync.readdir(objectPath) : []
        if (result.length) {
            result.map(e => readFolderSystem(path.join(objectPath, e)))
        }
    } catch (e) {
        console.log(e)
    }
}

void createFolderSystem().then(() => {
    void readFolderSystem(baseFolder)
})
