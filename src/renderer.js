const electron = require('electron')
const exec = require('child_process').exec
const ipc = electron.ipcRenderer
const os = require('os')
const fs = require('fs')

//check to see that it is a dir
function isDir(dir){
    try{
        return fs.lstatSync(dir).isDirectory()
    }catch(e){
        return false
    }
    
}

function saveFile(dir){
    fs.writeFile(path.join(dir), 'data.txt')
}

function checkGitStatus(dir){
    exec('git status', {
        cwd: dir
    }, (err, stdout, stderr) => {
        console.log(`err: ${err}`)

        if(err){
            return setStatus('unknown')
        }
        if(/nothing to commit/.test(stdout)) return setStatus('clean')
        return setStatus('dirty')
    })
}

function formatDir(dir){
    return /^~/.test(dir)
        ? os.homedir() + dir.substr(1).trim()
        : dir.trim()
}

function removeStatus(){
    const el = document.getElementById('status')
    el.classList.remove('unknown', 'clean', 'dirty')
    return el
}

function setStatus(status){
    const el = removeStatus()
    el.classList.add(status)
}

let timer
document.getElementById('input').addEventListener('keyup', event => {
    //set timeout of half second so that we're not processing on every keystroke
    clearTimeout(timer)
    timer = setTimeout(_ => {
        const dir = event.target.value
        if(isDir(dir)){
            checkGitStatus(dir)
        }
    }, 500)
})