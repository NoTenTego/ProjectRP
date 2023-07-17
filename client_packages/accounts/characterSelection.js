let player = mp.players.local
let characterSelectionCamera

//  characterSelectionCamera = mp.cameras.new("characterSelectionCamera", new mp.Vector3(characters[0].x, characters[0].y + 3.2, characters[0].z + 0.5), new mp.Vector3(0, 0, 0), 40)
//  characterSelectionCamera.pointAtCoord(characters[0].x, characters[0].y, characters[0].z)

mp.events.add("accounts:characterSelectionClient", (characters) => {
  player.position = new mp.Vector3(characters[0].x, characters[0].y, characters[0].z)
  setAppearence(characters[0])

  characterSelectionCamera = mp.cameras.new("characterSelectionCamera", new mp.Vector3(characters[0].x, characters[0].y + 3.2, characters[0].z + 0.5), new mp.Vector3(0, 0, 0), 40)
  characterSelectionCamera.pointAtCoord(characters[0].x, characters[0].y, characters[0].z)
  characterSelectionCamera.setActive(true)
  mp.game.cam.renderScriptCams(true, false, 0, true, false)
  player.freezePosition(true)
})

function setAppearence(character) {
  mp.console.logInfo(character)
  const appearence = JSON.parse(character.appearence)

  player.setEyeColor(appearence.eyeColor)
  player.setHairColor(appearence.hairColor, 0)
  player.setHeadBlendData(appearence.momFace, appearence.dadFace, 0, appearence.momFace, appearence.dadFace, 0, appearence.facesMix, appearence.skinMix, 0, true)

  for (const key in appearence.featureValues) {
    const element = appearence.featureValues[key]
    player.setFaceFeature(key, element)
  }

  for (const key in appearence.headValues) {
    const element = appearence.featureValues[key]
    player.setHeadOverlay(key, element, 0.5, 1, 0)
  }

  player.setComponentVariation(4, appearence.legs, 0, 2)
  player.setComponentVariation(3, appearence.tors, 0, 2)
  player.setComponentVariation(11, appearence.tops, 0, 2)
  player.setComponentVariation(8, appearence.undershirts, 0, 2)
  player.setComponentVariation(4, appearence.legs, 0, 2)
  player.setComponentVariation(6, appearence.shoes, 0, 2)
}
