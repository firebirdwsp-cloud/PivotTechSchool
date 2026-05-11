import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <Link to={`/details/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} />
      </Link>

      <h2>{product.title}</h2>

      <p className="price">
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

      <div className="tags">
        {product.tags?.map((tag) => (
          <span className="tag" key={tag}>
            #{tag}
          </span>
        ))}
      </div>

      <button
        className="cart-btn"
        onClick={() => addToCart(product)}
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? "Sold Out" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;