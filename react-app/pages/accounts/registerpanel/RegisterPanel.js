import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./style.css"

function RegisterPanel() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repassword, setRepassword] = useState("")
  const [errors, setErrors] = useState([])

  mp.events.add('accounts:setErrors', errors => {
    const errorsArray = JSON.parse(errors)
    setErrors(errorsArray)
  })

  const sendRegistrationData = () => {
    mp.trigger("accounts:sendRegistrationData", username, email, password, repassword)
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Nazwa użytkownika'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p className='error'>{errors[0]}</p>
      <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className='error'>{errors[1]}</p>
      <input
        type='password'
        placeholder='Hasło'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className='error'>{errors[2]}</p>
      <input
        type='password'
        placeholder='Powtórz hasło'
        value={repassword}
        onChange={(e) => setRepassword(e.target.value)}
      />
      <p className='error'>{errors[3]}</p>
      <p style={{color:'black', textAlign:'center'}}>
        Posiadam konto! <Link to='/loginpanel'>Zaloguj się</Link>
      </p>
      
      <input
        type='button'
        onClick={sendRegistrationData}
        value='Utwórz konto'
      />
    </form>
  )
}

export default RegisterPanel
