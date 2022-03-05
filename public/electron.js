const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 800,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const testNodeModule = require(isDev ? './../server/index.js' : '../server/index.js');
// const { ipcMain } = require('electron');
// testNodeModule.tryUsingFs();

// server
// testNodeModule.startServer();
// console.log("server listening on port 8000...");

// const server = new testNodeModule.Server();

// server.on('portEstablished', function(port){
//   server.startServer(port);
//   console.log("server listening on port ", port, "...");
// });

// server.findPort();

// const { ipcMain } = require('electron');
// ipcMain.on('request-port', (event, arg) => {
//   event.reply('reply-port', 'pong');
// });

testNodeModule.startExpressServer();
console.log("server listening on port 8000...");

//python
// const pythonScript = new testNodeModule.PythonScript();
// pythonScript.on('scriptCompleted', (results) => {
//   console.log(results);
// });
// pythonScript.runPythonScript();


/* ----------------------------------- Custom code starts here ------------------------------------- */
// ipcMain.on('testIpc', (event, args) => {
//   console.log('ipc works!');
//   console.log(event);
//   console.log(args);
// });

