import React from 'react';
import '../css/users-summary.css';

export default function UsersSummary({ 
    totalCustomers = 0, 
    totalMerchants = 0 
}) {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="user-summary-tracker">
            <div className="summary-column">
                <h2 className="tracker-title">Users Summary</h2>
                <div className="tracker-item" id="tracker-date">
                    <span className="tracker-label">as of {currentDate}</span>
                </div>
                <hr className="summary-divider"></hr>
                <div className="tracker-item">
                    <span className="tracker-label">Total Customers</span>
                    <span className="tracker-value">{totalCustomers}</span>
                </div>
                <hr className="summary-divider"></hr>
                <div className="tracker-item">
                    <span className="tracker-label">Total Merchants</span>
                    <span className="tracker-value">{totalMerchants}</span>
                </div>
                <hr className="summary-divider"></hr>
                <div className="tracker-item">
                    <span className="tracker-label">Total Users</span>
                    <span className="tracker-value">{totalCustomers + totalMerchants}</span>
                </div>
            </div>
        </div>
    );
};