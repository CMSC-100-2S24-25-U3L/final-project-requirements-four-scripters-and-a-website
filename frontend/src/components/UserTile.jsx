// src/components/UserTile.jsx
import React from 'react';
import '../css/user-tile.css';

export default function UserTile ({ firstName, lastName, middleInitial, userType }) {
    return (
        <div className="user-tile">
            <div className="avatar"></div>
            <div className="user-column">
                <div className="user-info">
                    <div className="user-details">
                        <span className="detail-label">FIRST NAME</span>
                        <span className="detail-value">{firstName || 'N/A'}</span>
                    </div>
                    <div className="user-details">
                        <span className="detail-label">LAST NAME</span>
                        <span className="detail-value">{lastName || 'N/A'}</span>
                    </div>
                    <div className="user-details">
                        <span className="detail-label">MIDDLE INITIAL</span>
                        <span className="detail-value">{middleInitial || 'N/A'}</span>
                    </div>
                </div>
                <hr className="user-divider" />
                <div className="type-container">
                    <div className="user-type">CUSTOMER</div>
                </div>
            </div>
        </div>
    );
};