require("accounts/characterCreation.js")
require("accounts/characterSelection.js")

let player = mp.players.local
let browser, loginCam

mp.events.add("playerReady", () => {
  browser = mp.browsers.new("package://cef/index.html#/loginpanel")
  player.freezePosition(true)
  mp.game.ui.setMinimapVisible(true)
  mp.gui.chat.activate(false)
  mp.gui.chat.show(false)
  setTimeout(() => {
    mp.gui.cursor.show(true, true)
  }, 500)
  mp.game.ui.displayRadar(false)
  enableLoginCamera()
})

function enableLoginCamera() {
  loginCam = mp.cameras.new("default", new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40)
  player.position = new mp.Vector3(-1757.12, -739.53, 10)
  player.freezePosition(true)

  loginCam.setActive(true)
  loginCam.setCoord(-1757.12, -739.53, 25)
  loginCam.pointAtCoord(-1764, -715, 35)
  mp.game.cam.renderScriptCams(true, false, 0, true, false)
}

mp.events.add("accounts:disableBrowser", () => {
  if (browser) {
    browser.destroy()
  }
})

function disableLoginCamera() {
  loginCam.destroy()
  mp.game.cam.renderScriptCams(false, false, 0, false, false)
  player.freezePosition(false)
}

mp.events.add("accounts:sendRegistrationData", (username, email, password, repassword) => {
  mp.events.callRemote("accounts:validateRegistration", username, email, password, repassword)
})

mp.events.add("accounts:sendLoginData", (username, password) => {
  mp.events.callRemote("accounts:validateLogin", username, password)
})

mp.events.add("accounts:setError", (errors) => {
  let errorsArray = JSON.stringify(errors)
  browser.call("accounts:setErrors", errorsArray)
})

mp.events.add("accounts:sendError", (error) => {
  mp.game.graphics.notify(error)
})

mp.events.add("accounts:loginHandler", () => {
  if (browser) {
    browser.destroy()
  }
  player.freezePosition(false)
  mp.game.ui.setMinimapVisible(false)
  mp.gui.chat.activate(true)
  mp.gui.chat.show(true)
  mp.gui.cursor.show(false, false)
  mp.game.ui.displayRadar(true)
  disableLoginCamera()
})