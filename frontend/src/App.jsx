import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import HomePage from "./ClientPages/HomePage";
import SplashPage from "./ClientPages/SplashPage";
import SignInScreen from './ClientPages/Sign-in-Screen';
import SignUpScreen2 from './ClientPages/Sign-up-Screen-2';
import SignUpScreen1 from './ClientPages/Sign-up-Screen-1';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/sign-in-screen" element={<SignInScreen />} />
        <Route path="/sign-up-screen-1" element={<SignUpScreen1 />} />
        <Route path="/sign-up-screen-2" element={<SignUpScreen2 />} />
      </Routes>
    </Router>
  );
}

export default App;
