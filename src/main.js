const electron = require('electron')
const {app,Menu,Tray, BrowserWindow} = electron
const path = require('path')

app.on('ready', _ => {
    //we're using path.join to be platform agnostic
    // const tray = new Tray(path.join('src', 'trayIcon.png'))
    const name = electron.app.getName()
    mainWindow = new BrowserWindow({
        height: 900,
        width: 900,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadURL(`file://${__dirname}/status.html`)

    //housekeeping of main window
    mainWindow.on('closed', _ => {
        mainWindow = null
    })
    const template = [
        {
            label: electron.app.getName(),
            submenu: [{
                label: `About ${name}`,
                click: _ => {
                    console.log('clicked')
                },
                role: 'about'
            },{
                label: 'debug',
                click: _ => {
                    mainWindow.webContents.openDevTools();
                }
            },{
                label: 'Quit',
                click: _ => app.quit()
            }]
            
        }
    ]
    // contextMenu = Menu.buildFromTemplate([
    //     {
    //         label: 'Sample',
    //         click: _ => console.log('cool!')
    //     }
    // ])
    // tray.setContextMenu(contextMenu)
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})