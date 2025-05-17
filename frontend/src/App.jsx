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
import './App.css';
import AdminDashboard from './ClientPages/AdminDashboard';
import { ProtectedRoute } from './routes/ProtectedRoute';

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/sign-in-screen" element={<SignInScreen />} />
            <Route path="/home-page" element={ <ProtectedRoute> <HomePage /> </ProtectedRoute> } />
            <Route path="/cart" element={ <ProtectedRoute> <CartPage /> </ProtectedRoute> } />
            <Route path="/sign-up-screen-1" element={<SignUpScreen1 />} />
            <Route path="/sign-up-screen-2" element={<SignUpScreen2 />} />
            <Route path="/admin-dashboard" element={ <ProtectedRoute allowedRoles={['merchant']}> <AdminDashboard /> </ProtectedRoute> } />
          </Routes>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;