import { Link } from 'react-router-dom';
import './Tools.css';

export default function Tools() {
  const tools = [
    {
      id: 1,
      name: 'BMI Calculator',
      icon: '📏',
      description: 'Calculate your Body Mass Index',
      path: '/tools/bmi'
    },
    {
      id: 2,
      name: 'TDEE Calculator',
      icon: '🔥',
      description: 'Find your Total Daily Energy Expenditure',
      path: '/tools/tdee'
    },
    {
      id: 3,
      name: 'Fat Calculator',
      icon: '📊',
      description: 'Estimate your body fat percentage',
      path: '/tools/fat'
    },
    {
      id: 4,
      name: '1RM Calculator',
      icon: '💪',
      description: 'Calculate your one-repetition max',
      path: '/tools/1rm'
    },
    {
      id: 5,
      name: 'Calories Burned',
      icon: '🏃',
      description: 'Calculate calories burned during activities',
      path: '/tools/calburn'
    }
    /*{
      id: 6,
      name: 'Daily Calories',
      icon: '🍎',
      description: 'Find your recommended daily calorie intake',
      path: '/tools/calories'
    }*/
  ];

  return (
    <div className="fitness-tools-container">
      <h1>Fitness Tools</h1>
      <p className="tools-description">
        Choose a tool to track, calculate, and improve your fitness performance
      </p>

      <div className="tools-grid">
        {tools.map(tool => (
          <Link to={tool.path} key={tool.id} className="tool-card">
            <div className="tool-icon">{tool.icon}</div>
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
