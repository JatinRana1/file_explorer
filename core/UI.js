const readline = require('readline')
const fs = require('fs')
class UI {

    constructor() {
        let input = process.stdin
        let output = process.stdout

        const completer = (line) => {
            const currentDir = process.cwd();

            const [command, ...rest] = line.trim().split(" ")

            const partial = rest.join(" ")
            
            const fileList = fs.readdirSync(currentDir)
            
            const results = fileList.filter(file => file.startsWith(partial))

            results.forEach((result, index, array)=> {
                array[index] = command + ' ' + result
            })

            return [results.length ? results : fileList, line]
        };

        this.rl = readline.createInterface({
            input,
            output,
            prompt: `\n~> ${process.cwd()} > `,
            completer: completer
        })

        this.rl.prompt()

        this.rl.on('close', () => {
            console.log('\n👋 Exiting File Explorer. Goodbye!')
        })
    }

    showPrompt() {
        this.rl.prompt()
    }

    updatePrompt() {
        this.rl.setPrompt(`\n~> ${process.cwd()} > `)
    }

    onCommand(callback) {
        this.rl.on('line', callback)
    }

}

module.exports = UI