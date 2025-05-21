import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CartList from './components/CartList'
import ErrorBoundary from './ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CartList />}></Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
