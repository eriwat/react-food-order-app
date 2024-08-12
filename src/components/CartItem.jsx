import { currencyFormatter } from "../util/formatting";

export default function ({ item, onIncrease, onDecrease }) {
  return (
    <li className="cart-item">
      {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
      <span className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </span>
    </li>
  );
}
