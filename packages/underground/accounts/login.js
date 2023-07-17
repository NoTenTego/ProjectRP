const { queryDatabase } = require("../mysql")
const bcrypt = require("bcryptjs")

mp.events.add("accounts:validateLogin", (player, username, password) => {
  let loggedAccount = mp.players.toArray().find((p) => p.getVariable("username") === username)
  if (loggedAccount) return player.call("accounts:sendError", ["Twoje konto jest już zalogowane."])

  attemptLogin(player, username, password)
})

async function attemptLogin(player, username, password) {
  try {
    const sqlCheck = "SELECT username, password from accounts WHERE username=?"
    const params = [username]
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

    if (results.length === 0) {
      player.call("accounts:sendError", ["Nieprawidłowe dane logowania"])
      return
    }

    const response = await bcrypt.compare(password, results[0].password)
    if (!response) {
      player.call("accounts:sendError", ["Nieprawidłowe dane logowania"])
      return
    }

    loadAccount(player, username)
  } catch (error) {
    console.log(error)
  }
}

async function loadAccount(player, username) {
  try {
    const sqlCheck = "SELECT * from accounts WHERE username=?"
    const params = [username]
    const accountData = await new Promise((resolve, reject) => {
      queryDatabase(sqlCheck, params, (err, accountData) => {
        if (err) {
          console.log(err)
          reject(err)
          return
        }

        resolve(accountData)
      })
    })

    //save data to player
    if (accountData) {
      player.name = username
      player.setVariable("username", username)
      player.setVariable("account:id", accountData[0].id)
      player.setVariable("email", accountData[0].email)
      player.setVariable("admin", accountData[0].admin)

      const sqlCheck = "SELECT COUNT(*) AS characterCount FROM characters where account=?"
      const params = [accountData[0].id]
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

      /*if (results[0].characterCount > 0) {
        player.dimension = player.id
        player.call("accounts:disableBrowser")
        mp.events.call('accounts:characterSelection', player)
      } else {
        player.call("accounts:disableBrowser")
        player.call("accounts:characterCreation")

        const creatorPlayerPos = new mp.Vector3(402.8664, -996.4108, -99.00027);
        const creatorPlayerHeading = -185.0;
        player.position = creatorPlayerPos;
        player.heading = creatorPlayerHeading;
        player.dimension = player.id
        return
      }*/

      player.call("accounts:loginHandler")
    }
  } catch (error) {
    console.log(err)
  }
}

