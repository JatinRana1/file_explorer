const readline = require('readline')

class UI {
    
    constructor() {
        let input = process.stdin
        let output = process.stdout

        this.rl = readline.createInterface({
            input, 
            output,
            prompt: `\n~> ${process.cwd()} > `
        })
        
        this.rl.prompt()
    }

    showPrompt () {
        this.rl.prompt()
    }

    updatePrompt () {
        this.rl.setPrompt(`\n~> ${process.cwd()} > `)
    }

    onCommand (callback) {
        this.rl.on('line', callback)
    }

}

module.exports = UI