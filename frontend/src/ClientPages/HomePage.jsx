import { useState, useEffect } from 'react';
import Header from "../components/Header";
import HeroBanner from '../components/HeroBanner';
import CategoryNav from '../components/CategoryNav';
import FeaturedSection from '../components/FeaturedSection';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('ALL PRODUCTS');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['ALL PRODUCTS', 'VEGETABLES', 'FRUITS', 'DAIRY', 'GRAINS', 'MEAT'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="harvest-container">
      <Header />
      <HeroBanner />
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <FeaturedSection
        products={products}
        activeCategory={activeCategory}
      />
    </div>

  );

}