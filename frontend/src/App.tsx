import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import Login from './routes/Login'
import Callback from './routes/Callback'
import Dashboard from './routes/Dashboard'
import AlbumDashboard from './routes/AlbumDashboard'
import PlaylistDashboard from './routes/PlaylistDashboard'
import TopNavBar from './components/TopNavBar'
import LeftNavBar from './components/LeftNavBar'

function App() {

  return (
    <>
      <div>
        <TopNavBar />
        <div className='d-flex'>
          {/* <LeftNavBar /> */}
          {/* <p>The spotify app that helps you get the most out of your music.</p> */}
          <div className="flex-grow-1 p-3">
            <Router>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='callback' element={<Callback />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/dashboard/album' element={<AlbumDashboard />} />
                <Route path='dashboard/playlist' element={<PlaylistDashboard />} />
              </Routes>
            </Router>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
