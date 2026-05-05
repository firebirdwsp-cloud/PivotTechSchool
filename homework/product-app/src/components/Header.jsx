import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Header({ cartCount }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("Categories:", data);
        setCategories(data);
      })
      .catch((error) => {
        console.log("Category fetch error:", error);
      });
  }, []);

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="logo">Software Development Product App</h1>

        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/cart">
            Cart 🛒 ({cartCount})
          </NavLink>
        </nav>
      </div>

      <nav className="category-bar">
        <NavLink to="/" end>
          All
        </NavLink>

        {categories.map((category) => (
          <NavLink key={category.slug} to={`/category/${category.slug}`}>
            {category.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;