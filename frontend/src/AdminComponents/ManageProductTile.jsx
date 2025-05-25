import {Trash,Edit} from 'lucide-react';
import '../css/manage-product-tile.css';

export default function ManageProductTile() {
    return(
        <div>
            <div className="admin-product-card">
                <div className="admin-product-image-placeholder"></div>
                <div className="admin-product-details">
                    <div className="admin-product-header">
                        <h2 className="admin-product-title">Organic Tomatoes</h2>
                        <div className='admin-buttons'>
                            <Edit className="admin-edit-icon"/>
                            <Trash className="admin-remove-icon" />
                        </div>
                        
                    </div>
                    <hr className="admin-divider"></hr>
                    <div className="admin-text-content">

                        <div className="admin-product-info">
                            <div className="admin-info-item">
                                <span className="admin-info-label">PRODUCT ID</span>
                                <span className="admin-info-value">001</span>
                            </div>
                            <div className="admin-info-item">
                                <span className="admin-info-label">SELLING PRICE</span>
                                <span className="admin-info-value">PHP 50.00</span>
                            </div>
                            <div className="admin-info-item">
                                <span className="admin-info-label">PRODUCT TYPE</span>
                                <span className="admin-info-value">VEGETABLE</span>
                            </div>
                            <div className="admin-info-item">
                                <span className="admin-info-label">QTY AVAILABLE</span>
                                <span className="admin-info-value">1000</span>
                            </div>
                        </div>
                        <div className="admin-product-description">
                            <span className="admin-description-label">PRODUCT DESCRIPTION</span>
                            <p className="admin-description-text">
                                Organic tomatoes bili na po kayoh ten pesos lang. Sovrang organic lang vah ng tomatoes na ito and certified by the OUR.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}