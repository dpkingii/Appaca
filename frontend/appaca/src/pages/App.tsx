import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'
import NotFound from './NotFound'
import DisplayPage from './DisplayPage'
import SignupPage from './SignupPage'
import ChatPage from './MentorChat'
import Match from './Match'
import TitlePage from '../twotruths/TitlePage'
import GameScreen from '../twotruths/GameScreen';
import GuessingScreen from '../twotruths/GuessingScreen';
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/display" element={<DisplayPage/>} />
        <Route path="/notFound" element={<NotFound/>}/>
        <Route path="/match" element={<Match/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
        <Route path="/twoTruths" element={<TitlePage/>}/>
        <Route path="/game" element={<GameScreen />} />
        <Route path="/guess" element={<GuessingScreen />} /> 
      </Routes>
    </UserProvider>
  );
}

export default App
