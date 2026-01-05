import { useState } from "react";
import "./Tools.css";

export default function CalBurn() {
  const [calories, setCalories] = useState(null);

  const calculate = () => {
    const weight = parseFloat(document.getElementById("cbWeight").value);
    const duration = parseFloat(document.getElementById("cbDuration").value);
    const met = parseFloat(document.getElementById("cbMet").value);

    if (weight > 0 && duration > 0 && met > 0) {
      const result = (met * weight * 3.5 / 200) * duration;
      setCalories(result.toFixed(2));
    }
  };

  return (
    <div className="container section tool-row">

      {/* LEFT — Calculator */}
      <div className="tool-col calc-box">
        <h2>Calories Burned Calculator</h2>

        <label>Your Weight (kg)</label>
        <input id="cbWeight" type="number" />

        <label>Duration (minutes)</label>
        <input id="cbDuration" type="number" />

        <label>Activity MET value</label>
        <input id="cbMet" type="number" />

        <button onClick={calculate}>Calculate</button>

        {calories && (
          <p className="result">
            Estimated Calories Burned: <strong>{calories} kcal</strong>
          </p>
        )}
      </div>

      {/* RIGHT — Information */}
      <div className="tool-col desc-box">
        <h3 className="desc-title">How to Interpret Calories Burned</h3>

        <p className="desc-text">
          This calculator uses the <strong>MET formula</strong> to estimate calorie burn.
        </p>

        <div className="desc-section">
          <h4>Common MET Values</h4>
          <ul>
            <li>Walking (5 km/h): 3.5 MET</li>
            <li>Jogging (8 km/h): 7 MET</li>
            <li>Cycling (moderate): 6 MET</li>
            <li>Weight Training: 5 MET</li>
            <li>HIIT: 8–12 MET</li>
          </ul>
        </div>

        <p className="desc-footer">
          Use this estimate to better plan workout intensity.
        </p>
      </div>

    </div>
  );
}
