import { useContext } from "react";

import headerLogo from "../assets/logo.jpg";
import Button from "./UI/Button";

import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/ShoppingcartContext";

export default function Header({ onClickCart }) {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="Logo" />
        <h1>REACTFOOD</h1>
      </div>

      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
