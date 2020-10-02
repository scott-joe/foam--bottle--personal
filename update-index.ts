import * as path from "https://deno.land/std@0.71.0/path/mod.ts"
import { existsSync } from "https://deno.land/std/fs/mod.ts"

const encoder = new TextEncoder()
const bottleName = 'personal'

const toTitleCase = function(str: string) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const isVisible = function(name: string): boolean {
    return !/^\./i.test(name)
}

const isNote = function(name: string): boolean {
    return /\.md$/i.test(name)
}

const isConfig = function(name: string): boolean {
    return /(\.yaml|\.yml|\.toml)$/i.test(name)
}

const isIndex = function(name: string): boolean {
    return /^_index--.+\.md$/i.test(name)
}

const isIndexable = function(name: string): boolean {
    if (
        isVisible(name) && 
        !isConfig(name) && 
        !isIndex(name)
    ) {
        return true
    } else {
        return false
    }
}

const getBottleName = function(url: string): string {
    const parsedUrl = new URL('.', url).pathname
    return path.parse(parsedUrl).name
}

const getDirContents = function(dir: string, ) {
    const entries: any = Deno.readDirSync(dir)
    const filteredList: any = {
        notes: [],
        dirs: []
    };

    for (const entry of entries) {
        if (isIndexable(entry.name)) {
            if (entry.isDirectory) {
                filteredList.dirs.push(entry.name)
            } else if (isNote(entry.name)){
                filteredList.notes.push(entry.name.replace('.md', ''))
            }
        }
    }

    return filteredList
}

const buildIndexContent = function(arr: string[], buffer: string) {
    return arr.reduce((buffer, filename) => buffer += `- [[${filename}]]\n`, buffer)
}

const processDir = function(dir: string = './source', subDir: any = null) {
    getBottleName(import.meta.url)
    const subDir2 = (subDir === null) ? bottleName : subDir
    let buffer = `# ${toTitleCase(subDir2)}\n\n`
    const files = getDirContents(dir)

    for (const subDir of files.dirs) {
        // Go do this same thing for the next directory down and
        //  pass the name of it's index back up here to be added
        //  to this higher up index
        const indexName = processDir(`${dir}/${subDir}`, subDir)
        buffer += `- [[${indexName}]]\n`
    }

    // Add this directory's notes to it's own index
    const indexContent = encoder.encode(buildIndexContent(files.notes, buffer))
    const filename = `_index--${subDir2}`
    const bottleIndexFilename = `${dir}/${filename}`
    const bottleIndexFilenameFull = `./${bottleIndexFilename}.md`
    
    if (existsSync(bottleIndexFilenameFull)) Deno.removeSync(bottleIndexFilenameFull)
    Deno.writeFileSync(bottleIndexFilenameFull, indexContent, {append: true})
    
    return filename
}

processDir()