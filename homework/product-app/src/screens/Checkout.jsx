import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout({ cartItems, removeFromCart }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

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

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function createOrderNumber() {
    return "ORD-" + Math.floor(100000 + Math.random() * 900000);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please enter your name and email.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const orderNumber = createOrderNumber();

    console.log("Order Complete:", {
      orderNumber: orderNumber,
      customer: formData,
      items: cartItems,
      total: total,
    });

    navigate("/checkout-complete", {
      state: {
        orderNumber: orderNumber,
        name: formData.name,
        email: formData.email,
        total: total,
      },
    });
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {cartItems.length === 0 ? (
        <h2>Your cart is empty. Add products before checkout.</h2>
      ) : (
        <>
          <div className="checkout-summary">
            <h2>Order Summary</h2>

            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <div>
                  <p>
                    <strong>{item.title}</strong> x {item.quantity}
                  </p>

                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id, false)}
                >
                  Remove
                </button>
              </div>
            ))}

            <h2 className="checkout-total">Total: ${total.toFixed(2)}</h2>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            <button
              type="submit"
              style={checkoutButtonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Complete Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Checkout;