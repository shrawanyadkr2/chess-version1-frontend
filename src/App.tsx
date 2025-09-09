
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from './screens/Landing'
import {Game} from './screens/Game'


function App() {

  return (
    <>
      <div className='h-screen bg-[rgba(135,95,78,1)]'>
        <BrowserRouter>
          <Routes>

            <Route path='/landing' element={<Landing />} />
            <Route path='/game' element={<Game />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
