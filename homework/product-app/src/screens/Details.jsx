import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Details() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Product details error:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2>Loading product details...</h2>;
  }

  return (
    <div className="details-page">
      <h1>{product.title}</h1>

      <img src={product.thumbnail} alt={product.title} />

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
    </div>
  );
}

export default Details;