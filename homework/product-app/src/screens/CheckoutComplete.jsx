import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function CheckoutComplete() {
  const location = useLocation();

  const orderNumber = location.state?.orderNumber;
  const name = location.state?.name;
  const email = location.state?.email;
  const total = location.state?.total;

  useEffect(() => {
    if (orderNumber) {
      toast.success("Order completed successfully!", {
        toastId: "order-complete",
      });
    }
  }, [orderNumber]);

  if (!orderNumber) {
    return (
      <div className="checkout-complete-page">
        <h1>No Order Found</h1>
        <p>Please complete checkout first.</p>

        <Link to="/cart">
          <button className="checkout-btn">Back to Cart</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-complete-page">
      <h1>Checkout Complete</h1>

      <div className="order-card">
        <h2>Thank you, {name}!</h2>

        <p>Your order has been placed successfully.</p>

        <p>
          <strong>Order Number:</strong> {orderNumber}
        </p>

        <p>
          <strong>Email:</strong> {email}
        </p>

        <p>
          <strong>Total:</strong> ${total.toFixed(2)}
        </p>

        <Link to="/">
          <button className="checkout-btn">Back to Products</button>
        </Link>
      </div>
    </div>
  );
}

export default CheckoutComplete;