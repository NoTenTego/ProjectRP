mp.events.addCommand("aheal", (player, fullText, value) => {
  value = Number(value)
  if (!value) {
    value = 100
  }
  player.health = value
})

mp.events.addCommand("makeveh", (player, fullText, model) => {
    const playerPosition = player.position
    mp.vehicles.new(model, playerPosition)
})

mp.events.addCommand("fixveh", (player) => {
    const vehicle = player.vehicle
    if (!vehicle) {
        return
    }

    vehicle.repair()
})

mp.events.addCommand("getpos", (player) => {
  const playerPos = player.position
  console.log(playerPos)
})