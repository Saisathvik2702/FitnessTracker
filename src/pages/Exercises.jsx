import { useState } from "react";
import Lottie from "lottie-react";
import "./Exercise.css";

// Import Lottie JSON animations
import chestAnim from "../assets/exercises/chest.json";
import backAnim from "../assets/exercises/back.json";
import shoulderAnim from "../assets/exercises/shoulders.json";
import bicepsAnim from "../assets/exercises/biceps.json";
import tricepsAnim from "../assets/exercises/triceps.json";
import legsAnim from "../assets/exercises/legs.json";
import cardioAnim from "../assets/exercises/cardio.json";
import coreAnim from "../assets/exercises/core.json"; 

export default function Exercise() {
  const [selected, setSelected] = useState(null);

  const exercises = {
    Chest: ["Bench Press", "Incline Dumbbell Press", "Push-ups", "Chest Fly", "Cable Crossovers"],
    Back: ["Deadlift", "Pull-ups", "Bent-over Row", "Lat Pulldown", "Seated Row"],
    Shoulders: ["Overhead Press", "Lateral Raise", "Front Raise", "Arnold Press", "Reverse Fly"],
    Biceps: ["Barbell Curl", "Hammer Curl", "Dumbbell Curl", "Preacher Curl", "Cable Curl"],
    Triceps: ["Tricep Dips", "Skull Crushers", "Tricep Pushdown", "Overhead Extension", "Close-grip Bench Press"],
    Legs: ["Squats", "Lunges", "Leg Press", "Leg Extension", "Romanian Deadlift"],
    Core: ["Plank", "Side Plank", "Russian Twists", "Leg Raises", "Mountain Climbers"],
    Cardio: ["Running", "Cycling", "Jump Rope", "Rowing", "Burpees"]
  };


  const mainExercise = {
    Chest: " Inclined Bench Press",
    Back: "Deadlift",
    Shoulders: "Overhead Press",
    Biceps: "Barbell Curl",
    Triceps: "Tricep Pushdown",
    Legs: "Barbell Lunges",
    Core: "Crunches",
    Cardio: "Cycling"
  };
  

  const anim = {
    Chest: chestAnim,
    Back: backAnim,
    Shoulders: shoulderAnim,
    Biceps: bicepsAnim,
    Triceps: tricepsAnim,
    Legs: legsAnim,
    Cardio: cardioAnim,
    Core: coreAnim
  };

  return (
    <div className="container section exercise-page">
      <h2>Exercise Categories</h2>

      <div className="exercise-buttons">
        {Object.keys(exercises).map((cat) => (
          <div
            key={cat}
            className={`exercise-btn ${selected === cat ? "active" : ""}`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      {selected && (
        <div className="exercise-box">
          
          <div className="exercise-info">
            <h3>{selected} Exercises</h3>

            <p>
              Effective <strong>{selected}</strong> exercises to build strength,
              muscle and endurance.
            </p>

            <ul>
              {exercises[selected].map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>

            <p className="note">
              Perform 3–4 sets of 8–12 reps. Cardio: 15–30 mins.
            </p>
          </div>

          {/* RIGHT: Lottie Animation */}
          <div className="exercise-lottie">
            <Lottie animationData={anim[selected]} loop autoplay />
            <p className="lottie-label">{mainExercise[selected]}</p>
          </div>
        </div>
      )}
    </div>
  );
}
