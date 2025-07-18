const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('node:path');

const createWindow = () => {
    const win = new BrowserWindow({
        icon:"favicon.png",
        width:600,
        height:280,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        }
    })

    win.setMenuBarVisibility(false);
    win.setResizable(false);
    win.loadFile('index.html');

    ipcMain.handle('dialog:openFile', async () => {
        const {canceled, filePaths} = await dialog.showOpenDialog(win, {
            filters:[{name:"AudioFiles", extensions:['mp3']}],
            properties:['openFile']
        });
        if (canceled) {
            return null;
        } else {
            return filePaths[0];
        }
    })
}

app.whenReady().then(() => {
    createWindow();
})