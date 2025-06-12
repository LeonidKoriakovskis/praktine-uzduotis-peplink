import { BrowserRouter as Router, Routes, Route } from 'react-router';
import JokesPage from "./pages/JokesPage"
import UsersPage from "./pages/UsersPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/jokes" element={<JokesPage />} />
      </Routes>
    </Router>
  )
}

export default App
