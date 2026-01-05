import { useState } from "react";
import "./Tools.css";

export default function FatCalculator() {
  const [bodyFat, setBodyFat] = useState(null);

  const calculate = () => {
    const waist = parseFloat(document.getElementById("fatWaist").value);
    const neck = parseFloat(document.getElementById("fatNeck").value);
    const height = parseFloat(document.getElementById("fatHeight").value);

    if (waist > 0 && neck > 0 && height > 0) {
      const result =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
        450;

      setBodyFat(result.toFixed(2));
    }
  };

  return (
    <div className="container section tool-row">

      {/* LEFT — Calculator */}
      <div className="tool-col calc-box">
        <h2>Body Fat Calculator</h2>

        <label>Waist (cm)</label>
        <input id="fatWaist" type="number" />

        <label>Neck (cm)</label>
        <input id="fatNeck" type="number" />

        <label>Height (cm)</label>
        <input id="fatHeight" type="number" />

        <button onClick={calculate}>Calculate</button>

        {bodyFat && (
          <p className="result">
            Estimated Body Fat: <strong>{bodyFat}%</strong>
          </p>
        )}
      </div>

      {/* RIGHT — Information */}
      <div className="tool-col desc-box">
        <h3 className="desc-title">About Body Fat Percentage</h3>

        <p className="desc-text">
          This method estimates body fat using the U.S. Navy formula.
        </p>

        <div className="desc-section">
          <h4>Typical Body Fat Ranges</h4>
          <ul>
            <li>Athletes: 6–13%</li>
            <li>Fitness: 14–17%</li>
            <li>Average: 18–24%</li>
            <li>Obese: 25%+</li>
          </ul>
        </div>

        <p className="desc-footer">
          Body fat % is a better indicator than weight alone.
        </p>
      </div>

    </div>
  );
}
