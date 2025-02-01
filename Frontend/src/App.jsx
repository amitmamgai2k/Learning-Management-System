
import { Route, Routes } from 'react-router-dom'
import './App.css'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'
import NotFound from './pages/PageNotFound'

function App() {


  return (
    <>



     <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="*" element={<NotFound/>} />
     </Routes>
     <Footer/>
    </>

  )
}

export default App
