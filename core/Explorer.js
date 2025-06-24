const FileManager = require('./FileManager')
const UI = require('./UI')

class Explorer {

    constructor() {
        this.fileManager = new FileManager
        this.ui = new UI
    }

    run() {
        this.ui.onCommand((input) => {
            let inputArr = input.trim().split(' ')

            if (inputArr.length > 2) {
                console.error('too many arguments')
            }

            try {
                switch (inputArr[0]) {
                    case 'ls':
                        this.fileManager.list(process.cwd())
                        break

                    case 'cd':
                        this.fileManager.changeDir(inputArr[1])
                        this.ui.updatePrompt()
                        break

                    case 'cat':
                        this.fileManager.readFile(inputArr[1])
                        break

                    case 'touch': 
                        this.fileManager.createFile(inputArr[1])
                        break
                }

                this.ui.showPrompt()
            } catch (error) {
                console.error(error.message)
                this.ui.showPrompt()
            }
        })
    }

}

module.exports = Explorer