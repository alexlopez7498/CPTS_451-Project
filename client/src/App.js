import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
      <Route path="/login" element={<LoginPage setIsAdmin={setIsAdmin} />} />
      </Routes>
    </Router>
  );
}

export default App;
