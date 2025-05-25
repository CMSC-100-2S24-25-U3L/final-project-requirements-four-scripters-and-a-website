import '../css/stat-tile.css';

export default function StatisticsTile({title, ordersValue, cancelledValue, completedValue}) {
    return (
            <div className="content">

                <h2 className="stat-title">ORDER STATISTICS</h2>

                <div className='stat-row'>
                    <p className="stat-label">NO. OF PENDING ORDERS</p>
                    <p className="stat-value">NA</p>
                </div>

                <hr className="stat-divider"></hr>

                <div className='stat-row'>
                    <p className="stat-label">NO. OF CANCELLED ORDERS</p>
                    <p className="stat-value"></p>
                </div>

                <hr className="stat-divider"></hr>

                <div className='stat-row'>
                    <p className="stat-label">NO. OF COMPLETED ORDERS</p>
                    <p className="stat-value"></p>
                </div>

            </div>
    )
}