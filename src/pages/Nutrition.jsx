import { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/auth";
import {
  getUserData,
  saveUserData,
  deleteUserData,
} from "../utils/storage";
import { useNavigate } from "react-router-dom";
import foodsData from "../data/foods.json";
import "./Nutrition.css";

export default function Nutrition() {
  const [dailyLog, setDailyLog] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [customMode, setCustomMode] = useState(false);
  const [customFood, setCustomFood] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Load user
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) navigate("/login");
    else setCurrentUser(user);
  }, []);

  // Load logs when date or user changes
  useEffect(() => {
    if (currentUser) loadDailyLog();
  }, [currentUser, selectedDate]);

  const loadDailyLog = () => {
    const logs = getUserData(currentUser.id, "foodlog").filter(
      (item) => item.date === selectedDate
    );
    setDailyLog(logs);
  };

  // ADD FOOD (with qty support)
  const addFood = (food) => {
    const allLogs = getUserData(currentUser.id, "foodlog");

    // check if same food already exists
    const existing = allLogs.find(
      (item) => item.date === selectedDate && item.name === food.name
    );

    if (existing) {
      // increase qty
      const updatedLogs = allLogs.map((item) =>
        item.id === existing.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );

      saveUserData(currentUser.id, "foodlog", updatedLogs);
      return loadDailyLog();
    }

    // else add new item with qty 1
    const newEntry = {
      id: Date.now(),
      date: selectedDate,
      qty: 1,
      ...food,
    };

    saveUserData(currentUser.id, "foodlog", [...allLogs, newEntry]);
    loadDailyLog();
  };

  // REMOVE FOOD (decrease qty or delete)
  const removeFood = (id) => {
    const allLogs = getUserData(currentUser.id, "foodlog");
    const item = allLogs.find((f) => f.id === id);

    if (!item) return;

    if (item.qty > 1) {
      const updated = allLogs.map((f) =>
        f.id === id ? { ...f, qty: f.qty - 1 } : f
      );
      saveUserData(currentUser.id, "foodlog", updated);
    } else {
      deleteUserData(currentUser.id, "foodlog", id);
    }

    loadDailyLog();
  };

  // DAILY TOTALS (qty aware)
  const totals = dailyLog.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories * item.qty,
      protein: acc.protein + item.protein * item.qty,
      carbs: acc.carbs + item.carbs * item.qty,
      fats: acc.fats + item.fats * item.qty,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  return (
    <div className="nutrition-container">
      <h1>Nutrition & Calorie Tracker</h1>

      {/* DATE PICKER */}
      <div className="date-box">
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* DAILY SUMMARY */}
      <div className="daily-summary">
        <h2>Daily Summary</h2>

        <div className="totals-grid">
          <div className="total-card">
            <span className="total-value">{totals.calories.toFixed(0)}</span>
            <span className="total-label">Calories</span>
          </div>

          <div className="total-card">
            <span className="total-value">{totals.protein.toFixed(1)}g</span>
            <span className="total-label">Protein</span>
          </div>

          <div className="total-card">
            <span className="total-value">{totals.carbs.toFixed(1)}g</span>
            <span className="total-label">Carbs</span>
          </div>

          <div className="total-card">
            <span className="total-value">{totals.fats.toFixed(1)}g</span>
            <span className="total-label">Fats</span>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="nutrition-sections">

        {/* LEFT — FOOD LIST */}
        <div className="food-list-section">
          <h2>Food Items</h2>

          <div className="food-results">
            {foodsData.map((food) => {
              const fixedFood = {
                name: food.name,
                calories: food.calories,
                protein: food.macros?.protein || 0,
                carbs: food.macros?.carbohydrates || food.macros?.carbs || 0,
                fats: food.macros?.fat || 0,
              };

              return (
                <div key={food.name} className="food-item">
                  <div>
                    <h4>{fixedFood.name}</h4>
                    <div className="food-macros">
                      <span>{fixedFood.calories} cal</span>
                      <span>P: {fixedFood.protein}g</span>
                      <span>C: {fixedFood.carbs}g</span>
                      <span>F: {fixedFood.fats}g</span>
                    </div>
                  </div>

                  <button
                    className="btn-add-nutrition"
                    onClick={() => addFood(fixedFood)}
                  >
                    Add
                  </button>
                </div>
              );
            })}
          </div>

          {/* CUSTOM FOOD BUTTON */}
          <button
            className="btn-custom"
            onClick={() => setCustomMode(!customMode)}
          >
            {customMode ? "Cancel" : "Add Custom Food"}
          </button>

          {/* CUSTOM FOOD FORM */}
          {customMode && (
            <div className="custom-food-box">
              <h3>Custom Food</h3>

              <input
                type="text"
                placeholder="Food name"
                value={customFood.name}
                onChange={(e) =>
                  setCustomFood({ ...customFood, name: e.target.value })
                }
              />

              <div className="macro-inputs">
                <input
                  type="number"
                  placeholder="Calories"
                  value={customFood.calories}
                  onChange={(e) =>
                    setCustomFood({ ...customFood, calories: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Protein"
                  value={customFood.protein}
                  onChange={(e) =>
                    setCustomFood({ ...customFood, protein: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Carbs"
                  value={customFood.carbs}
                  onChange={(e) =>
                    setCustomFood({ ...customFood, carbs: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Fats"
                  value={customFood.fats}
                  onChange={(e) =>
                    setCustomFood({ ...customFood, fats: e.target.value })
                  }
                />
              </div>

              <button
                className="btn-submit"
                onClick={() => {
                  addFood({
                    name: customFood.name,
                    calories: Number(customFood.calories),
                    protein: Number(customFood.protein),
                    carbs: Number(customFood.carbs),
                    fats: Number(customFood.fats),
                  });

                  setCustomFood({
                    name: "",
                    calories: "",
                    protein: "",
                    carbs: "",
                    fats: "",
                  });

                  setCustomMode(false);
                }}
              >
                Add Custom Food
              </button>
            </div>
          )}
        </div>

        {/* RIGHT — DAILY LOG */}
        <div className="daily-log-section">
          <h2>Today's Log</h2>

          {dailyLog.length === 0 ? (
            <div className="empty-log">
              <p>No foods logged</p>
            </div>
          ) : (
            <div className="log-list">
              {dailyLog.map((item) => (
                <div key={item.id} className="log-item">
                  <div>
                    <h4>{item.name} (x{item.qty})</h4>
                    <div className="food-macros">
                      <span>{item.calories * item.qty} cal</span>
                      <span>P: {(item.protein * item.qty).toFixed(1)}g</span>
                    <span>C: {(item.carbs * item.qty).toFixed(1)}g</span>
                        <span>F: {(item.fats * item.qty).toFixed(1)}g</span>

                    </div>
                  </div>

                  <div className="qty-box">
                    <button className="qty-btn" onClick={() => removeFood(item.id)}>-</button>
                    <span className="qty-value">{item.qty}</span>
                    <button className="qty-btn" onClick={() => addFood(item)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
