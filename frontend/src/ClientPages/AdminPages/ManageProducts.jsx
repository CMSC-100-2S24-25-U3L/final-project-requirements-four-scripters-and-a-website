import AdminHeader from "../../components/AdminHeader";
import ProductTile from "../../components/ManageProductTile";
import Filter from "../../components/ManageProductsFilter.jsx";
import React, { useState } from 'react';



export default function ManageProducts(product) {
    const [products, setProducts] = useState([]);

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
            <Filter />
            <div className="products">
                {products.map((product) => (
                    <ProductTile 
                        key={product.id} // Add a unique key prop
                        product={product} // Fixed typo: produc -> product
                    />
                ))}
            </div>
            <ProductTile />
        </div>
    )
}