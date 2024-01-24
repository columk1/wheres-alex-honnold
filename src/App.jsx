import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Splash from './components/Splash/Splash'
import Game from './components/Game/Game'
import './App.css'

function App() {
  const [start, setStart] = useState(false)

  return (
    <>
      {start ? (
        <>
          <Game />
        </>
      ) : (
        <Splash startGame={() => setStart(true)} />
      )}
    </>
  )
}

export default App
