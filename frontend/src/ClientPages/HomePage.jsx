import { useState, useEffect } from 'react';
import Header from "../components/Header";
import HeroBanner from '../components/HeroBanner';
import CategoryNav from '../components/CategoryNav';
import FeaturedSection from '../components/FeaturedSection';
import SearchBar from '../components/SearchBar'; 
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('ALL PRODUCTS');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

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
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (activeCategory !== 'ALL PRODUCTS') {
      filtered = filtered.filter(
        (product) => product.productType === categoryMap[activeCategory]
      );
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [activeCategory, searchTerm, products]);

  if (loading) return <div>Loading products...</div>;

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="harvest-container">
      <Header />
      <HeroBanner />
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="products-container">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        <FeaturedSection 
          products={filteredProducts}
          handleAddToCart={handleAddToCart}
        />
      </div>

    </div>

  );

}