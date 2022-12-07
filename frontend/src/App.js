import { Container } from 'react-bootstrap'
import {BrowserRouter,Routes, Route ,useNavigate} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
function App() {
  console.log('router')
  return (
 
      <BrowserRouter>
      <main className="py-3">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;




