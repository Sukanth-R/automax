import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import '../index.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isOpen) {
      setDropdownOpen(false);
    }
  }, [isOpen]);

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#01013F] text-white p-4 md:sticky md:top-0 md:z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-4xl ms-5 font-bold pb-1 transition duration-300">
            AUTOMAX
          </div>
          <div className="hidden md:flex space-x-6 gap-4 items-center text-lg me-5">
            <Link 
              to="/" 
              className={`hover:text-gray-300 transition duration-300 ${isActive("/") ? "text-gray-300" : ""}`}
            >
              Home
            </Link>
            <Link 
              to="/components/about" 
              className={`hover:text-gray-300 transition duration-300 ${isActive("/about") ? "text-gray-300" : ""}`}
            >
              About
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                className={`flex items-center hover:text-gray-300 transition duration-300 ${
                  location.pathname.startsWith("/components/products") ? "text-gray-300" : ""
                }`}
              >
                Products <ChevronDown size={16} className="ml-1" />
              </button>
              <div
                className={`absolute z-50 bg-[#CBDCEB] text-sm text-black rounded-lg shadow-lg w-48 transition-all duration-300 ease-in-out ${
                  dropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                {[
                  { path: "/components/products/water", label: "Water Proof LED Lights" },
                  { path: "/components/products/boat", label: "Boat Lights" },
                  { path: "/components/products/fog", label: "Fog Lights" },
                  { path: "/components/products/twowheeler", label: "Two Wheeler Lights" },
                  { path: "/components/products/converters", label: "Converters" },
                  { path: "/components/products/roof", label: "Roof Lamps" },
                  { path: "/components/products/tail", label: "Tail Lamp Assembly" },
                  { path: "/components/products/side", label: "Side Indicators" },
                  { path: "/components/products/decorative", label: "Decorative Lights" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2 hover:bg-[#133E87] hover:text-white transition duration-300 ${
                      isActive(item.path) ? "bg-[#133E87] text-white" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link 
              to="/gallery" 
              className={`hover:text-gray-300 transition duration-300 ${isActive("/gallery") ? "text-gray-300" : ""}`}
            >
              Gallery
            </Link>
            <Link 
              to="/components/contact" 
              className={`hover:text-gray-300 transition duration-300 ${isActive("/components/contact") ? "text-gray-300" : ""}`}
            >
              Contact Us
            </Link>
          </div>
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-[#CBDCEB] hover:text-[#133E87] transition duration-300" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Contact & Social Media Section (Desktop) */}
      <div className="hidden md:block bg-gray-200 text-gray-800 p-3 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a 
              href="tel:+918825967397" 
              className="flex items-center ms-5 hover:text-gray-600 transition duration-300"
            >
              <FaPhone style={{ transform: "rotate(90deg)" }} className="text-black mr-2" /> +918825967397
            </a>
            <a 
              href="mailto:vivekautomax@gmail.com" 
              className="flex items-center hover:text-gray-600 transition duration-300"
            >
              <FaEnvelope className="text-black mr-2" /> vivekautomax@gmail.com
            </a>
          </div>
          <div className="flex space-x-4 mr-5">
            <p className="text-lg">Follow Us:</p>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition duration-300">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#01013F] text-white transition-all duration-300 ease-in-out ${
          isOpen 
            ? "max-h-[1100px] opacity-100" 
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="p-4 space-y-2">
          <Link 
            to="/" 
            className={`block py-3 px-4 text-lg hover:text-gray-300 hover:bg-[#133E87] transition duration-300 rounded-md ${
              isActive("/") ? "text-gray-300 bg-[#133E87]" : ""
            }`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/components/about" 
            className={`block py-3 px-4 text-lg hover:text-gray-300 hover:bg-[#133E87] transition duration-300 rounded-md ${
              isActive("/about") ? "text-gray-300 bg-[#133E87]" : ""
            }`}
            onClick={closeMobileMenu}
          >
            About
          </Link>
          
          {/* Products Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className={`flex items-center w-full text-white text-left py-3 px-4 text-lg hover:text-gray-300 hover:bg-[#133E87] transition duration-300 rounded-md ${
                location.pathname.startsWith("/components/products") ? "text-gray-300 bg-[#133E87]" : ""
              }`}
            >
              Products <ChevronDown size={16} className="ml-1" />
            </button>
            <div
              className={`w-full bg-white text-[#01013F] rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
                dropdownOpen 
                  ? "max-h-[600px] opacity-100" 
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <div className="p-2 space-y-2">
                {[
                  { path: "/components/products/water", label: "Water Proof LED Lights" },
                  { path: "/components/products/boat", label: "Boat Lights" },
                  { path: "/components/products/fog", label: "Fog Lights" },
                  { path: "/components/products/twowheeler", label: "Two Wheeler Lights" },
                  { path: "/components/products/converters", label: "Converters" },
                  { path: "/components/products/roof", label: "Roof Lamps" },
                  { path: "/components/products/tail", label: "Tail Lamp Assembly" },
                  { path: "/components/products/side", label: "Side Indicators" },
                  { path: "/components/products/decorative", label: "Decorative Lights" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block py-3 px-4 text-base hover:bg-[#133E87] hover:text-white transition duration-300 rounded-md ${
                      isActive(item.path) ? "bg-[#133E87] text-white" : ""
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link 
            to="/gallery" 
            className={`block py-3 px-4 text-lg hover:text-gray-300 hover:bg-[#133E87] transition duration-300 rounded-md ${
              isActive("/gallery") ? "text-gray-300 bg-[#133E87]" : ""
            }`}
            onClick={closeMobileMenu}
          >
            Gallery
          </Link>
          <Link 
            to="/components/contact" 
            className={`block py-3 px-4 text-lg hover:text-gray-300 hover:bg-[#133E87] transition duration-300 rounded-md ${
              isActive("/components/contact") ? "text-gray-300 bg-[#133E87]" : ""
            }`}
            onClick={closeMobileMenu}
          >
            Contact Us
          </Link>
          
          {/* Contact & Social Media Section (Mobile) */}
          <div className="mt-4 border-t border-gray-400 pt-4">
            <a 
              href="tel:+918825967397" 
              className="flex items-center py-3 px-4 hover:text-gray-300 transition duration-300"
            >
              <FaPhone style={{ transform: "rotate(90deg)" }} className="text-white mr-2" /> +918825967397
            </a>
            <a 
              href="mailto:vivekautomax@gmail.com" 
              className="flex items-center py-3 px-4 hover:text-gray-300 transition duration-300"
            >
              <FaEnvelope className="text-white mr-2" /> vivekautomax@gmail.com
            </a>
            <div className="flex flex-wrap space-x-4 mt-2 p-4">
              <p className="text-lg mt-3">Follow Us:</p>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition duration-300 py-2 pe-1">
                <FaFacebook size={34} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition duration-300 py-2 pe-1">
                <FaInstagram size={34} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition duration-300 py-2 pe-1">
                <FaTwitter size={34} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition duration-300 py-2 pe-1">
                <FaLinkedin size={34} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;