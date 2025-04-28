
const { app, BrowserWindow, nativeTheme, Menu, Shell , dialog} = require('electron/main')
const path = require('node:path')

let file = {}
const fs = require('fs')
const { ipcMain } = require('electron')

// janela principal
let win
function createWindow() {
    nativeTheme.themeSource = 'dark'
    win = new BrowserWindow({
        width: 1010,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    //menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    win.loadFile('./src/views/index.html')
}

//janela sobre
function aboutWindow() {
    nativeTheme.themeSource = 'dark'
    const main = BrowserWindow.getFocusedWindow()
    let about
    if (main){
       about = new BrowserWindow({
            width: 450,
            height: 200,
            autoHideMenuBar: true,
            resizable: false,
            minimizable: false,
            parent:main,
            modal:true
        })
    
    }
   
    about.loadFile('./src/views/sobre.html')
}


app.whenReady().then(() => {
    createWindow()


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.commandLine.appendSwitch('log-level', '3')

//Menu
const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Novo',
                accelerator: 'CmdOrCtrl+N',
                click: () => novoArquivo()
            },
            {
                label: 'Abrir',
                accelerator: 'CmdOrCtrl+O',
                click: () => abrirArquivo() 
            },
            {
                label: 'Salvar',
                accelerator: 'CmdOrCtrl+S',
                click: () => salvarArquivo(false)
            },
            {
                label: 'Salvar como',
                accelerator: 'CmdOrCtrl+Shift+S',
                click: () => salvarArquivo(true)
            },
            {
                type: 'separator'
            },
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Editar',
        submenu: [
            {
                label: 'Desfazer',
                role: 'undo'
            },
            {
                label: 'Refazer',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: 'Recortar',
                role: 'cut'
            },
            {
                label: 'Copiar',
                role: 'copy'
            },
            {
                label: 'Colar',
                role: 'paste'
            }
        ]
    },
    {
        label: 'Zoom',
        submenu: [
            {
                label: 'Aplicar zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            }
        ]

    },
    ,
    {
        label: 'Cor',
        submenu: [
            {
                label: 'Amarelo',
                click: () => win.webContents.send('set-color',"var(--amarelo)")
            },
            {
                label: 'Azul',
                click: () => win.webContents.send('set-color',"var(--azul)")
            },
            {
                label: 'Laranja',
                click: () => win.webContents.send('set-color',"var(--laranja)")
            },
            {
                label: 'Pink',
                click: () => win.webContents.send('set-color',"var(--pink)")
            },
            {
                label: 'Roxo',
                click: () => win.webContents.send('set-color',"var(--roxo)")

            },
            {
                label: 'Verde',
                click: () => win.webContents.send('set-color',"var(--verde)")
            },
            {
                type: 'separator'
            },
            {
                label: 'Restaurar a cor padrão',
                click: () => win.webContents.send('set-color',"var(--cinzaClaro)")
            }
        ]
    },
    {
        label:'Ferramentas',
        submenu: [
            {
                label: 'DevTools',
                role: 'toggleDevTools'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Repositório',
                click: () => shell.openExternal('https://github.com/ryananimo64')
            },
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]

//novo arquivo
function novoArquivo() {
    file = {
        name: "Sem Titulo",
        content: "",
        saved: false,
        path: app.getPath('documents') + 'Sem Titulo'
    }
    win.webContents.send('set-file', file)
}

//abrir arquivo
async function abrirArquivo() {
    try {
      const dialogFile = await dialog.showOpenDialog({
        defaultPath: '',
        properties: ['openFile']
      })
      if (dialogFile.canceled) {
        return false
      } else {
        const filePath = dialogFile.filePaths[0]
        const fileContent = fs.readFileSync(filePath,'utf-8') 
         file ={
            name: path.basename(filePath),
            content: fileContent,
            saved:true,
            path: filePath
        }      
        win.webContents.send('set-file',file)
      }
    } catch (error) {
       console.log(error)
    }
}

// Salvar como |salvar 
ipcMain.on('update-content', (event, content) => {
    file.content = content
})

async function salvarArquivo(salvarComo) {
    try {
        let filePath = file.path
        
    } catch (error) {
        console.log(error)
    }
}