import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'
import NotFound from './NotFound'
import DisplayPage from './DisplayPage'
import SignupPage from './SignupPage'
import ChatPage from './MentorChat'
import Match from './Match'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/display" element={<DisplayPage/>} />
      <Route path="/notFound" element={<NotFound/>}/>
      <Route path="/match" element={<Match/>}/>
      <Route path="/chat" element={<ChatPage/>}/>
    </Routes>
  )
}

export default App
