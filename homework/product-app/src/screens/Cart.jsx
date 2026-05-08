import { Link } from "react-router-dom";

function Cart({ cartItems, addToCart, decreaseCartItem, removeFromCart }) {
  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const checkoutButtonStyle = {
    marginTop: "22px",
    padding: "13px 26px",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #ffdd57, #ff4ecd)",
    color: "#050014",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
    boxShadow: "0 0 16px rgba(255, 78, 205, 0.45)",
    transition: "all 0.3s ease",
  };

  function handleMouseEnter(event) {
    event.currentTarget.style.transform = "translateY(-2px) scale(1.04)";
    event.currentTarget.style.background =
      "linear-gradient(135deg, #00eaff, #6c63ff)";
    event.currentTarget.style.color = "white";
    event.currentTarget.style.boxShadow =
      "0 0 18px rgba(0, 234, 255, 0.65)";
  }

  function handleMouseLeave(event) {
    event.currentTarget.style.transform = "none";
    event.currentTarget.style.background =
      "linear-gradient(135deg, #ffdd57, #ff4ecd)";
    event.currentTarget.style.color = "#050014";
    event.currentTarget.style.boxShadow =
      "0 0 16px rgba(255, 78, 205, 0.45)";
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />

                <div className="cart-info">
                  <h2>{item.title}</h2>

                  <p>
                    <strong>Price:</strong> ${item.price}
                  </p>

                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => decreaseCartItem(item.id, false)}
                    >
                      -
                    </button>

                    <span>Quantity: {item.quantity}</span>

                    <button
                      className="qty-btn"
                      onClick={() => addToCart(item, false)}
                    >
                      +
                    </button>
                  </div>

                  <p>
                    <strong>Subtotal:</strong> $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, false)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="cart-total">Total: ${total.toFixed(2)}</h2>

          <Link to="/checkout">
            <button
              style={checkoutButtonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;