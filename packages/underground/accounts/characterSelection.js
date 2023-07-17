const { queryDatabase } = require("../mysql")

mp.events.add("accounts:characterSelection", (player) => {
  characterSelection(player)
})

async function characterSelection(player) {
  try {
    const accountId = player.getVariable("account:id")
    const query = "SELECT * FROM characters where account=?"
    const params = [accountId]
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

    if (results) {
      player.call("accounts:characterSelectionClient", [results])
    }
  } catch (error) {
    console.log(error)
  }
}
