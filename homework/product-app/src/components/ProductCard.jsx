import { Link } from "react-router";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/details/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} />
      </Link>

      <h2>{product.title}</h2>

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
    </div>
  );
}

export default ProductCard;