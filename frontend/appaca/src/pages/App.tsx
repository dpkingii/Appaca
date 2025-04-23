import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'
import NotFound from './NotFound'
import DisplayPage from './DisplayPage'
import TitlePage from '../twotruths/TitlePage'
import GameScreen from '../twotruths/GameScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/display" element={<DisplayPage/>} />
      <Route path="/notFound" element={<NotFound/>}/>
      <Route path="/twoTruths" element={<TitlePage/>}/>
      <Route path="/game" element={<GameScreen />} />
    </Routes>
  );
}

export default App
