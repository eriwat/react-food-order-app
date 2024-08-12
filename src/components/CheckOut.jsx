import { useContext, useState } from "react";
import Input from "./Input";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import Error from "./Error";

import CartContext from "../store/ShoppingcartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  }
};

export default function CheckOut() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0,
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish(){
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    console.log("customerData", customerData);

    const orderData = {
      order: {
        items: cartCtx.items,
        customer: customerData,
      },
    };

    sendRequest(JSON.stringify(orderData));
  }

  let actions = (<><Button type="button" textOnly onClick={handleClose}>
    Close
  </Button>
    <Button type="submit">Submit Order</Button></>);

  if (isSending === true) {
    actions = <span>Sending order data...</span>
  }

  if (data && !error) {
    return(
      <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        <h2>Success!</h2>
        <p>Your order was submitted suceessfully.</p>
      
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okey</Button>
        </p>
       </Modal> 
    )
  }
  return (
    <Modal
      className="checkout"
      open={userProgressCtx.progress === "checkout"}
      onClose={handleClose}
    >
      <div>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <form onSubmit={handleSubmit}>
          <Input id="name" label="Full Name" type="text" />
          <Input id="email" label="Email Address" type="email" />
          <Input id="street" label="Street" type="text" />
          <div className="control-row">
            <Input id="postal-code" label="Postal Code" type="text" />
            <Input id="city" label="City" type="text" />
          </div>

          {error && <Error title="Failed to submit order" message={error} />}

          <p className="modal-action">
            {actions}
          </p>
        </form>
      </div>
    </Modal>
  );
}
