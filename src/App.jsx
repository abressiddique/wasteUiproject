import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Stepper from './components/Stepper'
import SkipSelector from './components/Skipselector'

function App() {
 

  return (
   <div> <Stepper/>
   <SkipSelector/> </div>
  )
}

export default App