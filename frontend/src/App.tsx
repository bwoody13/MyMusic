import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import Callback from './components/Callback'
import Dashboard from './components/Dashboard'
import SmartPlaylists from './components/SmartPlaylists'

function App() {

  return (
    <>
    <div>
      <h1>MySpotify</h1>
      <p>The spotify app that helps you get the most out of your music.</p>
    </div>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='callback' element={<Callback/>} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/smart-playlists' element={<SmartPlaylists />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
