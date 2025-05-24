import {Trash,Edit} from 'lucide-react';
import '../css/manage-product-tile.css';

export default function ManageProductTile() {
    return(
        <div>
            <div className="product-card">
                <div className="product-image-placeholder"></div>
                <div className="product-details">
                    <div className="product-header">
                        <h2 className="product-title">Organic Tomatoes</h2>
                        <div className='buttons'>
                            <Edit className="edit-icon"/>
                            <Trash className="remove-icon" />
                        </div>
                        
                    </div>
                    <hr className="divider"></hr>
                    <div className="text-content">

                        <div className="product-info">
                            <div className="info-item">
                                <span className="info-label">PRODUCT ID</span>
                                <span className="info-value">001</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">SELLING PRICE</span>
                                <span className="info-value">PHP 50.00</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">PRODUCT TYPE</span>
                                <span className="info-value">VEGETABLE</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">QTY AVAILABLE</span>
                                <span className="info-value">1000</span>
                            </div>
                        </div>
                        <div className="product-description">
                            <span className="description-label">PRODUCT DESCRIPTION</span>
                            <p className="description-text">
                                Organic tomatoes bili na po kayoh ten pesos lang. Sovrang organic lang vah ng tomatoes na ito and certified by the OUR.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}