
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
import Denied from './pages/Denied'
import CourseDescription from './pages/CoursesPage/CourseDescription'
import RequireAuth from './components/Auth/RequireAuth'
import CreateCourse from './pages/CoursesPage/CreateCourse'
import UserProfile from './pages/UserAuthentication/UserProfile'
import Checkout from './pages/Payment/Checkout'
import PaymentSuccess from './pages/Payment/CheckoutSuccess'
import PaymentFail from './pages/Payment/CheckoutFailure'
import Displaylectures from './pages/Dashboard/Displaylectures'
import AddLecturePage from './pages/Dashboard/AddLectures'
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
      <Route path = '/courses/displayLectures' element={< Displaylectures/>} />
      <Route path = '/course/addlecture' element ={< AddLecturePage/>} />
      <Route path = '/access-denied' element={<Denied/>} />
      <Route path = '/courses/description/:title' element={<CourseDescription/>} />
      <Route element={<RequireAuth allowedRoles={['ADMIN']} />} >
      <Route path ='/course/create' element ={<CreateCourse/>}/>
      </Route>
      <Route element ={<RequireAuth allowedRoles={['ADMIN','USER']} />}>
      <Route path = '/profile' element={<UserProfile/>}/>
      <Route path  = '/checkout' element={<Checkout/>}/>
      <Route path = '/checkout/success' element={<PaymentSuccess/>}/>
      <Route path = '/checkout/fail' element={<PaymentFail/>}/>

      </Route>

     </Routes>

    </>

  )
}

export default App
