import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import BmiCalculator from "./pages/BmiCalculator";
import TdeeCalculator from "./pages/TdeeCalculator";
import FatCalculator from "./pages/FatCalculator";
import OneRM from './pages/OneRM';
import CalBurn from './pages/CalBurn';
import Exercises from "./pages/Exercises";
import Footer from "./components/Footer";
import UserDashboard from './pages/UserDashboard';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Nutrition from "./pages/Nutrition";
import Workouts from "./pages/Workouts";

import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Navbar />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/bmi" element={<BmiCalculator />} />
            <Route path="/tools/tdee" element={<TdeeCalculator />} />
            <Route path="/tools/fat" element={<FatCalculator />} />
            <Route path="/tools/1rm" element={<OneRM />} />
            <Route path="/tools/calburn" element={<CalBurn />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
