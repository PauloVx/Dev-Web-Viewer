const { app, BrowserWindow, globalShortcut, CommandLine } = require('electron');

const config = require('./config');

let win;

//Window will be frameless without "--frame"
function hasFrame()
{
	if (app.commandLine.hasSwitch('frame') || config.frame) return true;
	return false;
}

function createWindow () 
{
	// Creating window.
	win = new BrowserWindow({
		width: config.width,
		height: config.height,
		x: config.posX,
		y: config.posY,
		frame: hasFrame(),
		alwaysOnTop: true,
		webPreferences: {
			nodeIntegration: true
		}
	})

	// Load default page when fail.
	win.webContents.on("did-fail-load", () => {
		win.loadFile("view/default.html");
		setTimeout(connect, 3000);
	});

	// Load page
	connect();
}

function connect() {
	console.log("Trying to connect");
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

function reloadPage()
{
	win.loadURL(config.url);
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
	globalShortcut.register('Ctrl+5', reloadPage);
	globalShortcut.register('Ctrl+6', closeApp);
}

app.whenReady().then(createWindow).then(createShortcut);