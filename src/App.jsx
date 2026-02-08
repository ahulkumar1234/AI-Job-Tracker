import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Application from './pages/Application'
import AddCv from './pages/AddCv'
import Footer from './components/Footer'
import JobDetails from './pages/JobDetails'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Router>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/application" element={<Application />} />
          <Route path="/add-cv" element={<AddCv />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
