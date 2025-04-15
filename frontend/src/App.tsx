import { BrowserRouter, Routes, Route } from 'react-router-dom'
import URLManager from './components/URLManager'
import Redirect from './components/Redirect'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<URLManager />}></Route>
        <Route path="/:shortURL" element={<Redirect />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
