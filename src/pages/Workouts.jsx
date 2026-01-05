import { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/auth";
import { getUserData, saveUserData } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import "./Workouts.css";

export default function Workouts() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [workouts, setWorkouts] = useState([]);
  const [category, setCategory] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  // CATEGORIES (CARDIO REMOVED)
  const categories = {
    Chest: ["Bench Press", "Incline Dumbbell Press", "Push-ups", "Chest Fly", "Cable Crossovers"],
    Back: ["Deadlift", "Pull-ups", "Bent-over Row", "Lat Pulldown", "Seated Row"],
    Shoulders: ["Overhead Press", "Lateral Raise", "Front Raise", "Arnold Press", "Reverse Fly"],
    Biceps: ["Barbell Curl", "Hammer Curl", "Dumbbell Curl", "Preacher Curl", "Cable Curl"],
    Triceps: ["Tricep Dips", "Skull Crushers", "Tricep Pushdown", "Overhead Extension", "Close-grip Bench Press"],
    Core: ["Plank", "Side Plank", "Russian Twists", "Leg Raises", "Mountain Climbers"],
    Legs: ["Squats", "Lunges", "Leg Press", "Leg Extension", "Romanian Deadlift"]
  };

  // Load user
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/login");
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  // Load workouts for selected date
  useEffect(() => {
    if (currentUser) {
      const all = getUserData(currentUser.id, "workouts");
      const today = all.filter((w) => w.date === selectedDate);
      setWorkouts(today);
    }
  }, [currentUser, selectedDate]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setExerciseList(categories[cat]);
    setExerciseName("");
  };

  const addWorkout = () => {
    if (!exerciseName || !weight || !reps) {
      alert("Please enter all fields");
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      category,
      exercise: exerciseName,
      weight: parseFloat(weight),
      reps: parseInt(reps),
    };

    const allWorkouts = getUserData(currentUser.id, "workouts");
    const updated = [...allWorkouts, newEntry];
    saveUserData(currentUser.id, "workouts", updated);

    setWorkouts(updated.filter((w) => w.date === selectedDate));

    setWeight("");
    setReps("");
  };

  const deleteWorkout = (id) => {
    const allWorkouts = getUserData(currentUser.id, "workouts");
    const updated = allWorkouts.filter((w) => w.id !== id);
    saveUserData(currentUser.id, "workouts", updated);

    setWorkouts(updated.filter((w) => w.date === selectedDate));
  };

  const totalVolume = workouts.reduce(
    (sum, w) => sum + w.weight * w.reps,
    0
  );

  if (!currentUser) return null;

  return (
    <div className="workouts-container">

      {/* LEFT PANEL */}
      <div className="calendar-panel">
        <h2>Workout History</h2>

        <input
          type="date"
          className="date-picker"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <div className="history-box">
          {workouts.length === 0 ? (
            <p className="empty">No workouts logged.</p>
          ) : (
            workouts.map((w) => (
              <div key={w.id} className="history-item">
                <strong>{w.exercise}</strong>
                <span>{w.weight}kg × {w.reps}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CENTER PANEL */}
      <div className="tracker-panel">
        <h2>Add Workout</h2>

        <div className="input-row-full">
          <div className="input-group">
            <label>Category</label>
            <select value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
              <option value="">Select Category</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Exercise</label>
            <select
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              disabled={!exerciseList.length}
            >
              <option value="">Select Exercise</option>
              {exerciseList.map((ex, i) => (
                <option key={i} value={ex}>{ex}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight"
            />
          </div>

          <div className="input-group">
            <label>Reps</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              placeholder="Reps"
            />
          </div>

          <div className="input-group">
            <label>&nbsp;</label>
            <button className="btn-add" onClick={addWorkout}>Add Set</button>
          </div>
        </div>

        <div className="log-list">
          <h3>Today's Workout</h3>

          {workouts.length === 0 ? (
            <p className="empty">No exercises added yet</p>
          ) : (
            workouts.map((w) => (
              <div key={w.id} className="log-item">
                <div>
                  <strong>{w.exercise}</strong>
                  <span style={{ marginLeft: "10px" }}>
                    {w.weight}kg × {w.reps}
                  </span>
                </div>

                <button className="btn-remove" onClick={() => deleteWorkout(w.id)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="summary-panel">
        <h2>Summary</h2>

        <div className="summary-card">
          <h3>Total Volume</h3>
          <p className="number">{totalVolume} kg</p>
        </div>

        <div className="summary-card">
          <h3>Total Sets</h3>
          <p className="number">{workouts.length}</p>
        </div>
      </div>
    </div>
  );
}
