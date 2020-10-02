import * as path from "https://deno.land/std@0.71.0/path/mod.ts"

export const isVisible = function(name: string): boolean {
    return !/^\./i.test(name)
}

export const isNote = function(name: string): boolean {
    return /\.md$/i.test(name)
}

export const isConfig = function(name: string): boolean {
    return /(\.yaml|\.yml|\.toml)$/i.test(name)
}

export const isIndex = function(name: string): boolean {
    return /^_index--.+\.md$/i.test(name)
}

export const isIndexable = function(name: string): boolean {
    if (isVisible(name) && 
        !isConfig(name) && 
        !isIndex(name)) {
        return true
    } else {
        return false
    }
}

export const toTitleCase = function(str: string): string {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export const getBottleName = function(url: string): string {
    const parsedUrl = new URL('.', url).pathname
    return path.parse(parsedUrl).name
}

export const indexNotes = function(arr: string[], buffer: string): string {
    return arr.reduce((buffer, filename) => buffer += `- [[${filename}]]\n`, buffer)
}

export const getDirEntries = function(dir: string): any {
    const dirEntries: any = Deno.readDirSync(dir)
    const entries: any = {
        notes: [],
        dirs: []
    };

    for (const entry of dirEntries) {
        if (isIndexable(entry.name)) {
            if (entry.isDirectory) {
                entries.dirs.push(entry.name)
            } else if (isNote(entry.name)){
                entries.notes.push(entry.name.replace('.md', ''))
            }
        }
    }

    return entries
}