import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header.jsx";
import Home from "./screens/Home.jsx";
import Details from "./screens/Details.jsx";
import Category from "./screens/Category.jsx";
import Cart from "./screens/Cart.jsx";
import Checkout from "./screens/Checkout.jsx";
import CheckoutComplete from "./screens/CheckoutComplete.jsx";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product, showToast = true) {
    const itemExists = cartItems.find((item) => item.id === product.id);

    if (itemExists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

      if (showToast) {
        toast.success(`${product.title} quantity updated!`);
      }
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);

      if (showToast) {
        toast.success(`${product.title} added to cart!`);
      }
    }
  }

  function decreaseCartItem(productId, showToast = true) {
    const itemExists = cartItems.find((item) => item.id === productId);

    if (!itemExists) return;

    if (itemExists.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== productId));

      if (showToast) {
        toast.error(`${itemExists.title} removed from cart.`);
      }
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );

      if (showToast) {
        toast.info(`${itemExists.title} quantity decreased.`);
      }
    }
  }

  function removeFromCart(productId, showToast = true) {
    const removedItem = cartItems.find((item) => item.id === productId);

    setCartItems(cartItems.filter((item) => item.id !== productId));

    if (removedItem && showToast) {
      toast.error(`${removedItem.title} removed from cart.`);
    }
  }

  const cartCount = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <div className="app">
      <Header cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartItems={cartItems}
            />
          }
        />

        <Route
          path="/details/:id"
          element={
            <Details
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartItems={cartItems}
            />
          }
        />

        <Route
          path="/category/:categoryName"
          element={
            <Category
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartItems={cartItems}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              addToCart={addToCart}
              decreaseCartItem={decreaseCartItem}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route path="/checkout-complete" element={<CheckoutComplete />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
  );
}

export default App;