import React from 'react';
import '../css/users-summary.css';

export default function UsersSummary() {
    return (
        <div className="user-summary-tracker">
            <div class="summary-column">
                <h2 className="tracker-title">Users Summary</h2>
                <div className="tracker-item" id="tracker-date">
                    <span className="tracker-label">as of May 1, 2025</span>
                </div>
                <hr className="summary-divider"></hr>
                <div className="tracker-item">
                    <span className="tracker-label">Total Customers</span>
                    <span className="tracker-value">1000</span>
                </div>
                <hr className="summary-divider"></hr>
                <div className="tracker-item">
                    <span className="tracker-label">Total Merchants</span>
                    <span className="tracker-value">1500</span>
                </div>
                <hr className="summary-divider"></hr>
                <div className="tracker-item">
                    <span className="tracker-label">Total Users</span>
                    <span className="tracker-value">2500</span>
                </div>
            </div>
              
        </div>
    );
};