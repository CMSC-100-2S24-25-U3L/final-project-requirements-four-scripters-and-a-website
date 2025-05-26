import { useState, useEffect } from 'react';
import AdminHeader from "../AdminComponents/AdminHeader";
import StatisticsTile from "../AdminComponents/Statistics-tile";
import Footer from "../components/Footer";
import '../css/admin-dashboard.css';
import OrderService from '../services/OrderService';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:3000';

export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [topProducts, setTopProducts] = useState([]);
    const [topRevenueProducts, setTopRevenueProducts] = useState([]);
    const { user } = useAuth();

    const authFetch = async (url, options = {}) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication required');
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Request failed');
            }

            return response;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const ordersResponse = await OrderService.getAllOrders();
                const ordersData = Array.isArray(ordersResponse.orders)
                    ? ordersResponse.orders
                    : Array.isArray(ordersResponse)
                        ? ordersResponse
                        : [];
                setOrders(ordersData);

                const productCounts = {};
                const productRevenue = {};

                ordersData.forEach(order => {
                    if (!order.products || !Array.isArray(order.products)) return;

                    order.products.forEach(product => {
                        if (!product.productID) return;

                        const productName = product.productID.productName || 'Unknown Product';
                        const quantity = Number(product.quantity) || 0;
                        const price = Number(product.productID.productPrice) || 0;

                        productCounts[productName] = (productCounts[productName] || 0) + quantity;
                        productRevenue[productName] = (productRevenue[productName] || 0) + (quantity * price);
                    });
                });

                setTopProducts(
                    Object.entries(productCounts)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 10)
                        .map(item => item[0])
                );

                setTopRevenueProducts(
                    Object.entries(productRevenue)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 10)
                        .map(([name, revenue]) => ({
                            name,
                            revenue: revenue.toLocaleString('en-PH', {
                                style: 'currency',
                                currency: 'PHP',
                                minimumFractionDigits: 2
                            }),
                            rawRevenue: revenue
                        }))
                );

                const usersResponse = await authFetch(`${API_BASE_URL}/users`);
                const usersData = await usersResponse.json();
                setUsers(usersData);

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load dashboard data');
                toast.error('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const pendingOrders = orders.filter(order => order.orderStatus === 0).length;
    const cancelledOrders = orders.filter(order => order.orderStatus === 2).length;
    const completedOrders = orders.filter(order => order.orderStatus === 1).length;

    const totalCustomers = users.filter(u => u.userType === 'customer').length;
    const totalMerchants = users.filter(u => u.userType === 'merchant').length;
    const totalUsers = users.length;

    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="admin-dashboard">
            <div className="admin-nav">
                <AdminHeader className="nav" />
            </div>
            <div className="space"></div>
            <div className="dashboard-content">
                <h1 className="Header">This Month's Summary</h1>
                <hr className="divider"></hr>
                <div className="content-tiles">
                    <div className="statistic-tiles">
                        <StatisticsTile
                            title="ORDER STATISTICS"
                            pendingValue={pendingOrders}
                            cancelledValue={cancelledOrders}
                            completedValue={completedOrders}
                        />
                        <StatisticsTile
                            title="USER STATISTICS"
                            pendingValue={totalCustomers}
                            cancelledValue={totalMerchants}
                            completedValue={totalUsers}
                            customLabels={{
                                pending: "TOTAL CUSTOMERS",
                                cancelled: "TOTAL MERCHANTS",
                                completed: "TOTAL USERS"
                            }}
                        />
                    </div>
                    <div className="square-right-tiles">
                        <div id="harvesters-square-tile">
                            <div className="text-square">
                                <h2 className="harv-count-text">As of {currentDate}</h2>
                                <h2>there are:</h2>
                                <h1 className="harv-count-text" id="user-count-text">
                                    {totalUsers.toLocaleString()}
                                </h1>
                                <h2 className="harv-count-text" id="harv-count-text-cont">Harvesters</h2>
                            </div>
                        </div>

                        <div id="top-products-square-tile">
                            <div className="text-square">
                                <h2 className="top-products-header">
                                    MOST SOLD PRODUCTS
                                </h2>
                                <hr className="top-products-divider"></hr>
                                {loading ? (
                                    <p>Loading products...</p>
                                ) : error ? (
                                    <p>{error}</p>
                                ) : (
                                    <ol>
                                        {topProducts.map((product, index) => (
                                            <li key={index} className="top-product-item">
                                                {product}
                                            </li>
                                        ))}
                                    </ol>
                                )}
                            </div>
                        </div>
                        <div id="top-revenue-products-square-tile">
                            <div className="text-square">
                                <h2 className="top-products-header">
                                    TOP SELLING PRODUCTS BY REVENUE
                                </h2>
                                <hr className="top-products-divider"></hr>
                                {loading ? (
                                    <div className="loading-placeholder">Loading revenue data...</div>
                                ) : error ? (
                                    <div className="error-message">{error}</div>
                                ) : topRevenueProducts.length === 0 ? (
                                    <div className="no-data">No revenue data available</div>
                                ) : (
                                    <ol className="revenue-list">
                                        {topRevenueProducts.map((product, index) => (
                                            <li key={index} className="revenue-item">
                                                <span className="product-name">{product.name}</span>
                                                <span className="product-revenue">{product.revenue}</span>
                                            </li>
                                        ))}
                                    </ol>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space"></div>
            </div>
            <Footer className="footer" />
        </div>
    )
}