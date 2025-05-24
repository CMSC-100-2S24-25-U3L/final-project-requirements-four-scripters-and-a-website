import AdminHeader from "../../components/AdminHeader";
import StatisticsTile from "../../components/Statistics-tile";
import Footer from "../../components/Footer";
import '../../css/admin-dashboard.css';
import Logo from '../../assets/harvest-logo-colored.png';

export default function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <div className="admin-nav">
                <AdminHeader className="nav"/>
            </div>
            {/* <img src={Logo} className="logo"></img> */}
            <div className="space">
                
            </div>
            <div className="dashboard-content" > 
                <h1 className="Header">This month's summary:</h1>
                <hr className="divider"></hr>
                <div className = "content-tiles">
                    <div className = "statistic-tiles">
                        <StatisticsTile />
                        <StatisticsTile />
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
            <div className="space"></div>
            </div>
            <Footer className="footer"/>
        </div>
    )
}

