import { useState } from "react";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/my-logo.svg";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow px-6 py-3 relative z-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 w-8" />
                </div>

                {/* Desktop Links */}
                <div className="hidden lg:flex gap-6 font-semibold text-black">
                    <a href="/" className="hover:text-gray-600">Home</a>
                    <a href="/shop" className="hover:text-gray-600">Shop</a>
                    <a href="/contact" className="hover:text-gray-600">Contact</a>
                    <a href="/about" className="hover:text-gray-600">About</a>
                </div>

                {/* Icons always visible */}
                <div className="flex items-center gap-5 text-black text-lg">
                    <FaUser className="cursor-pointer" />
                    <FaShoppingCart className="cursor-pointer" />

                    {/* Mobile menu toggle */}
                    <div className="lg:hidden">
                        <button onClick={() => setMenuOpen(true)}>
                            <FaBars />
                        </button>
                    </div>
                </div>
            </div>

            {/* Slide-down full-screen mobile menu */}
            <div
                className={`fixed top-0 left-0 w-full h-full bg-white z-40 transform transition-transform duration-300 ease-in-out ${
                    menuOpen ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <img src={logo} alt="Logo" className="h-8 w-8" />
                    <button onClick={() => setMenuOpen(false)}>
                        <FaTimes />
                    </button>
                </div>

                <div className="flex flex-col p-6 gap-6 font-semibold text-black text-lg">
                    <a href="/" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Home</a>
                    <a href="/shop" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Shop</a>
                    <a href="/contact" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Contact</a>
                    <a href="/about" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>About</a>
                </div>
            </div>
        </nav>
    );
}
