import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from "./context/CartContext";
import HomePage from "./ClientPages/HomePage";
import CartPage from "./ClientPages/CartPage";
import ProfilePage from "./ClientPages/ProfilePage";
import SplashPage from "./ClientPages/SplashPage";
import SignInScreen from './ClientPages/Sign-in-Screen';
import SignUpScreen2 from './ClientPages/Sign-up-Screen-2';
import SignUpScreen1 from './ClientPages/Sign-up-Screen-1';
import AdminDashboard from './AdminPages/Admin-Dashboard';
import ManageProducts from './AdminPages/ManageProducts';
import ManageOrders from './AdminPages/ManageOrders';
import SalesReport from './AdminPages/SalesReport';
import ManageUsers from './AdminPages/ManageUsers';
import './App.css';
import { ProtectedRoute } from './routes/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/sign-in-screen" element={<SignInScreen />} />
            <Route path="/home-page" element={ <ProtectedRoute> <HomePage /> </ProtectedRoute> } />
            <Route path="/cart" element={ <ProtectedRoute> <CartPage /> </ProtectedRoute> } />
            <Route path="/profile" element={ <ProtectedRoute> <ProfilePage /> </ProtectedRoute> } />
            <Route path="/sign-up-screen-1" element={<SignUpScreen1 />} />
            <Route path="/sign-up-screen-2" element={<SignUpScreen2 />} />
            <Route path="/admin-dashboard" element={ <ProtectedRoute allowedRoles={['merchant']}> <AdminDashboard /> </ProtectedRoute> } />
            <Route path="/manage-products" element={ <ProtectedRoute allowedRoles={['merchant']}> <ManageProducts /> </ProtectedRoute> } />
            <Route path="/manage-orders" element={ <ProtectedRoute allowedRoles={['merchant']}> <ManageOrders /> </ProtectedRoute> } />
            <Route path="/manage-users" element={ <ProtectedRoute allowedRoles={['merchant']}> <ManageUsers /> </ProtectedRoute> } />
            <Route path="/sales-report" element={ <ProtectedRoute allowedRoles={['merchant']}> <SalesReport /> </ProtectedRoute> } />
           
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;