import React, { useState } from "react"
import { eyeColors, featureNames, headOverlays, g_Heritages } from "./data.js"
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Stack, Slider, Typography, IconButton, ToggleButtonGroup, ToggleButton, Divider } from "@mui/material"
import Box from "@mui/material/Box"
import Tabs, { tabsClasses } from "@mui/material/Tabs"
import TabContext from "@mui/lab/TabContext"
import Tab from "@mui/material/Tab"
import DeleteIcon from "@mui/icons-material/Delete"
import TabPanel from "@mui/lab/TabPanel"
import MaleIcon from "@mui/icons-material/Male"
import FemaleIcon from "@mui/icons-material/Female"
import "./style.css"

function CharacterCreation({ theme }) {
  const [activeTab, setActiveTab] = useState("0")
  const [cameraZoom, setCameraZoom] = useState(-0.5)
  const [cameraVertical, setCameraVertical] = useState(0)

  const [name, setName] = useState("")
  const [gender, setGender] = useState(0)
  const [characterClass, setCharacterClass] = useState(0)
  const [description, setDescription] = useState("")

  const [momFace, setMomFace] = useState(21)
  const [dadFace, setDadFace] = useState(0)
  const [facesMix, setFacesMix] = useState(0.5)
  const [skinMix, setSkinMix] = useState(0.5)

  const [hair, setHair] = useState(0)
  const [hairColor, setHairColor] = useState(0)
  const [legs, setLegs] = useState(0)
  const [tors, setTors] = useState(0)
  const [shoes, setShoes] = useState(0)
  const [undershirts, setUndershirts] = useState(0)
  const [top, setTop] = useState(0)

  const [eyeColor, setEyeColor] = useState(15)
  const [featureValues, setFeatureValues] = useState(Array(featureNames.length).fill(0))
  const [headValues, setHeadValues] = useState(Array(headOverlays.length).fill(0))

  const [error, setError] = useState("")

  const handleSaveHeadBlendData = (momFace, dadFace, facesMix, skinMix) => {
    const data = {
      type: "headBlendData",
      momFace: momFace,
      dadFace: dadFace,
      facesMix: facesMix,
      skinMix: skinMix,
    }
  
    mp.trigger("accounts:characterCreationEdit", JSON.stringify(data))
  }

  const handleGenderChange = (value) => {
    setGender(value)

    //reset cef
    setHair(0)
    setHairColor(0)
    setLegs(0)
    setShoes(0)
    setUndershirts(0)
    setTop(0)
    setMomFace(21)
    setDadFace(0)
    setFacesMix(0.5)
    setSkinMix(0.5)

    setEyeColor(15)
    setFeatureValues(Array(featureNames.length).fill(0))
    setHeadValues(Array(headOverlays.length).fill(0))

    //reset client
    mp.trigger("accounts:handleResetCharacter", value)
  }

  function nameValidation(name) {
    const regex = /^[A-Z][a-zA-Z]+ [A-Z][a-zA-Z]+$/

    if (!regex.test(name)) {
      return false
    }

    return true
  }

  const handleCreateCharacter = () => {
    if (!nameValidation(name)) {
      setError("Twoje dane osobowe są niepoprawne. Prawidłowy przykład: Andrew Tomato")
      return
    }

    const data = {
      name: name,
      gender: gender,
      characterClass: characterClass,
      description: description,
      hair: hair,
      hairColor: hairColor,
      legs: legs,
      tors: tors,
      shoes: shoes,
      undershirts: undershirts,
      top: top,
      eyeColor: eyeColor,
      featureValues: featureValues,
      headValues: headValues,
      momFace: momFace,
      dadFace: dadFace,
      facesMix: facesMix,
      skinMix: skinMix,
    }

    mp.trigger("accounts:CEFCharacterCreationEvent", JSON.stringify(data))
  }

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleChangeFaceFeature = (element, index, value) => {
    const data = {
      type: "faceFeature",
      index: index,
      value: Number(value),
    }
    mp.trigger("accounts:characterCreationEdit", JSON.stringify(data))
  }

  const handleChangeHeadOverlay = (element, index, value) => {
    const data = {
      type: "headOverlay",
      index: index,
      value: Number(value),
    }
    mp.trigger("accounts:characterCreationEdit", JSON.stringify(data))
  }

  const handleChangeCameraView = (cameraZoom, cameraVertical) => {
    const data = {
      zoom:cameraZoom,
      vertical:cameraVertical,
    }
    mp.trigger("accounts:handleChangeCameraView", JSON.stringify(data))
  }

  return (
    <Box
      sx={{
        height: "100vh",
      }}>
      <Box sx={{ position: "absolute", bottom: "4.1%", left: "97.5%", transform: "translate(-97.5%, -4.1%)", background: "rgba(0, 0, 0, 0.5)", borderRadius: "4px", padding: ".5rem", width: "350px" }}>
        <Divider
          sx={{ marginBottom: "15px" }}
          textAlign='center'>
          Ustawienia kamery
        </Divider>
        <Typography
          id='non-linear-slider'
          gutterBottom>
          Przybliżenie
        </Typography>
        <Slider
          value={cameraZoom}
          min={-0.5}
          step={0.01}
          max={1.1}
          onChange={(e) => {
            setCameraZoom(e.target.value)
            handleChangeCameraView(cameraZoom, cameraVertical)
          }}
          valueLabelDisplay='auto'
          aria-labelledby='non-linear-slider'
        />
        <Typography
          id='non-linear-slider'
          gutterBottom>
          Góra/Dół
        </Typography>
        <Slider
          value={cameraVertical}
          min={-1}
          step={0.01}
          max={0.4}
          onChange={(e) => {
            setCameraVertical(e.target.value)
            handleChangeCameraView(cameraZoom, cameraVertical)
          }}
          valueLabelDisplay='auto'
          aria-labelledby='non-linear-slider'
        />
      </Box>
      <Box sx={{ position: "absolute", left: "2.5%", top: "5%", height: "90%", width: "400px" }}>
        <TabContext value={activeTab}>
          <Tabs
            value={activeTab}
            onChange={handleChangeTab}
            variant='scrollable'
            scrollButtons
            aria-label='visible arrows tabs example'
            sx={{
              background: "rgba(0, 0, 0, 0.5)",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}>
            <Tab
              label='Dane personalne'
              value={"0"}
            />
            <Tab
              label='Wygląd'
              value={"1"}
            />
            <Tab
              label='Detale'
              value={"2"}
            />
          </Tabs>

          <TabPanel
            value={"0"}
            sx={{ maxHeight: "95%", overflowY: "auto", background: "rgba(0, 0, 0, 0.5)", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}>
            <Typography textAlign={"center"}>Zmiana płci spowoduje restart wyglądu postaci.</Typography>
            <Stack
              direction={"row"}
              mb={2}>
              <ToggleButtonGroup
                fullWidth
                value={gender}
                exclusive
                required
                onChange={(event, alingment) => {
                  if (alingment !== null) {
                    handleGenderChange(alingment)
                  }
                }}
                aria-label='text alignment'>
                <ToggleButton
                  value={0}
                  fullWidth
                  color='primary'
                  aria-label='left aligned'>
                  <MaleIcon /> Mężczyzna
                </ToggleButton>
                <ToggleButton
                  value={1}
                  fullWidth
                  color='primary'
                  aria-label='right aligned'>
                  <FemaleIcon /> Kobieta
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <Stack spacing={2}>
              <TextField
                label='Imię i nazwisko'
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                }}
                fullWidth
                variant='outlined'
              />
              <FormControl fullWidth>
                <InputLabel>Klasa</InputLabel>
                <Select
                  value={characterClass}
                  label='Klasa'
                  onChange={(event) => {
                    setCharacterClass(event.target.value)
                  }}>
                  <MenuItem value={0}>Cywil</MenuItem>
                  <MenuItem value={1}>Biznesmen</MenuItem>
                  <MenuItem value={2}>Gangster</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id='outlined-multiline-static'
                label='Opis postaci'
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value)
                }}
                multiline
                rows={4}
              />
              <Typography textAlign={"center"}>{error}</Typography>
              <Button
                variant='contained'
                onClick={handleCreateCharacter}
                disabled={!name || !String(gender) || !String(characterClass)}>
                Stwórz postać
              </Button>
            </Stack>
          </TabPanel>
          <TabPanel
            value={"1"}
            sx={{ maxHeight: "95%", overflowY: "auto", background: "rgba(0, 0, 0, 0.5)" }}>
            <Divider
              sx={{ marginBottom: "15px" }}
              textAlign='center'>
              Ustawienia twarzy rodziców
            </Divider>
            <Typography
              id='non-linear-slider'
              gutterBottom>
              Twarz Rodzica 1
            </Typography>
            <Box
              marginBottom={3}
              sx={{ height: "365px", overflowY: "auto", display: "grid", gridTemplateColumns: "105px 105px 105px", gap: "2px" }}>
              {[...g_Heritages].reverse().map((value, index) => (
                <Box
                  className={momFace === value ? "faceBox faceSelected" : "faceBox"}
                  onClick={() => {
                    setMomFace(value)
                    handleSaveHeadBlendData(momFace, dadFace, facesMix, skinMix)
                  }}>
                  <img
                    key={index}
                    src={require(`./assets/images/Face-${value}.jpg`)}
                    alt={`FaceId${value}`}
                    className='face'></img>
                </Box>
              ))}
            </Box>
            <Typography
              id='non-linear-slider'
              gutterBottom>
              Twarz Rodzica 2
            </Typography>
            <Box
              marginBottom={3}
              sx={{ height: "365px", overflowY: "auto", display: "grid", gridTemplateColumns: "105px 105px 105px", gap: "2px" }}>
              {g_Heritages.map((value, index) => (
                <Box
                  className={dadFace === value ? "faceSelected" : "faceBox"}
                  onClick={() => {
                    setDadFace(value)
                    handleSaveHeadBlendData(momFace, dadFace, facesMix, skinMix)
                  }}>
                  <img
                    key={index}
                    src={require(`./assets/images/Face-${value}.jpg`)}
                    alt={`FaceId${value}`}
                    className='face'></img>
                </Box>
              ))}
            </Box>
            <Typography
              sx={{ marginTop: "30px" }}
              id='non-linear-slider'
              gutterBottom>
              Mieszanie twarzy
            </Typography>
            <Slider
              value={facesMix}
              min={0}
              step={0.01}
              max={1}
              onChange={(e) => {
                setFacesMix(e.target.value)
                handleSaveHeadBlendData(momFace, dadFace, facesMix, skinMix)
              }}
              valueLabelDisplay='auto'
              aria-labelledby='non-linear-slider'
            />
            <Typography
              id='non-linear-slider'
              gutterBottom>
              Mieszanie wyglądu
            </Typography>
            <Slider
              value={skinMix}
              min={0}
              step={0.01}
              max={1}
              onChange={(e) => {
                setSkinMix(e.target.value)
                handleSaveHeadBlendData(momFace, dadFace, facesMix, skinMix)
              }}
              valueLabelDisplay='auto'
              aria-labelledby='non-linear-slider'
            />
            <Divider
              sx={{ marginBottom: "15px", marginTop: "25px" }}
              textAlign='center'>
              Ustawienia wyglądu
            </Divider>
            <Typography
              id='non-linear-slider'
              gutterBottom>
              Fryzura
            </Typography>
            <Slider
              value={hair}
              min={0}
              step={1}
              max={20}
              onChange={(e) => {
                setHair(e.target.value)
                const data = {
                  type: "hair",
                  componentId: 2,
                  drawableId: e.target.value,
                  textureId: 0,
                  paletteId: 2,
                }
                mp.trigger("accounts:characterCreationEdit", JSON.stringify(data))
              }}
              valueLabelDisplay='auto'
              aria-labelledby='non-linear-slider'
            />
            <Typography
              id='non-linear-slider'
              gutterBottom>
              Kolor włosów
            </Typography>
            <Slider
              value={hairColor}
              min={0}
              step={1}
              max={64}
              onChange={(e) => {
                setHairColor(e.target.value)
                const data = {
                  type: "hairColor",
                  colorId: e.target.value,
                  highlightColorId: 0,
                }
                mp.trigger("accounts:characterCreationEdit", JSON.stringify(data))
              }}
              valueLabelDisplay='auto'
              aria-labelledby='non-linear-slider'
            />
            <Typography
              id='non-linear-slider'
              gutterBottom>
              Tors
            </Typography>
            <Slider
              value={tors}
              min={0}
              step={1}
              max={196}
              onChange={(e) => {
                setTors(e.target.value)
                const data = {
                  type: "tors",
                  componentId: 3,
                  drawableId: e.target.value,
                  textureId: 0,
                  paletteId: 2,
                }
                mp.trigger("accounts:characterCreationEdit", JSON.stringify(data))
              }}
              valueLabelDisplay='auto'
              aria-labelledby='non-linear-slider'
            />
            <Typography
              id='non-linear-slider'
              gutterBottom>
              Top
            </Typography>
            <Slider
              value={top}
              min={0}
              step={1}
              max={30}
              onChange={(e) => {
                setTop(e.target.value)
                const data = {
                  type: "tops",
                  componentId: 11,
                  drawableId: e.target.value,
                  textureId: 0,
                  paletteId: 2,
                }
                mp.trigger("accounts:characterCreationEdit", JSON.stringify(data))
              }}
              valueLabelDisplay='auto'
              aria-labelledby='non-linear-slider'
            />
            <Typography
              id='non-linear-slider'
              gutterBottom>
              Podkoszulek
            </Typography>
            <Slider
              value={undershirts}
              min={0}
              step={1}
              max={30}
              onChange={(e) => {
                setUndershirts(e.target.value)
                const data = {
                  type: "undershirts",
                  componentId: 8,
                  drawableId: e.target.value,
                  textureId: 0,
                  paletteId: 2,
                }
                mp.trigger("accounts:characterCreationEdit", JSON.stringify(data))
              }}
              valueLabelDisplay='auto'
              aria-labelledby='non-linear-slider'
            />
            <Typography
              id='non-linear-slider'
              gutterBottom>
              Ubranie na nogi
            </Typography>
            <Slider
              value={legs}
              min={0}
              step={1}
              max={33}
              onChange={(e) => {
                setLegs(e.target.value)
                const data = {
                  type: "legs",
                  componentId: 4,
                  drawableId: e.target.value,
                  textureId: 0,
                  paletteId: 2,
                }
                mp.trigger("accounts:characterCreationEdit", JSON.stringify(data))
              }}
              valueLabelDisplay='auto'
              aria-labelledby='non-linear-slider'
            />
            <Typography
              id='non-linear-slider'
              gutterBottom>
              Buty
            </Typography>
            <Slider
              value={shoes}
              min={0}
              step={1}
              max={40}
              onChange={(e) => {
                setShoes(e.target.value)
                const data = {
                  type: "shoes",
                  componentId: 6,
                  drawableId: e.target.value,
                  textureId: 0,
                  paletteId: 2,
                }
                mp.trigger("accounts:characterCreationEdit", JSON.stringify(data))
              }}
              valueLabelDisplay='auto'
              aria-labelledby='non-linear-slider'
            />
          </TabPanel>
          <TabPanel
            value={"2"}
            sx={{ maxHeight: "95%", overflowY: "auto", background: "rgba(0, 0, 0, 0.5)" }}>
            <Divider
              sx={{ marginBottom: "15px" }}
              textAlign='center'>
              Ustawienia twarzy
            </Divider>

            <Typography
              id='non-linear-slider'
              gutterBottom>
              Kolor oczu: {eyeColors[eyeColor]}
            </Typography>

            <Slider
              value={eyeColor}
              min={0}
              step={1}
              max={31}
              onChange={(event) => {
                setEyeColor(event.target.value)
                const data = {
                  type: "eyeColor",
                  value: event.target.value,
                }
                mp.trigger("accounts:characterCreationEdit", JSON.stringify(data))
              }}
              valueLabelDisplay='auto'
              aria-labelledby='non-linear-slider'
            />

            {featureNames.map((element, index) => (
              <div key={index}>
                <Typography
                  id='non-linear-slider'
                  gutterBottom>
                  {element}
                </Typography>
                <Slider
                  value={featureValues[index]}
                  min={-1}
                  step={0.1}
                  max={1}
                  onChange={(e) => {
                    handleChangeFaceFeature(element, index, e.target.value)
                    setFeatureValues((prevValues) => prevValues.map((val, i) => (i === index ? e.target.value : val)))
                  }}
                  valueLabelDisplay='auto'
                  aria-labelledby='non-linear-slider'
                />
              </div>
            ))}

            <Divider
              sx={{ marginTop: "15px", marginBottom: "15px" }}
              textAlign='center'>
              Ustawienia ogólne
            </Divider>

            {headOverlays.map((element, index) => (
              <div key={index}>
                <Typography
                  id='non-linear-slider'
                  gutterBottom>
                  {element.name}
                </Typography>
                <Stack
                  direction={"row"}
                  spacing={1}
                  alignItems={"center"}>
                  <Slider
                    value={headValues[index]}
                    min={Number(element.min)}
                    step={1}
                    max={Number(element.maks)}
                    onChange={(e) => {
                      handleChangeHeadOverlay(element, index, e.target.value)
                      setHeadValues((prevValues) => prevValues.map((val, i) => (i === index ? e.target.value : val)))
                    }}
                    valueLabelDisplay='auto'
                    aria-labelledby='non-linear-slider'
                  />
                  <IconButton
                    aria-label='delete'
                    onClick={() => {
                      setHeadValues((prevValues) => prevValues.map((val, i) => (i === index ? 0 : val)))
                      const data = {
                        type: "headOverlay",
                        index: index,
                      }
                      mp.trigger("accounts:characterEditRestore", JSON.stringify(data))
                    }}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </div>
            ))}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}

export default CharacterCreation
