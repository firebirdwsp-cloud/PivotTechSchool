import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details({ addToCart, removeFromCart, cartItems }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductDetails() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();

        console.log(data);
        setProduct(data);
      } catch (error) {
        console.log("Product details error:", error);
        setError("Something went wrong loading product details.");
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <h2 className="loading">Loading product details...</h2>;
  }

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  if (!product) {
    return <h2 className="error">Product not found.</h2>;
  }

  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <div className="details-page">
      <h1>{product.title}</h1>

      <img src={product.thumbnail} alt={product.title} />

      <p>
        <strong>Price:</strong> ${product.price}
      </p>

      <p>
        <strong>Brand:</strong> {product.brand}
      </p>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Rating:</strong> ⭐ {product.rating}
      </p>

      <p>
        <strong>Stock:</strong>{" "}
        {product.stock === 0 ? "Sold Out" : product.stock}
      </p>

      <p>
        <strong>Description:</strong> {product.description}
      </p>

      {isInCart ? (
        <button
          className="remove-btn"
          onClick={() => removeFromCart(product.id)}
        >
          Remove from Cart
        </button>
      ) : (
        <button
          className="cart-btn"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Sold Out" : "Add to Cart"}
        </button>
      )}
    </div>
  );
}

export default Details;