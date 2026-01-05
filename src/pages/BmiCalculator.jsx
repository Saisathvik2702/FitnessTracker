import { useState } from "react";
import "./Tools.css";

export default function BMICalculator() {
  const [bmi, setBmi] = useState(null);

  const calculate = () => {
    const h = parseFloat(document.getElementById("bmiHeight").value);
    const w = parseFloat(document.getElementById("bmiWeight").value);

    if (h > 0 && w > 0) {
      const result = w / ((h / 100) * (h / 100));
      setBmi(result.toFixed(2));
    }
  };

  return (
    <div className="container section tool-row">

      <div className="tool-col calc-box">
        <h2>BMI Calculator</h2>

        <label>Height (cm)</label>
        <input id="bmiHeight" type="number" />

        <label>Weight (kg)</label>
        <input id="bmiWeight" type="number" />

        <button onClick={calculate}>Calculate</button>

        {bmi && (
          <p className="result">
            Your <strong>BMI:</strong> {bmi}
          </p>
        )}
      </div>

      <div className="tool-col desc-box">
        <h3 className="desc-title">Understanding Your BMI</h3>

        <p className="desc-text">
          <strong>BMI (Body Mass Index)</strong> helps estimate whether your weight
          is healthy for your height.
        </p>

        <div className="desc-section">
          <h4>BMI Categories</h4>
          <ul>
            <li><strong>Below 18.5</strong> — Underweight</li>
            <li><strong>18.5 – 24.9</strong> — Normal weight</li>
            <li><strong>25 – 29.9</strong> — Overweight</li>
            <li><strong>30 and above</strong> — Obesity</li>
          </ul>
        </div>

        <p className="desc-footer">
          BMI may not apply accurately to athletes or muscular individuals.
        </p>
      </div>

    </div>
  );
}
