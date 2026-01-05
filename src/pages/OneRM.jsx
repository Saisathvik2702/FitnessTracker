import { useState } from "react";
import "./Tools.css";

export default function OneRM() {
  const [oneRm, setOneRm] = useState(null);

  const calculate = () => {
    const w = parseFloat(document.getElementById("rmWeight").value);
    const r = parseFloat(document.getElementById("rmReps").value);

    if (w > 0 && r > 0) {
      const result = w * (1 + r / 30);
      setOneRm(result.toFixed(2));
    }
  };

  return (
    <div className="container section tool-row">

      {/* LEFT SIDE — Calculator */}
      <div className="tool-col calc-box">
        <h2>1RM Calculator</h2>

        <label>Weight Lifted (kg)</label>
        <input id="rmWeight" type="number" />

        <label>Reps Performed</label>
        <input id="rmReps" type="number" />

        <button onClick={calculate}>Calculate</button>

        {oneRm && (
          <p className="result">
            Estimated <strong>1RM:</strong> {oneRm} kg
          </p>
        )}
      </div>

      {/* RIGHT SIDE — Info */}
      <div className="tool-col desc-box">
        <h3 className="desc-title">How to Understand Your 1RM</h3>

        <p className="desc-text">
          Your <strong>1RM (One-Rep Max)</strong> represents the maximum weight 
          you can lift for one repetition. It helps set strength and hypertrophy targets.
        </p>

        <div className="desc-section">
          <h4>Training Zones Based on Your 1RM</h4>
          <ul>
            <li><strong>50–60%</strong> — Warm-up & technique practice</li>
            <li><strong>60–70%</strong> — Muscle hypertrophy (growth)</li>
            <li><strong>75–85%</strong> — Strength training</li>
            <li><strong>90–100%</strong> — Max effort (advanced lifters)</li>
          </ul>
        </div>

        <p className="desc-footer">
          Use your 1RM to track strength progress and create effective training plans.
        </p>
      </div>

    </div>
  );
}
