import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./screens/Home.jsx";
import Details from "./screens/Details.jsx";
import Category from "./screens/Category.jsx";
import Cart from "./screens/Cart.jsx";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    const itemExists = cartItems.find((item) => item.id === product.id);

    if (itemExists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(productId) {
    setCartItems(cartItems.filter((item) => item.id !== productId));
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
              removeFromCart={removeFromCart}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;