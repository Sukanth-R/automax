import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setDropdownOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setShowSearchResults(false);
      setSearchQuery("");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
    closeMobileMenu();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
  };

  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchQuery("");
    setShowSearchResults(false);
    setSearchOpen(false);
  };

  const productLinks = [
    { path: "/products/water", label: "Water Proof LED Lights" },
    { path: "/products/boat", label: "Boat Lights" },
    { path: "/products/fog", label: "Fog Lights" },
    { path: "/products/twowheeler", label: "Two Wheeler Lights" },
    { path: "/products/converters", label: "Converters" },
    { path: "/products/roof", label: "Roof Lamps" },
    { path: "/products/tail", label: "Tail Lamp Assembly" },
    { path: "/products/side", label: "Side Indicators" },
    { path: "/products/decorative", label: "Decorative Lights" },
  ];

  const filteredProducts = productLinks.filter(product =>
    product.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* First Navbar (Logo, Search, Contact, Social Media) */}
      <nav className="bg-white text-black p-3 sm:p-4 md:sticky md:top-0 md:z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center">
          {/* Logo - Left aligned */}
          <div className="cursor-pointer" onClick={handleLogoClick}>
            <img 
              src="https://sukanth-r.github.io/automax/images/logo1.png"
              alt="AUTOMAX Logo"
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </div>

          {/* Updated Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 mx-4 sm:mx-6 md:mx-8 max-w-sm sm:max-w-md md:max-w-lg search-container relative">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Products"
                className="w-full p-2 sm:p-2.5 pl-8 sm:pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 text-sm sm:text-base"
              />
              <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" size={20} />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50 w-full">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product.path}
                        onClick={() => handleSearchResultClick(product.path)}
                        className="px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 hover:text-red-600 text-sm sm:text-base"
                      >
                        {product.label}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 sm:px-4 py-2 text-gray-500 text-sm sm:text-base">No products found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Contact & Social Media (Desktop) */}
          <div className="hidden md:flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <a
                href="tel:+918825967397"
                className="flex items-center hover:text-red-700 transition duration-300"
              >
                <FaPhone style={{ transform: "rotate(90deg)" }} className="text-red-500 mr-1 sm:mr-2" size={14} />
              </a>
              <a
                href="mailto:vivekautomax@gmail.com"
                className="flex items-center hover:text-red-700 transition duration-300"
              >
                <FaEnvelope className="text-red-500 mr-1 sm:mr-2" size={14} />
              </a>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 ml-2">
              <span className="text-gray-600 hidden sm:inline">Follow Us:</span>
              <div className="flex space-x-2 sm:space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <FaFacebook size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <FaTwitter size={16} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <FaLinkedin size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Icons (Search, Menu) - Right aligned */}
          <div className="md:hidden flex items-center space-x-3 sm:space-x-4 ml-auto">
            <button
              className="p-1 sm:p-2 rounded-lg hover:bg-gray-200 transition duration-300"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="p-1 sm:p-2 rounded-lg hover:bg-gray-200 transition duration-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar (Toggles when search icon clicked) */}
      <div
        className={`md:hidden bg-white transition-all duration-300 ease-in-out ${
          searchOpen ? "max-h-24 py-3" : "max-h-0 overflow-hidden"
        }`}
        style={{ zIndex: isOpen ? 60 : 40 }}
        aria-hidden={!searchOpen}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative w-full search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search Products"
              className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 text-sm"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" size={20} />
            
            {/* Mobile Search Results Dropdown */}
            {showSearchResults && searchQuery && (
              <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50 w-full mx-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.path}
                      onClick={() => handleSearchResultClick(product.path)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 hover:text-red-600 text-sm"
                    >
                      {product.label}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500 text-sm">No products found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Second Navbar (Navigation Links) - Hidden on Mobile */}
      <nav className="hidden md:block bg-white text-black py-3 sticky top-[64px] sm:top-[72px] z-40 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex items-center space-x-6 sm:space-x-8">
            <Link
              to="/"
              className={`hover:text-red-600 transition duration-300 ${
                isActive("/") ? "text-red-600 font-medium" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`hover:text-red-600 transition duration-300 ${
                isActive("/about") ? "text-red-600 font-medium" : ""
              }`}
            >
              About
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`flex items-center hover:text-red-600 transition duration-300 ${
                  location.pathname.startsWith("/products") ? "text-red-600 font-medium" : ""
                }`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Products <ChevronDown size={16} className="ml-1" />
              </button>
              <div
                className={`absolute z-50 bg-white text-sm text-black rounded-lg shadow-lg w-48 transition-all duration-300 ease-in-out ${
                  dropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
                role="menu"
              >
                {productLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2 hover:bg-gray-100 hover:text-red-600 transition duration-300 ${
                      isActive(item.path) ? "bg-gray-100 text-red-600" : ""
                    }`}
                    role="menuitem"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/contact"
              className={`hover:text-red-600 transition duration-300 ${
                isActive("/contact") ? "text-red-600 font-medium" : ""
              }`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-50 bg-white w-64 sm:w-72 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: "0px", height: "calc(100vh - 0px)" }}
        aria-hidden={!isOpen}
      >
        <div className="h-full overflow-y-auto px-4 pb-4 space-y-2 pt-4">
          <Link
            to="/"
            className={`block py-3 px-4 text-sm sm:text-base  hover:bg-gray-100 transition duration-300 rounded-md ${
              isActive("/") ? "bg-gray-100 text-red-600 font-medium" : ""
            }`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block py-3 px-4 text-sm sm:text-base hover:bg-gray-100 transition duration-300 rounded-md ${
              isActive("/about") ? "bg-gray-100 text-red-600 font-medium" : ""
            }`}
            onClick={closeMobileMenu}
          >
            About
          </Link>

          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center w-full text-black text-left py-3 px-4 text-sm sm:text-base hover:bg-gray-100 transition duration-300 rounded-md ${
                location.pathname.startsWith("/products") ? "bg-gray-100 text-red-600 font-medium" : ""
              }`}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              Products <ChevronDown size={16} className="ml-1" />
            </button>
            <div
              className={`w-full bg-white text-black rounded-lg transition-all duration-300 ease-in-out ${
                dropdownOpen
                  ? "max-h-[600px] opacity-100 mt-2"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
              role="menu"
            >
              <div className="p-2 space-y-2">
                {productLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2 hover:bg-gray-100 hover:text-red-600 transition duration-300 text-sm sm:text-base ${
                      isActive(item.path) ? "bg-gray-100 text-red-600" : ""
                    }`}
                    onClick={closeMobileMenu}
                    role="menuitem"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/contact"
            className={`block py-3 px-4 text-sm sm:text-base hover:bg-gray-100 transition duration-300 rounded-md ${
              isActive("/contact") ? "bg-gray-100 text-red-600 font-medium" : ""
            }`}
            onClick={closeMobileMenu}
          >
            Contact Us
          </Link>

          {/* Contact Information Section (Mobile) */}
          <div className="mt-4 border-t border-gray-300 pt-4">
            <div className="space-y-3">
              <a
                href="tel:+918825967397"
                className="flex items-center px-4 py-3 bg-gray-100 rounded-lg text-sm sm:text-base"
                onClick={closeMobileMenu}
              >
                <FaPhone style={{ transform: "rotate(90deg)" }} className="text-red-500 mr-3" size={16} />
                Call Us: +91 88259 67397
              </a>
              <a
                href="mailto:vivekautomax@gmail.com"
                className="flex items-center px-4 py-3 bg-gray-100 rounded-lg text-sm sm:text-base"
                onClick={closeMobileMenu}
              >
                <FaEnvelope className="text-red-500 mr-3" size={16} />
                Email: vivekautomax@gmail.com
              </a>
            </div>

            {/* Social Media Section (Mobile) */}
            <div className="flex items-center mt-4 px-4 py-2">
              <p className="text-sm sm:text-base mr-3">Follow Us:</p>
              <div className="flex space-x-3 sm:space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-700 transition duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-700 transition duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-700 transition duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-700 transition duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;