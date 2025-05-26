import '../css/stat-tile.css';

export default function StatisticsTile({ 
    title = "ORDER STATISTICS",
    pendingValue = 0,
    cancelledValue = 0,
    completedValue = 0,
    customLabels = {
        pending: "NO. OF PENDING ORDERS",
        cancelled: "NO. OF CANCELLED ORDERS",
        completed: "NO. OF COMPLETED ORDERS"
    }
}) {
    return (
        <div className="content">
            <h2 className="stat-title">{title}</h2>

            <div className='stat-row'>
                <p className="stat-label">{customLabels.pending}</p>
                <p className="stat-value">{pendingValue}</p>
            </div>

            <hr className="stat-divider"></hr>

            <div className='stat-row'>
                <p className="stat-label">{customLabels.cancelled}</p>
                <p className="stat-value">{cancelledValue}</p>
            </div>

            <hr className="stat-divider"></hr>

            <div className='stat-row'>
                <p className="stat-label">{customLabels.completed}</p>
                <p className="stat-value">{completedValue}</p>
            </div>
        </div>
    )
}