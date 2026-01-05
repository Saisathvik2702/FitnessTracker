import { useState } from "react";
import "./Tools.css";

export default function TDEECalculator() {
  const [tdee, setTdee] = useState(null);

  const calculate = () => {
    const age = parseFloat(document.getElementById("tdeeAge").value);
    const height = parseFloat(document.getElementById("tdeeHeight").value);
    const weight = parseFloat(document.getElementById("tdeeWeight").value);
    const gender = document.getElementById("tdeeGender").value;
    const activity = parseFloat(document.getElementById("tdeeActivity").value);

    if (age > 0 && height > 0 && weight > 0 && activity > 0) {
      let bmr;

      if (gender === "male") {
        bmr = 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
      } else {
        bmr = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
      }

      const result = bmr * activity;
      setTdee(result.toFixed(2));
    }
  };

  return (
    <div className="container section tool-row">

      {/* LEFT SIDE – Calculator */}
      <div className="tool-col calc-box">
        <h2>TDEE Calculator</h2>

        <label>Age (years)</label>
        <input id="tdeeAge" type="number" />

        <label>Height (cm)</label>
        <input id="tdeeHeight" type="number" />

        <label>Weight (kg)</label>
        <input id="tdeeWeight" type="number" />

        <label>Gender</label>
        <select id="tdeeGender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Activity Level</label>
        <select id="tdeeActivity">
          <option value="1.2">Sedentary (little or no exercise)</option>
          <option value="1.375">Lightly Active (1–3 days/week)</option>
          <option value="1.55">Moderately Active (3–5 days/week)</option>
          <option value="1.725">Very Active (6–7 days/week)</option>
          <option value="1.9">Super Active (intense training)</option>
        </select>

        <button onClick={calculate}>Calculate</button>

        {tdee && (
          <p className="result">
            Your estimated <strong>TDEE:</strong> {tdee} calories/day
          </p>
        )}
      </div>

      <div className="tool-col desc-box">
        <h3 className="desc-title">What is TDEE?</h3>

        <p className="desc-text">
          <strong>TDEE (Total Daily Energy Expenditure)</strong> is the total number 
          of calories your body needs in a day based on activity level.
        </p>

        <div className="desc-section">
          <h4>How to Use TDEE</h4>
          <ul>
            <li><strong>TDEE – 300 to 500 kcal:</strong> Weight loss</li>
            <li><strong>TDEE:</strong> Maintain weight</li>
            <li><strong>TDEE + 300 to 500 kcal:</strong> Muscle gain</li>
          </ul>
        </div>

        <p className="desc-footer">
          Using your TDEE helps you plan calorie intake accurately.
        </p>
      </div>

    </div>
  );
}
