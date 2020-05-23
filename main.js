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

function closeApp()
{
	win.destroy();
}

function createShortcut()
{
	globalShortcut.register('Shift+1', toggleDevTools);
	globalShortcut.register('Shift+2', toggleMaximize);
	globalShortcut.register('Shift+3', toggleMinimize);
	globalShortcut.register('Shift+4', closeApp);
}

app.whenReady().then(createWindow).then(createShortcut);