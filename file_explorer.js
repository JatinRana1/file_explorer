const fs = require('fs')
const path = require('path')
const readline = require('readline')
const process = require('process')


const { stdin: input, stdout: output } = require('process')

const rl = readline.createInterface({
    input, 
    output,
    prompt: `\n~> ${process.cwd()} > `
})

rl.prompt()

function listDirectory(cwd) {
    const files = fs.readdirSync(cwd, {
        withFileTypes: true
    })
    files.forEach((file)=>{
        console.log(file.name)
    })
    rl.prompt()
}

function cdOperations(operation) {
    let newDir = ''
    switch(operation) {
        case '..' :
            let dirArr = process.cwd().split('\\')
            let length = dirArr.length

            if(length === 2) {
                newDir = dirArr[0] + '\\'
            }else {
                newDir = dirArr.filter((val, index) => index < length - 1).join('\\')
            }

            try {
                process.chdir(newDir)
                rl.setPrompt(`\n~> ${process.cwd()} > `)
            } catch (error) {
                console.log(error)
            }
        break

        default :
            newDir = process.cwd() + '\\' + operation
            console.log(newDir)
            try {
                process.chdir(newDir)
                rl.setPrompt(`\n~> ${process.cwd()} > `)
            } catch (error) {
                console.error(error.message)
            }
    }

}

function readFile(fileName) {
    let filePath = process.cwd() + '\\' + fileName
    let content =  fs.readFileSync(filePath, 'utf-8')
    console.log(content)
}

rl.on('line', (input) => {
    let inputArr = input.trim().split(' ')
    if(inputArr.length > 2) {
        console.error('too many arguments')
    }
    switch(inputArr[0]) {
        case 'ls' :
            listDirectory(process.cwd())
        break

        case 'cd' :
            cdOperations(inputArr[1])
        break

        case 'cat' :
            readFile(inputArr[1])
        break


    }

    rl.prompt()
})

rl.on('history', (history) => {
    console.log(`\nlast command: ${history[0]}`)
})

rl.on('close', ()=>{
    console.clear()
    console.log('Exiting file explorer')
})

