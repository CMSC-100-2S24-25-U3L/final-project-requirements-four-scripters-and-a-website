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
                <h1 className="Header">This Month's Summary</h1>
                <hr className="divider"></hr>
                <div className = "content-tiles">
                    <div className = "statistic-tiles">
                        <StatisticsTile />
                        <StatisticsTile id="product-stats"/>
                    </div>
                    <div className = "square-right-tiles">
                        <div id = "harvesters-square-tile" >
                            <div className = "text-square">

                                <h2 className="harv-count-text">As of <br></br></h2>
                                <h1 className="harv-count-text" id="date-text">-DATE-</h1>
                                <h2>there are</h2>
                                <h1 className="harv-count-text" id="user-count-text">-USERCOUNT-</h1>
                                <h2 className="harv-count-text" id="harv-count-text-cont">Harvesters</h2>
                            </div>
                        </div>

                        <div id = "top-products-square-tile">
                            <div className="text-square">
                                <h2 className = "top-products-header">
                                    MOST SOLD PRODUCTS
                                </h2>
                                <hr className="top-products-divider"></hr>
                                <p className = "top-product-item">Insert Item Here</p>
                                <p className = "top-product-item">Insert Item Here</p>
                                <p className = "top-product-item">Insert Item Here</p>
                                <p className = "top-product-item">Insert Item Here</p>
                                <p className = "top-product-item">Insert Item Here</p>
                                <p className = "top-product-item">Insert Item Here</p>
                                <p className = "top-product-item">Insert Item Here</p>
                                <p className = "top-product-item">Insert Item Here</p>
                                <p className = "top-product-item">Insert Item Here</p>
                                <p className = "top-product-item">Insert Item Here</p>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="space"></div>
            </div>
            <Footer className="footer"/>
        </div>
    )
}

