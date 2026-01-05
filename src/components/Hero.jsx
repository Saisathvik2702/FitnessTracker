// src/components/Hero.jsx (or wherever this file is)

import "./Hero.css";
import Lottie from "lottie-react";
import fitnessAnim from "../assets/fitness.json";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";   // ✅ use your auth helper

export default function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const user = getCurrentUser();  // ✅ uses currentUser from localStorage

    if (user) {
      navigate("/dashboard");   // already logged in
    } else {
      navigate("/signup");      // not logged in
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">

        {/* LEFT SIDE TEXT */}
        <div className="hero-text">
          <h1>Track Your Fitness</h1>
          <p>
            Manage your workouts, log daily activities, check your health stats and explore exercises in one simple place.
          </p>

          {/* ⭐ GET STARTED BUTTON (only functionality changed) */}
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>

        {/* RIGHT SIDE ANIMATION */}
        <div className="hero-lottie">
          <Lottie
            animationData={fitnessAnim}
            loop={true}
            className="lottie-anim"
          />
        </div>

      </div>
    </section>
  );
}
