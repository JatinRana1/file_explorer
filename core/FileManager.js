const fs = require('fs')
const path = require('path')

class FileManager {

    constructor () {
        this.cwd = process.cwd()
    }

    list () {
        const files  = fs.readdirSync(this.cwd, {
            withFileTypes: true
        })

        files.forEach(file=>console.log(file.name))

        return 
    }

    changeDir (target) {
        let newDir;

        switch(target) {
            case '..' :
                newDir = path.dirname(this.cwd)
                break
            default :
                newDir = path.join(this.cwd, target)
        }

        console.log(newDir)

        if(!fs.existsSync(newDir) || !fs.statSync(newDir).isDirectory()) {
            throw new Error("dir does not exist or not a folder")
        }

        process.chdir(newDir)

        this.cwd = newDir

    }

    readFile (fileName) {
        let filePath = path.join(this.cwd, fileName)
        if(!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()){
            throw new Error('file not exist or not a file')
        }

        let content =  fs.readFileSync(filePath, 'utf-8')
        
        console.log(content)
    }
}

module.exports = FileManager