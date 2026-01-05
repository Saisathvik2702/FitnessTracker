// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  getUserData,
  getActivityForDate,
  saveActivityForDate,
} from "../utils/storage";
import "./UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);

  const [steps, setSteps] = useState(0);
  const [activeMinutes, setActiveMinutes] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0); // calories burned (activity)

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const [showInput, setShowInput] = useState(false);
  const [inputSteps, setInputSteps] = useState("");
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputCalories, setInputCalories] = useState("");

  // NEW: logs for the selected date
  const [workouts, setWorkouts] = useState([]);
  const [foods, setFoods] = useState([]);

  // ----------------------------
  // Load user + today’s data
  // ----------------------------
  useEffect(() => {
    const usr = getCurrentUser();
    if (!usr || !usr.id) {
      navigate("/login");
      return;
    }

    setUser(usr);
    setUserId(usr.id);

    loadDayData(usr.id, today);
  }, [navigate]);

  // ----------------------------
  // Generate calendar grid
  // ----------------------------
  useEffect(() => {
    generateCalendar(currentMonth);
  }, [currentMonth, userId]);

  const generateCalendar = (month) => {
    const days = [];
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    const firstDay = new Date(year, monthIndex, 1);
    const startingDay = firstDay.getDay();
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();

    // pre-load all workouts/foods once (for dots)
    const allWorkouts = userId ? getUserData(userId, "workouts") || [] : [];
    const allFoods = userId ? getUserData(userId, "foodlog") || [] : [];

    // Empty spots before 1st
    for (let i = 0; i < startingDay; i++) days.push({ empty: true });

    // Actual days
    for (let d = 1; d <= lastDay; d++) {
      const dateStr = `${year}-${String(monthIndex + 1).padStart(
        2,
        "0"
      )}-${String(d).padStart(2, "0")}`;

      const act = userId ? getActivityForDate(userId, dateStr) : null;
      const hasActivity =
        !!act &&
        ((act.steps ?? 0) > 0 ||
          (act.activeMinutes ?? act.minutes ?? 0) > 0 ||
          (act.calories ?? 0) > 0);

      const hasWorkouts = allWorkouts.some((w) => w.date === dateStr);
      const hasFoods = allFoods.some((f) => f.date === dateStr);

      days.push({
        date: dateStr,
        day: d,
        isToday: dateStr === today,
        hasLogs: hasActivity || hasWorkouts || hasFoods,
      });
    }

    setCalendarDays(days);
  };

  // ----------------------------
  // Load data for a given day
  // ----------------------------
  const loadDayData = (uId, date) => {
    setSelectedDate(date);

    const data = getActivityForDate(uId, date);

    if (data) {
      setSteps(data.steps ?? 0);
      // support both old "activeMinutes" and newer "minutes"
      setActiveMinutes(data.activeMinutes ?? data.minutes ?? 0);
      setTotalCalories(data.calories ?? 0);
    } else {
      setSteps(0);
      setActiveMinutes(0);
      setTotalCalories(0);
    }

    // workouts & foods for that day
    const allWorkouts = getUserData(uId, "workouts") || [];
    setWorkouts(allWorkouts.filter((w) => w.date === date));

    const allFoods = getUserData(uId, "foodlog") || [];
    setFoods(allFoods.filter((f) => f.date === date));
  };

  // ----------------------------
  // Open popup for a date
  // ----------------------------
  const openInputForDate = (e, date) => {
    e.stopPropagation();
    setSelectedDate(date);

    const existing = userId ? getActivityForDate(userId, date) || {} : {};
    setInputSteps(existing.steps ?? "");
    setInputMinutes(existing.activeMinutes ?? existing.minutes ?? "");
    setInputCalories(existing.calories ?? "");

    setShowInput(true);
  };

  // ----------------------------
  // Save activity from popup
  // ----------------------------
  const saveActivity = () => {
    if (!userId) return;

    const activity = {
      steps: Number(inputSteps) || 0,
      activeMinutes: Number(inputMinutes) || 0, // keep old key name
      calories: Number(inputCalories) || 0,
    };

    saveActivityForDate(userId, selectedDate, activity);

    setShowInput(false);
    setInputSteps("");
    setInputMinutes("");
    setInputCalories("");

    // reload data & calendar
    loadDayData(userId, selectedDate);
    generateCalendar(currentMonth);
  };

  // ----------------------------
  // Does any log/activity exist on this date?
  // (used for the green dot)
  // ----------------------------
  const activityExists = (date) => {
    if (!userId) return false;

    const act = getActivityForDate(userId, date);
    const hasActivity =
      !!act &&
      ((act.steps ?? 0) > 0 ||
        (act.activeMinutes ?? act.minutes ?? 0) > 0 ||
        (act.calories ?? 0) > 0);

    const allWorkouts = getUserData(userId, "workouts") || [];
    const allFoods = getUserData(userId, "foodlog") || [];

    const hasWorkouts = allWorkouts.some((w) => w.date === date);
    const hasFoods = allFoods.some((f) => f.date === date);

    return hasActivity || hasWorkouts || hasFoods;
  };

  // ----------------------------
  // Month navigation
  // ----------------------------
  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

  const previousMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );

  const nextYear = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1)
    );

  const prevYear = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1)
    );

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };

  // ----------------------------
  // Workout score (same formula as before)
  // ----------------------------
  const workoutScore = Math.min(
    100,
    Math.round(
      (steps / 10000) * 40 +
        (activeMinutes / 60) * 30 +
        (totalCalories / 500) * 30
    )
  );

  return (
    <div className="dashboard-page">
      {/* CENTERED DASHBOARD BOX */}
      <div className="dashboard-container">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

        <h1 className="dashboard-title">Welcome, {user.username} 👋</h1>
        <p className="dashboard-subtitle">Your fitness overview</p>

        {/* Workout Score Highlight */}
        <div className="highlight-card">
          <h2>Workout Score</h2>
          <p className="highlight-value">
            {isNaN(workoutScore) ? 0 : workoutScore}
          </p>
          <span className="highlight-unit">out of 100</span>
        </div>

        {/* Stats grid (same style) */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Calories Burned</h3>
            <p className="stat-value">{totalCalories}</p>
          </div>

          <div className="stat-card">
            <h3>Active Minutes</h3>
            <p className="stat-value">{activeMinutes}</p>
          </div>

          <div className="stat-card">
            <h3>Steps Taken</h3>
            <p className="stat-value">{steps}</p>
          </div>
        </div>

        {/* NEW: Calendar + Logs side by side */}
        <div className="bottom-layout">
          {/* LEFT: Calendar */}
          <div className="calendar-wrapper">
            <div className="calendar-nav">
              <button onClick={prevYear}>« Year</button>
              <button onClick={previousMonth}>‹ Month</button>

              <h2>
                {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                {currentMonth.getFullYear()}
              </h2>

              <button onClick={nextMonth}>Month ›</button>
              <button onClick={nextYear}>Year »</button>
            </div>

            <div className="calendar-grid">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="calendar-header">
                  {d}
                </div>
              ))}

              {calendarDays.map((day, index) =>
                day.empty ? (
                  <div key={index} className="calendar-empty"></div>
                ) : (
                  <div
                    key={day.date}
                    className={`calendar-day 
                      ${day.isToday ? "today" : ""} 
                      ${selectedDate === day.date ? "selected-day" : ""}
                    `}
                    onClick={() => loadDayData(userId, day.date)}
                  >
                    <span className="date-number">{day.day}</span>

                    {activityExists(day.date) && (
                      <span className="activity-dot"></span>
                    )}

                    <button
                      className="add-btn"
                      onClick={(e) => openInputForDate(e, day.date)}
                    >
                      +
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT: Workout & Food logs */}
          <div className="logs-column">
            <div className="log-section">
              <h3 className="log-title">Workout Log</h3>
              {workouts.length === 0 ? (
                <p className="log-empty">No workouts logged.</p>
              ) : (
                workouts.map((w) => (
                  <div key={w.id} className="log-card">
                    <strong>{w.category}</strong> — {w.exercise}
                    {w.weight && <span> • {w.weight}kg</span>}
                    {w.reps && <span> • {w.reps} reps</span>}
                  </div>
                ))
              )}
            </div>

            <div className="log-section">
              <h3 className="log-title">Food Log</h3>
              {foods.length === 0 ? (
                <p className="log-empty">No foods logged.</p>
              ) : (
                foods.map((f) => (
                  <div key={f.id} className="log-card">
                    <strong>{f.name}</strong> — {f.calories} cal
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Activity input modal (same as before) */}
        {showInput && (
          <div className="modal">
            <div className="modal-content">
              <h3>Add Activity for {selectedDate}</h3>

              <input
                type="number"
                placeholder="Steps"
                value={inputSteps}
                onChange={(e) => setInputSteps(e.target.value)}
              />

              <input
                type="number"
                placeholder="Active Minutes"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
              />

              <input
                type="number"
                placeholder="Calories Burned"
                value={inputCalories}
                onChange={(e) => setInputCalories(e.target.value)}
              />

              <button className="save-btn" onClick={saveActivity}>
                Save
              </button>
              <button
                className="close-btn"
                onClick={() => setShowInput(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
