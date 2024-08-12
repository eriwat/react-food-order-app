import { useContext } from "react";
import Button from "./UI/Button";

import CartContext from "../store/ShoppingcartContext";

import { currencyFormatter } from "../util/formatting";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddToCart() {
    cartCtx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <div className="article">
        <img src={`http://localhost:3000/${meal.image}`} alt={name} />
        <h3>{meal.name}</h3>
        <p className="meal-item-price">
          {currencyFormatter.format(meal.price)}
        </p>
        <p className="meal-item-description">{meal.description}</p>
        <p className="meal-item-actions">
          <Button onClick={handleAddToCart}>Add to cart</Button>
        </p>
      </div>
    </li>
  );
}
