import './Features.css';
import {
  ActivitySquare,
  PencilLine,
  Apple,
  Dumbbell,
  Calculator,
  Clock
} from "lucide-react";

export default function Features() {
  return (
    <section className="section features-section">
      <div className="container">

        <h2 className="features-title">Everything in One Place</h2>

        <div className="features">

          <div className="box">
            <ActivitySquare size={32} color="#00ff9d" />
            <h3>Dashboard</h3>
            <p>See your daily overview including calories, steps and recent activity.</p>
          </div>

          <div className="box">
            <PencilLine size={32} color="#00ff9d" />
            <h3>Activity Input</h3>
            <p>Manually log steps, active minutes and workout score for each day.</p>
          </div>

          <div className="box">
            <Apple size={32} color="#00ff9d" />
            <h3>Calories & Food Log</h3>
            <p>Add foods, track calorie intake and monitor your daily nutrition.</p>
          </div>

          <div className="box">
            <Dumbbell size={32} color="#00ff9d" />
            <h3>Exercises Library</h3>
            <p>Browse exercises with animations based on muscle groups.</p>
          </div>

          <div className="box">
            <Calculator size={32} color="#00ff9d" />
            <h3>Fitness Tools</h3>
            <p>Use built-in calculators for BMI, TDEE, body fat and more.</p>
          </div>

          <div className="box">
            <Clock size={32} color="#00ff9d" />
            <h3>User History</h3>
            <p>View saved logs, activity records and long-term progress.</p>
          </div>

        </div>

      </div>
    </section>
  );
}
