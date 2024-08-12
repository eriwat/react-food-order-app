import { useEffect, useRef, useState } from "react";

import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Modal from "./components/UI/Modal.jsx";
import Cart from "./components/Cart.jsx";
import CheckOut from "./components/CheckOut.jsx";

import { CartContextProvider } from "./store/ShoppingcartContext.jsx";
import {
  UserProgressContextProvider,
  UserProgressContext,
} from "./store/UserProgressContext.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <CheckOut />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
