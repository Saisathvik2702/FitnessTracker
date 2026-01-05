import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <nav className="nav">
      <div className="container nav-inner">

        <div className="logo">💪FitnessTracker</div>

        <div className="links">

          <Link to="/">Home</Link>
          <Link to="/tools">Tools</Link>
          <Link to="/exercises">Exercises</Link>

          {/* IF USER LOGGED IN */}
          {currentUser ? (
            <>
              <Link to="/workouts">Sessions</Link>
              <Link to="/nutrition">Nutrition</Link>
              <Link to="/dashboard" className="signup-btn">Dashboard</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}
