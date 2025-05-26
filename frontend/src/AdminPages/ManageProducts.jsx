import AdminHeader from "../AdminComponents/AdminHeader";
import ProductTile from "../AdminComponents/ManageProductTile";
import React, { useState, useEffect } from 'react';
import '../css/manage-products.css';
import CategoryNav from "../components/CategoryNav.jsx";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:3000'; 

export default function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('ALL PRODUCTS');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        productName: '',
        productDescription: '',
        productPrice: 0,
        productType: 1,
        productQuantity: 0,
        productImage: ''
    });
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const categories = ['ALL PRODUCTS', 'GRAINS', 'FRUITS', 'VEGETABLES', 'DAIRY', 'MEAT'];

    const productTypeMap = {
        'GRAINS': 1,
        'FRUITS': 2,
        'VEGETABLES': 3,
        'DAIRY': 4,
        'MEAT': 5
    };

    const authFetch = async (url, options = {}) => {
        const token = localStorage.getItem('token');
        if (!token) {
            logout();
            navigate('/sign-in-screen');
            throw new Error('Authentication required');
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401) {
                logout();
                navigate('/sign-in-screen');
                throw new Error('Session expired, please login again');
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Request failed');
            }

            return response;
        } catch (error) {
            toast.error(error.message);
            setError(error.message);
            throw error;
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await authFetch(`${API_BASE_URL}/products`);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: name === 'productPrice' || name === 'productQuantity' || name === 'productType'
                   ? Number(value) 
                   : value
        }));
    };

    const handleAddProduct = async () => {
        if (!user || user.userType !== 'merchant') {
            toast.error('Unauthorized access');
            return;
        }

        // Validate required fields
        if (!newProduct.productName || !newProduct.productDescription) {
            toast.error('Product name and description are required');
            return;
        }

        if (newProduct.productPrice <= 0) {
            toast.error('Price must be greater than 0');
            return;
        }

        try {
            const response = await authFetch(`${API_BASE_URL}/products`, {
                method: 'POST',
                body: JSON.stringify(newProduct)
            });

            const createdProduct = await response.json();
            setProducts([...products, createdProduct]);
            toast.success('Product added successfully');
            
            // reset form and hide it
            setNewProduct({
                productName: '',
                productDescription: '',
                productPrice: 0,
                productType: 1,
                productQuantity: 0,
                productImage: ''
            });
            setShowAddForm(false);
        } catch (err) {
            // error message already shown by authFetch
        }
    };

    const handleProductUpdate = (updatedProduct) => {
        setProducts(products.map(product => 
            product.productID === updatedProduct.productID ? updatedProduct : product
        ));
    };

    const handleProductDelete = (productID) => {
        setProducts(products.filter(product => product.productID !== productID));
    };

    const filteredProducts = activeCategory === 'ALL PRODUCTS' 
        ? products 
        : products.filter(product => product.productType === productTypeMap[activeCategory]);

    if (loading) return <div>Loading products...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="manage-products-container">
            <AdminHeader />
            <CategoryNav  
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <div className="admin-products">
                {user?.userType === 'merchant' && (
                    <>
                        <button 
                            onClick={() => setShowAddForm(!showAddForm)} 
                            className="add-product-btn"
                        >
                            {showAddForm ? 'Cancel' : 'Add New Product'}
                        </button>
                        
                        {showAddForm && (
                            <div>
                                <h3>Add New Product</h3>
                                <div className="product-form">
                                    <div>
                                        <label>Product Name</label>
                                        <input
                                            type="text"
                                            name="productName"
                                            value={newProduct.productName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Description</label>
                                        <textarea
                                            name="productDescription"
                                            value={newProduct.productDescription}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Price</label>
                                        <input
                                            type="number"
                                            name="productPrice"
                                            value={newProduct.productPrice}
                                            onChange={handleInputChange}
                                            min="0.01"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                    <div className>
                                        <label>Quantity</label>
                                        <input
                                            type="number"
                                            name="productQuantity"
                                            value={newProduct.productQuantity}
                                            onChange={handleInputChange}
                                            min="0"
                                            required
                                        />
                                    </div>
                                    <div className>
                                        <label>Category</label>
                                        <select
                                            name="productType"
                                            value={newProduct.productType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="1">Grains</option>
                                            <option value="2">Fruits</option>
                                            <option value="3">Vegetables</option>
                                            <option value="4">Dairy</option>
                                            <option value="5">Meat</option>
                                        </select>
                                    </div>
                                    <div className>
                                        <label>Image URL</label>
                                        <input
                                            type="text"
                                            name="productImage"
                                            value={newProduct.productImage}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                    <button 
                                        onClick={handleAddProduct}
                                        className="submit-product-btn"
                                    >
                                        Save Product
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
                {filteredProducts.length === 0 ? (
                    <div className="no-products-message">No products found</div>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductTile 
                            key={product.productID}
                            product={product}
                            onProductUpdate={handleProductUpdate}
                            onProductDelete={handleProductDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
}