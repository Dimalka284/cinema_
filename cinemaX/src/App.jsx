import { useState } from 'react'
import { Route,Routes,Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from "./screen/home"
import About from "./screen/about"
import Community from './screen/community'
import MoviesDetails from './screen/moviedetails'
import Category from './screen/category'
import AIChatBot from './components/AIChatBot'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:title" element={<MoviesDetails/>} />
        <Route path="/about_us" element={<About />} />
        <Route path="/community" element={<Community />} />
        <Route path="/category/:genre" element={<Category />} />
      </Routes>

      <Footer />
    
      <AIChatBot />
    </>
  )
}

export default App
