import AdminHeader from "../AdminComponents/AdminHeader";
import ProductTile from "../AdminComponents/ManageProductTile";
import Filter from "../AdminComponents/ManageProductsFilter.jsx";
import React, { useState } from 'react';
import '../css/manage-products.css';
import CategoryNav from "../components/CategoryNav.jsx";


export default function ManageProducts(product) {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('ALL PRODUCTS');
    const categories = ['ALL PRODUCTS', 'GRAINS', 'FRUITS', 'VEGETABLES', 'DAIRY', 'MEAT'];

    const addProduct = () => {
        const newProduct = {
            productName: null, 
            productDescription: null, 
            productPrice: null,
            productType: null,
            productQuantity: null,
            productImage: null
        };
        setProducts([...products, newProduct]);
    }

    return(
        <div>
            <AdminHeader />
            <CategoryNav  
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <div className="admin-products">
                {products.map((product) => (
                    <ProductTile 
                        key={product.id} // Add a unique key prop
                        product={product} // Fixed typo: produc -> product
                    />
                ))}
                <ProductTile />
                <ProductTile />
                <ProductTile />
                <ProductTile />
                <ProductTile />
            </div>
            
        </div>
    )
}