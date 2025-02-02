
import { Route, Routes } from 'react-router-dom'
import './App.css'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'
import NotFound from './pages/PageNotFound'
import ContactPage from './pages/ContactPage'
import UserSignup from './pages/UserAuthentication/UserSignup'
import UserLogin from './pages/UserAuthentication/UserLogin'
import CourseList from './pages/CoursesPage/CourseList'

function App() {


  return (
    <>



     <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="*" element={<NotFound/>} />
      <Route path="/contact" element={<ContactPage/>} />
      <Route path="/signup" element={<UserSignup/>} />
      <Route path="/login" element={<UserLogin/>} />
      <Route path = '/courses' element={<CourseList/>} />
     </Routes>
     <Footer/>
    </>

  )
}

export default App
