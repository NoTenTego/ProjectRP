import { CssBaseline, ThemeProvider } from "@mui/material"
import { darkTheme } from "./data/Theme"
import { HashRouter, Routes, Route } from "react-router-dom"
import LoginPanel from "./pages/accounts/loginpanel/LoginPanel"
import RegisterPanel from "./pages/accounts/registerpanel/RegisterPanel"
import Hud from "./pages/hud/Hud"
import CharacterCreation from "./pages/accounts/characterCreation/CharacterCreation"
import { useState } from "react"

function App() {
  const [theme, setTheme] = useState(darkTheme)

  const getScrollbarStyles = (theme) => `
    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: ${theme.palette.divider};
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.palette.primary.main};
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.palette.primary.light};
    }
  `

  const style = document.createElement("style")
  style.innerHTML = getScrollbarStyles(theme)
  document.getElementsByTagName("head")[0].appendChild(style)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='App'>
        <HashRouter>
          <Routes>
            <Route
              path='/hud'
              element=<Hud />
            />

            <Route
              path='/loginpanel'
              element=<LoginPanel theme={theme} />
            />

            <Route
              path='/registerpanel'
              element=<RegisterPanel theme={theme} />
            />

            <Route
              path='/charactercreation'
              element=<CharacterCreation theme={theme} />
            />
          </Routes>
        </HashRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
