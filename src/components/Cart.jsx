import { useContext } from "react";

import Button from "./UI/Button";
import Modal from "./UI/Modal";
import CartItem from "./CartItem";

import CartContext from "../store/ShoppingcartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleClose() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.hideCart();
    userProgressCtx.showCheckout();
  }

  function handleIncrease(item) {
    cartCtx.addItem(item);
  }

  function handleDecrease(id) {
    cartCtx.removeItem(id);
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleClose : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => handleIncrease(item)}
            onDecrease={() => handleDecrease(item.id)}
          />
        ))}
      </ul>
      <div className="cart-total">{currencyFormatter.format(cartTotal)}</div>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
