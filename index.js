const path = require("path");
const electron = require("electron");

const { app, BrowserWindow, Tray, Menu } = electron;

let mainWindow;
let tray;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(`${__dirname}/src/index.html`);

  const iconName =
    process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
  const iconPath = path.resolve(
    path.join(__dirname, `./src/assets/${iconName}`)
  );

  tray = new Tray(iconPath);
  // tray.setToolTip("This is my application.");
  tray.on("click", (event,bounds) => {
    const {x,y}=bounds
    const {height,width}=mainWindow.getBounds() 
    console.log(y-height)
    if(mainWindow.isVisible()){
      mainWindow.hide()
    }else{
      const yposition=process.platform==='darwin'?y:y-height
      mainWindow.setBounds({
        x:x-width/2 ,
        y:yposition,
        height ,
        width 
      })
      mainWindow.show();
    }
  });
});
