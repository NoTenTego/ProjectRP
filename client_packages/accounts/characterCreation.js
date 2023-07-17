let player = mp.players.local
let characterCreationCamera

mp.events.add("accounts:characterCreation", () => {
  characterCreationCamera = mp.cameras.new("characterCreationCamera", new mp.Vector3(402.8664, -997.9515 - 0.5, -98.5), new mp.Vector3(0, 0, 0), 60)
  characterCreationCamera.pointAtCoord(402.8664, -996.4108 - 0.5, -98.9)
  characterCreationCamera.setActive(true)
  mp.game.cam.renderScriptCams(true, false, 0, true, false)
  player.freezePosition(true)

  let browser = mp.browsers.new("package://cef/index.html#/characterCreation")
})

mp.events.add("accounts:CEFCharacterCreationEvent", (data) => {
  mp.events.callRemote("accounts:handleCreateCharacter", data)
})

mp.events.add("accounts:handleResetCharacter", (gender) => {
  mp.events.callRemote("accounts:handleChangeGender", gender)
})

mp.events.add("accounts:handleChangeCameraView", (data) => {
  let cameraaa = JSON.parse(data)

  characterCreationCamera.setCoord(402.8664, -997.9515 + cameraaa.zoom, -98.5 + cameraaa.vertical)
  characterCreationCamera.pointAtCoord(402.8664, -996.4108 + cameraaa.zoom, -98.9 + cameraaa.vertical)

  mp.game.cam.renderScriptCams(true, false, 0, true, false)
})

mp.events.add("accounts:characterEditRestore", (data) => {
  let dataArray = JSON.parse(data)

  switch (dataArray.type) {
    case "headOverlay":
      player.setHeadOverlay(dataArray.index, 255, 0.5, 1, 0)
      break

    default:
      break
  }
})

mp.events.add("accounts:characterCreationEdit", (data) => {
  let dataArray = JSON.parse(data)

  switch (dataArray.type) {
    case "eyeColor":
      player.setEyeColor(dataArray.value)
      break
    case "faceFeature":
      player.setFaceFeature(dataArray.index, dataArray.value)
      break
    case "headOverlay":
      player.setHeadOverlay(dataArray.index, dataArray.value, 0.5, 1, 0)
      break
    case "hairColor":
      player.setHairColor(dataArray.colorId, dataArray.highlightColorId)
      break
    case "hair":
    case "tors":
    case "legs":
    case "shoes":
    case "undershirts":
    case "tops":
      player.setComponentVariation(dataArray.componentId, dataArray.drawableId, dataArray.textureId, dataArray.paletteId)
      break
    case "headBlendData":
      player.setHeadBlendData(dataArray.momFace, dataArray.dadFace, 0, dataArray.momFace, dataArray.dadFace, 0, dataArray.facesMix, dataArray.skinMix, 0, true)
      break

    default:
      break
  }
})
