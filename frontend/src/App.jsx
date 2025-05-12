import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import HomePage from "./ClientPages/HomePage";
import CartPage from "./ClientPages/CartPage";
import SplashPage from "./ClientPages/SplashPage";
import SignInScreen from './ClientPages/Sign-in-Screen';
import SignUpScreen2 from './ClientPages/Sign-up-Screen-2';
import SignUpScreen1 from './ClientPages/Sign-up-Screen-1';
import './App.css';
import AdminDashboard from './ClientPages/AdminDashboard';


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/sign-in-screen" element={<SignInScreen />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/sign-up-screen-1" element={<SignUpScreen1 />} />
          <Route path="/sign-up-screen-2" element={<SignUpScreen2 />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
