import "./FoodItem.css";

export default function FoodItem({ food, onSelect }) {
  return (
    <div className="food-item" onClick={() => onSelect(food)}>
      <h4>{food.name}</h4>
      <p>{food.calories} kcal per serving</p>
    </div>
  );
}
