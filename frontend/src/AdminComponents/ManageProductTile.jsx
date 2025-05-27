import { Trash, Edit, CircleCheck } from 'lucide-react';
import '../css/manage-product-tile.css';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:3000';

export default function ProductTile({ product, onProductUpdate, onProductDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const { user } = useAuth();

    const productTypes = {
        1: 'GRAINS',
        2: 'FRUITS',
        3: 'VEGETABLES',
        4: 'DAIRY',
        5: 'MEAT'
    };

    const authFetch = async (url, options = {}) => {
        const token = localStorage.getItem('token');
        if (!token) {
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

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Request failed');
            }

            return response;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    };

    const handleSave = async () => {
        if (!user || user.userType !== 'merchant') {
            toast.error('Unauthorized access');
            return;
        }

        console.log("Editing product with ID:", editedProduct.productID);
        try {
            
            // validate before saving
            if (editedProduct.productQuantity < 0) {
                throw new Error('Quantity cannot be negative');
            }
            if (editedProduct.productPrice <= 0) {
                throw new Error('Price must be greater than 0');
            }

            const response = await authFetch(`${API_BASE_URL}/products/${editedProduct.productID}`, {
                method: 'PUT',
                body: JSON.stringify({
                    productName: editedProduct.productName,
                    productDescription: editedProduct.productDescription,
                    productPrice: editedProduct.productPrice,
                    productType: editedProduct.productType,
                    productQuantity: editedProduct.productQuantity,
                    productImage: editedProduct.productImage
                })
            });
            
            const updatedProduct = await response.json();
            onProductUpdate(updatedProduct);
            setIsEditing(false);
            toast.success('Product updated successfully');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleDelete = async () => {
        if (!user || user.userType !== 'merchant') {
            toast.error('Unauthorized access');
            return;
        }

        console.log("Deleting product with ID:", product.productID);
        try {
            await authFetch(`${API_BASE_URL}/products/${product.productID}`, {
                method: 'DELETE'
            });
            onProductDelete(product.productID);
            toast.success('Product deleted successfully');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prev => ({
            ...prev,
            [name]: name === 'productPrice' || name === 'productQuantity' || name === 'productType'
                   ? Number(value) 
                   : value
        }));
    };

    return (
        <div className="admin-product-card">
            <div className="admin-product-image-placeholder">
                {product.productImage && (
                    <img src={product.productImage} alt={product.productName} className="admin-product-image" />
                )}
            </div>
            <div className="admin-product-details">
                <div className="admin-product-header">
                    {isEditing ? (
                        <input
                            name="productName"
                            value={editedProduct.productName || ''}
                            onChange={handleChange}
                            className="new-product-form-field-title"
                        />
                    ) : (
                        <h2 className="admin-product-title">{product.productName}</h2>
                    )}
                    {user?.userType === 'merchant' && (
                        <div className='admin-buttons'>
                            {isEditing ? (
                                <button onClick={handleSave} className="admin-save-btn"><CircleCheck className='save-edit-btn'/></button>
                            ) : (
                                <Edit 
                                    className="admin-edit-icon" 
                                    onClick={() => setIsEditing(true)} 
                                />
                            )}
                            <Trash 
                                className="admin-remove-icon" 
                                onClick={handleDelete} 
                            />
                        </div>
                    )}
                </div>
                <hr className="admin-divider"></hr>
                <div className="admin-text-content">
                    <div className="admin-product-info">
                        <div className="admin-info-item">
                            <span className="admin-info-label">PRODUCT ID</span>
                            <span className="admin-info-label" id="product-id-edit">{product.productID}</span>
                        </div>
                        <div className="admin-info-item">
                            <span className="admin-info-label">SELLING PRICE</span>
                            {isEditing ? (
                                <input
                                    type="number"
                                    name="productPrice"
                                    value={editedProduct.productPrice || ''}
                                    onChange={handleChange}
                                    className="new-product-form-field"
                                    id="product-edit-form-field"
                                    min="0.01"
                                    step="0.01"
                                />
                            ) : (
                                <span className="admin-info-value">PHP {product.productPrice?.toFixed(2)}</span>
                            )}
                        </div>
                        <div className="admin-info-item">
                            <span className="admin-info-label">PRODUCT TYPE</span>
                            {isEditing ? (
                                <select
                                    name="productType"
                                    value={editedProduct.productType || ''}
                                    onChange={handleChange}
                                    className="new-product-form-field"
                                    id="product-edit-form-field-select"
                                >
                                    {Object.entries(productTypes).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            ) : (
                                <span className="admin-info-value">{productTypes[product.productType]}</span>
                            )}
                        </div>
                        <div className="admin-info-item">
                            <span className="admin-info-label">QTY AVAILABLE</span>
                            {isEditing ? (
                                <input
                                    type="number"
                                    name="productQuantity"
                                    value={editedProduct.productQuantity || ''}
                                    onChange={handleChange}
                                    className="new-product-form-field"
                                    id="product-edit-form-field"
                                    min="0"
                                />
                            ) : (
                                <span className="admin-info-value">{product.productQuantity}</span>
                            )}
                        </div>
                    </div>
                    <div className="admin-product-description">
                        <span className="admin-description-label">PRODUCT DESCRIPTION</span>
                        {isEditing ? (
                            <textarea
                                name="productDescription"
                                value={editedProduct.productDescription || ''}
                                onChange={handleChange}
                                className="new-product-form-field"
                                id="product-edit-form-field-desc"
                            />
                        ) : (
                            <p className="admin-description-text">
                                {product.productDescription}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}