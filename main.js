const { app, BrowserWindow, globalShortcut, CommandLine } = require('electron');

const config = require('./config');

let win;

//Window will be frameless without "--frame"
function hasFrame()
{
	if (app.commandLine.hasSwitch('frame')) return true;
	return false;
}

function createWindow () 
{
	// Creating window.
	win = new BrowserWindow({
		width: 569,
		height: 674,
		x: 791,
		y: 31,
		frame: hasFrame(),
		alwaysOnTop: true,
		webPreferences: {
			nodeIntegration: true
		}
	})

	// Load page
	win.loadURL(config.url);
}

function toggleDevTools()
{
	win.webContents.toggleDevTools();
}

function toggleMaximize()
{
	win.isMaximized() ? win.unmaximize() : win.maximize();
}

function toggleMinimize()
{
	win.isMinimized() ? win.restore() : win.minimize();
}

function refreshPage()
{
	win.reload();
}

function closeApp()
{
	win.destroy();
}

function createShortcut()
{
	globalShortcut.register('Ctrl+1', toggleDevTools);
	globalShortcut.register('Ctrl+2', toggleMaximize);
	globalShortcut.register('Ctrl+3', toggleMinimize);
	globalShortcut.register('Ctrl+4', refreshPage);
	globalShortcut.register('Ctrl+5', closeApp);
}

app.whenReady().then(createWindow).then(createShortcut);