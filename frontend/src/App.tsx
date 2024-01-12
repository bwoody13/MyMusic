import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import './App.css'
import Login from './routes/Login'
import Callback from './routes/Callback'
import Dashboard from './routes/Dashboard'
import AlbumDashboard from './routes/AlbumDashboard'
import PlaylistDashboard from './routes/PlaylistDashboard'

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
        <Route path='/dashboard/album' element={<AlbumDashboard />} />
        <Route path='dashboard/playlist' element={<PlaylistDashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
