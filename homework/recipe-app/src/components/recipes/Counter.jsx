function Counter({ count }) {
  return (
    <div className="counter-box">
      <h2 className="counter-title">Favorites</h2>
      <p className="counter-number">{count}</p>
    </div>
  );
}

export default Counter;