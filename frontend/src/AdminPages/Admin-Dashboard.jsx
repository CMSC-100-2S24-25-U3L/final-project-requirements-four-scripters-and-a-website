import AdminHeader from "../AdminComponents/AdminHeader";
import StatisticsTile from "../AdminComponents/Statistics-tile";
import Footer from "../components/Footer";
import '../css/admin-dashboard.css';
import Logo from '../assets/harvest-logo-colored.png';

export default function AdminDashboard() {
    // Define a list of top products
    const topProducts = [
        "Product A",
        "Product B",
        "Product C",
        "Product D",
        "Product E",
        "Product F",
        "Product G",
        "Product H",
        "Product I",
        "Product J",
    ];

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
                <div className="content-tiles">
                    <div className="statistic-tiles">
                        <StatisticsTile />
                        <StatisticsTile id="product-stats"/>
                    </div>
                    <div className="square-right-tiles">
                        <div id="harvesters-square-tile">
                            <div className="text-square">
                                <h2 className="harv-count-text">As of DATE</h2>
                                <h2>there are:</h2>
                                <h1 className="harv-count-text" id="user-count-text">123456</h1>
                                <h2 className="harv-count-text" id="harv-count-text-cont">Harvesters</h2>
                            </div>
                        </div>

                        <div id="top-products-square-tile">
                            <div className="text-square">
                                <h2 className="top-products-header">
                                    MOST SOLD PRODUCTS
                                </h2>
                                <hr className="top-products-divider"></hr>
                                <ol>
                                    {topProducts.slice(0,10).map((product, index) => (
                                        <li key={index} className="top-product-item">{product}</li>
                                    ))}
                                </ol>
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