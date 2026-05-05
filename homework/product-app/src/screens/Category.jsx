import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";

function Category({ addToCart, removeFromCart, cartItems }) {
  const { categoryName } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategoryProducts() {
      console.log("Category selected:", categoryName);

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${categoryName}`
        );

        const data = await res.json();

        console.log("Category products:", data.products);
        setProducts(data.products);
      } catch (error) {
        console.log("Category fetch error:", error);
        setError("Something went wrong loading this category.");
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryProducts();
  }, [categoryName]);

  const pageTitle = categoryName.replaceAll("-", " ");

  return (
    <div>
      <h1>{pageTitle}</h1>

      {loading && <h2 className="loading">Loading category...</h2>}

      {error && <h2 className="error">{error}</h2>}

      {!loading && !error && products.length === 0 && (
        <h2>No products found in this category.</h2>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartItems={cartItems}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;