import ProductCard from './ProductCard';

export default function FeaturedSection({ products }) {
  return (
    <div className="featured-section">
      <h2 className="featured-title">Featured Products</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}