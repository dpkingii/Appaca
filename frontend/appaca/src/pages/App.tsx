import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'
import NotFound from './NotFound'
import DisplayPage from './DisplayPage'
import SignupPage from './SignupPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/display" element={<DisplayPage/>} />
      <Route path="/notFound" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
