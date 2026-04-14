import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import EmployerPage from "./pages/EmployerPage";
import ContractorPage from "./pages/ContractorPage";
import PoolPage from "./pages/PoolPage";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employer" element={<EmployerPage />} />
        <Route path="/contractor" element={<ContractorPage />} />
        <Route path="/pool" element={<PoolPage />} />
      </Routes>
    </Router>
  );
}

export default App;
