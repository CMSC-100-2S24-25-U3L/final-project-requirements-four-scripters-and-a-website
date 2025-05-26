import AdminHeader from "../AdminComponents/AdminHeader";
import Filter from "../AdminComponents/ManageUsersFilter";
import UsersSummary from "../AdminComponents/UsersSummary";
import UserTile from "../AdminComponents/UserTile";
import '../css/manage-users.css';
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext'; // for getting current logged-in user
import { toast } from 'react-toastify'; // for showing error/success messages
import Footer from '../components/Footer';

const API_BASE_URL = 'http://localhost:3000';

export default function ManageUsers() {
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true); // loading flag
    const [error, setError] = useState(null); // error message holder
    const { user } = useAuth(); // get logged-in user from context

    // fetch with auth token and error handling
    const authFetch = async (url, options = {}) => {
        const token = localStorage.getItem('token');  // get saved token
        if (!token) {
            throw new Error('Authentication required'); // if no token, throw error
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`, // add token to headers
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({})); // parse error
                throw new Error(errorData.error || 'Request failed');
            }

            return response;    // return successful response
        } catch (error) {
            toast.error(error.message); // show error message
            throw error;
        }
    };

    // fetch users when component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await authFetch(`${API_BASE_URL}/users`); // get all users
                const data = await response.json(); // convert response to json
                setUsersList(data); // store data in state
            } catch (err) {
                setError(err.message); // handle errors
            } finally {
                setLoading(false); // stop loading
            }
        };
        
        fetchUsers();
    }, []);

    // function to delete a user
    const handleDeleteUser = async (email) => {
        if (!user || user.userType !== 'merchant') {
            toast.error('Unauthorized access'); // only merchants can delete
            return;
        }

        try {
            await authFetch(`${API_BASE_URL}/users/${email}`, {
                method: 'DELETE'
            });
            // remove user from list
            setUsersList(usersList.filter(user => user.email !== email));
            toast.success('User deleted successfully');
        } catch (err) {
            toast.error(err.message);
        }
    };
    // loading and error states
    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <AdminHeader />
            <div className="manage-products-header">
                <h1 className="Header">Manage Products</h1>
                <hr className="divider" />
            </div>
           {/*  <Filter /> */}
            <div className="admin-content-row">
                <UsersSummary 
                    totalCustomers={usersList.filter(u => u.userType === 'customer').length}
                    totalMerchants={usersList.filter(u => u.userType === 'merchant').length}
                />
                <div className="admin-users">
                    {usersList.length === 0 ? (
                        <div>No users found</div>
                    ) : (
                        usersList.map((user) => (
                            <UserTile 
                                key={user.email}
                                firstName={user.firstName}
                                lastName={user.lastName}
                                middleInitial={user.middleName?.[0] || ''}
                                userType={user.userType}
                                onDelete={() => handleDeleteUser(user.email)}
                            />
                        ))
                    )}
                </div>
            </div>
            <div className="footer-spacing"></div>
            <Footer />
        </div>
    )
}
