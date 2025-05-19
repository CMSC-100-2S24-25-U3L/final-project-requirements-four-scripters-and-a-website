export default function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <div className="admin-nav"></div>
            <div className="dashboard-content" > 
                <h1 className="Header">This month's summary:</h1>
                <div className="bottom-header-divider"></div>
                <div className = "content-tiles">
                    <div className = "statistic-tiles">
                        <div className = "order-statistics">
                            <h2 className="orderstat-title">ORDER STATISTICS</h2>
                            <div className='stat-row'>
                                <p className="stat-label">NO. OF PENDING ORDERS</p>
                                <p className="stat-value"></p>
                            </div>
                            <div className="stat-divider"></div>

                            <div className='stat-row'>
                                <p className="stat-label">NO. OF CANCELLED ORDERS</p>
                                <p className="stat-value"></p>
                            </div>
                            <div className="stat-divider"></div>

                            <div className='stat-row'>
                                <p className="stat-label">NO. OF COMPLETED ORDERS</p>
                                <p className="stat-value"></p>
                            </div>
                        </div>

                        <div className = "product-statistics">

                        </div>
                    </div>
                    <div className = "square-right-tiles">
                        <div className = "harvester-count">
                            <h2 className="harv-count-text">As of -CURRENTDATE- there are</h2>
                            <h1 className="user-count-text">-USERCOUNT-</h1>
                            <h2 className="harv-count-text-cont">Harvesters</h2>
                        </div>

                        <div className = "top-products">
                            <h2 className = "top-products-header">
                                Most sold products for this month:
                            </h2>
                            <p className></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

