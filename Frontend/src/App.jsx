
import { Route, Routes } from 'react-router-dom'
import './App.css'

import HomeLayout from './Layouts/HomeLayout'
import HomePage from './pages/HomePage'

function App() {


  return (
    <>



     <Routes>
      <Route path="/" element={<HomePage/>} />
     </Routes>
    </>
  )
}

export default App
