export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.productImage} alt={product.productName} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.productName}</h3>
        <p className="product-price">{product.productPrice}</p>
        <p className="product-description">{product.productDescription}</p>
        <button className="add-to-cart-btn">ADD TO CART</button>
      </div>
    </div>
  );
}