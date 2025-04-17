import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'
import NotFound from './NotFound'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/notFound" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
