function Cart({ cartItems, removeFromCart }) {
  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

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

                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>

                  <p>
                    <strong>Subtotal:</strong> ${item.price * item.quantity}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="cart-total">Total: ${total}</h2>
        </>
      )}
    </div>
  );
}

export default Cart;