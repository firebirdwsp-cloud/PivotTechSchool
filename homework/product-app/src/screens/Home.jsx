import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

function Home({ addToCart, removeFromCart, cartItems }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = async (searchText = "") => {
    console.log("Searching for:", searchText);

    setLoading(true);
    setError(null);

    const url = searchText
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(
          searchText
        )}`
      : "https://dummyjson.com/products";

    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log("Fetch error:", error);
      setError("Something went wrong loading products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <h1>Product App</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <h2 className="loading">Loading products...</h2>}

      {error && <h2 className="error">{error}</h2>}

      {!loading && !error && products.length === 0 && (
        <h2>No products found.</h2>
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

export default Home;