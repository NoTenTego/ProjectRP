const bcrypt = require("bcryptjs")
const saltRounds = 10
const { queryDatabase } = require('../mysql');

function validEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

mp.events.add("accounts:validateRegistration", (player, username, email, password, repassword) => {
  let errors = []

  if (username.trim() === "" || email.trim() === "" || password === "" || repassword === "") {
    errors[4] = "Wypełnij wszystkie rubryki."
  }

  if (username.length < 6 || username.length > 30) {
    errors[0] = "Nazwa użytkownika jest zbyt długa lub krótka"
  }

  if (!validEmail(email)) {
    errors[1] = "Podaj poprawny adres email"
  }

  if (password.length < 6) {
    errors[2] = "Hasło musi zawierać co najmniej 6 znaków"
  }

  if (password !== repassword) {
    errors[3] = "Hasło i potwierdzenie hasła nie są zgodne"
  }

  if (errors.length > 0){
    player.call('accounts:setError', [errors])
    return
  }

  registerAccount(player, username, email, password, repassword)
})

async function registerAccount(player, username, email, password, repassword) {
  try {
    const sqlCheck = 'SELECT * FROM accounts WHERE username=? OR email=? or social_club=?';
    const paramsCheck = [username, email, player.socialClub];

    const results = await new Promise((resolve, reject) => {
      queryDatabase(sqlCheck, paramsCheck, (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve(results);
      });
    });

    if (results.length !== 0) {
      player.call("accounts:sendError", ["Posiadasz już konto u nas."])
      return false;
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const sqlInsert = 'INSERT INTO accounts SET username=?, email=?, password=?, social_club=?, social_club_id=?';
    const paramsInsert = [username, email, hash, player.socialClub, player.rgscId];

    const result = await new Promise((resolve, reject) => {
      queryDatabase(sqlInsert, paramsInsert, (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve(results);
      });
    });

    if (result) {
      player.call("accounts:sendError", ["Pomyślnie stworzono konto, możesz się zalogować."])
    }

    return result.affectedRows === 1;
  } catch (error) {
    console.log(error);
    errorHandler(error);
  }
}