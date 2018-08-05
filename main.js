const {app, BrowserWindow, Menu, MenuItem} = require('electron');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow();

  const menu = new Menu();
  menu.append(new MenuItem({
    label: 'Open devtools',
    accelerator: 'CmdOrCtrl+Shift+I',
    click: () => { mainWindow.webContents.openDevTools(); }
  }));
  mainWindow.setMenu(menu);
  // mainWindow.setMenuBarVisibility(false);

  mainWindow.on('uncaughtException', function (error) {
    console.error(error);
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // mainWindow.webContents.openDevTools();
  mainWindow.loadFile('index.html');
}

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
});

if (isSecondInstance) {
  app.quit();
  return;
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('ready', createWindow);
