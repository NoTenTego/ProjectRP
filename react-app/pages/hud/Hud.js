import React, { useState } from "react"
import "./style.css"

function Hud() {
  function updateStreetName(street, cross, zone, characterName, money) {
    setStreet(street)
    setCross(cross)
    setZone(zone)
    setCharacterName(characterName)
    setMoney(money)
  }

  const [street, setStreet] = useState("Alta Street")
  const [cross, setCross] = useState("/ Vinewood Blvd")
  const [zone, setZone] = useState("Downtown Vinewood")
  const [characterName, setCharacterName] = useState("Andrew Arnualdo")
  const [money, setMoney] = useState("5000")

  return (
    <div id='hud'>
      <div
        className='compass'
        id='container'>
        <div className='vicinity'>
          <div>
            <span className='street shadow-stroke'>{street}</span>
            <span className='cross shadow-stroke'>{cross}</span>
          </div>
          <span className='zone shadow-stroke'>{zone}</span>
        </div>
      </div>
      <div className='hud'>
        <span className='characterName'>{characterName}</span>
        <span className='money'>${money}</span>
      </div>
    </div>
  )
}

export default Hud
