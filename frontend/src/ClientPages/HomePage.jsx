import { useState, useEffect } from 'react';
import Header from "../components/Header";
import HeroBanner from '../components/HeroBanner';
import CategoryNav from '../components/CategoryNav';
import FeaturedSection from '../components/FeaturedSection';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('ALL PRODUCTS');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['ALL PRODUCTS', 'GRAINS', 'FRUITS', 'VEGETABLES', 'DAIRY', 'MEAT'];

  const categoryMap = {
    GRAINS: 1,
    FRUITS: 2,
    VEGETABLES: 3,
    DAIRY: 4,
    MEAT: 5,
  };

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

  const filteredProducts =
    activeCategory === 'ALL PRODUCTS'
      ? products
      : products.filter(
          (product) => product.productType === categoryMap[activeCategory]
        );


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
        products={filteredProducts} 
      />
    </div>

  );

}