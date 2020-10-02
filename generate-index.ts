import * as utils from './utils.ts'

// NOTES: FOR BUILDING AND LINKING INDEXES BASED ON FILE STRUCTURE

const encoder = new TextEncoder()
// filters import path to get the name of the Bottle. Based on where the script
//  is being called from. Will need work
const bottleName = utils.getBottleName(import.meta.url)

const processDir = function(currentDir: string = './source', childDir: any = null) {    
    // If this is the top level thread
    const dirName = childDir ?? bottleName
    // Start the index buffer
    let buffer = `# ${utils.toTitleCase(dirName)}\n\n`
    // Get the directory's contents and sort notes from sub-directories
    const entries = utils.getDirEntries(currentDir)

    // Process all the sub-directories recurisvely
    for (const dir of entries.dirs) {
        // Recurse
        const indexName = processDir(`${currentDir}/${dir}`, dir)
        // Add it to this index to continue the chain
        buffer += `- [[${indexName}]]\n`
    }

    // Index the notes in this directory and encode for fs.write
    const encodedBuffer = encoder.encode(utils.indexNotes(entries.notes, buffer))
    // For passing back up to parent thread
    const indexName = `_index--${dirName}`
    // For writing to fs
    const indexPath = `./${currentDir}/${indexName}.md`
    Deno.writeFileSync(indexPath, encodedBuffer)
    
    return indexName
}

processDir()