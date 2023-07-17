let hud = mp.browsers.new("package://cef/index.html#/hud")
let player = mp.players.local

let getStreet
let streetName
let crossingName
let zoneName
let money

setInterval(() => {
  getStreet = mp.game.pathfind.getStreetNameAtCoord(player.position.x, player.position.y, player.position.z, 0, 0)

  streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName)
  crossingName = mp.game.ui.getStreetNameFromHashKey(getStreet.crossingRoad)

  zoneName = mp.game.gxt.get(mp.game.zone.getNameOfZone(player.position.x, player.position.y, player.position.z))

  money = player.money
}, 500)

mp.events.add("render", () => {
  if (!player.getVariable("loggedIn")) {
    hud.active = false
    return
  }
  hud.active = true

  let crossing
  if (crossingName != "") {
    crossing = `/ ${crossingName}`
  } else {
    crossing = ""
  }
  let characterName = player.name
  hud.execute(`updateStreetName('${streetName}', '${crossing}', '${zoneName}', '${characterName}', '${money}')`)
})
