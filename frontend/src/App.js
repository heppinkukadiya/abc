import './App.css';
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import AddProduct from "./pages/admin/AddProduct";
import ProtectedRoute from "./pages/component/ProtrctedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import MainLayout from "./pages/component/MainLayout";
import Home from "./pages/home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Shop from "./pages/Shop/Shop";
import Product from "./pages/Shop/Product";


function App() {
    return (
        <Routes>
            {/* Admin Routes without navbar */}
            <Route path="/admin/java/login" element={<AdminLogin />} />
            <Route path="/admin/java" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/admin/java/AddProduct" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />

            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop/>}/>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product" element={<Product/>} />
            </Route>
        </Routes>
    );
}

export default App;
