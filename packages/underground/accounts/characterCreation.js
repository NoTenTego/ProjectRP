const { queryDatabase } = require("../mysql")

mp.events.add("accounts:handleChangeGender", (player, gender) => {
  if (gender === 0) {
    player.model = mp.joaat("mp_m_freemode_01")
  } else {
    player.model = mp.joaat("mp_f_freemode_01")
  }
}) //mozxna przeniesc do clienta.

mp.events.add("accounts:handleCreateCharacter", (player, data) => {
  attemptCreateCharacter(player, data)
})

async function attemptCreateCharacter(player, data) {
  let dataArray = JSON.parse(data)
  let { name, characterClass, description, ...rest } = dataArray
  let restJSON = JSON.stringify(rest);

  if (description.length > 500) {
    player.call("accounts:sendError", ["Maksymalna ilość znaków w opisie to 500."])
    return
  }

  try {
    const sqlCheck = "SELECT name FROM characters WHERE name=?"
    const params = [name]
    const results = await new Promise((resolve, reject) => {
      queryDatabase(sqlCheck, params, (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
          return
        }
        resolve(results)
      })
    })

    if (results.length !== 0) {
        player.call("accounts:sendError", ["Już istnieje postać o danych " + name])
        return
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const accountId = player.getVariable("account:id")
    const query = "INSERT INTO characters SET account=?, name=?, appearance=?, character_class=?, description=?"
    const params = [accountId, name, restJSON, characterClass, description]
    const results = await new Promise((resolve, reject) => {
      queryDatabase(query, params, (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
          return
        }
        resolve(results)
      })
    })

    if (results.length === 0) {
      player.call("accounts:sendError", ["Coś poszło nie tak - [error code: 001]"])
      return
    }

    player.call("accounts:sendError", ["Postać stworzona pomyślnie."])
  } catch (error) {
    console.log(error);
  }
}