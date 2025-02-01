
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {


  return (
    <>
    <div className='text-3xl bg-red-400'>Hello</div>
     <Routes>
      <Route path="/" element={<h1>Home</h1>} />
     </Routes>
    </>
  )
}

export default App
