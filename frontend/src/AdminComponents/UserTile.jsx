import React from 'react';
import { Trash } from 'lucide-react';
import '../css/user-tile.css';

export default function UserTile ({ 
    firstName, 
    lastName, 
    middleInitial, 
    userType,
    onDelete 
}) {
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
                <div>
                    <div className="user-type">{userType?.toUpperCase() || 'CUSTOMER'}</div>
                    {onDelete && (
                        <button 
                            onClick={onDelete} 
                            title="Delete user"
                        >
                            <Trash size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
