import React, { useState } from "react"
import { Link } from "react-router-dom"
import './style.css'

function LoginPanel() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const sendLoginData = () => {
    mp.trigger("accounts:sendLoginData", username, password)
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Nazwa użytkownika'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Hasło'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p style={{color:'black'}}>
        Nie posiadasz konta? <Link to="/registerpanel">Zarejestruj się!</Link>
      </p>
      <input
        type='button'
        onClick={sendLoginData}
        value='Zaloguj się'
      />
    </form>
  )
}

export default LoginPanel
