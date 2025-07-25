import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronLeft, ChevronRight, Search, Home, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BoatLEDLight = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterVolt, setFilterVolt] = useState("all");
  const [filterColor, setFilterColor] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentCarousel, setCurrentCarousel] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const [expandedSections, setExpandedSections] = useState({
    voltage: true,
    color: true
  });

  const filterDropdownRef = useRef(null);

  // Responsive checks
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };
    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

  // Fetch products with caching
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoaded(false);
        setFetchError(false);

        // Cache keys specific for boat
        const cachedData = localStorage.getItem('boatLights');
        const cacheTimestamp = localStorage.getItem('boatLightsTimestamp');
        const cacheExpiry = 60 * 60 * 1000; // 1 hour

        if (cachedData && cacheTimestamp) {
          const age = Date.now() - parseInt(cacheTimestamp, 10);
          if (age < cacheExpiry) {
            setProducts(JSON.parse(cachedData));
            setIsLoaded(true);
            return;
          }
        }

        const response = await fetch("https://translator-0dye.onrender.com/api/products");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        const filteredData = data.filter(p => p.category === "Boat Lights");

        localStorage.setItem('boatLights', JSON.stringify(filteredData));
        localStorage.setItem('boatLightsTimestamp', Date.now().toString());

        setProducts(filteredData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoaded(true);
      } catch (error) {
        setFetchError(true);
        setIsLoaded(true);
      }
    };
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  // Filtering logic
  const uniqueColors = [...new Set(products.map(p => p.color))].filter(Boolean);
  const filteredProducts = products.filter(p =>
    (filterVolt === "all" || p.volt.toLowerCase() === filterVolt.toLowerCase()) &&
    (filterColor === "all" || p.color === filterColor) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.partNo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Carousel logic
  const getProductsPerRow = () => {
    if (isMobile) return 2;
    if (isTablet) return 4;
    return 6;
  };
  const productsPerRow = getProductsPerRow();
  const rowsPerCarousel = 2;
  const productsPerCarousel = productsPerRow * rowsPerCarousel;
  const totalCarousels = Math.ceil(filteredProducts.length / productsPerCarousel);
  const currentProducts = filteredProducts.slice(
    currentCarousel * productsPerCarousel,
    (currentCarousel + 1) * productsPerCarousel
  );
  const productRows = [];
  for (let i = 0; i < currentProducts.length; i += productsPerRow) {
    productRows.push(currentProducts.slice(i, i + productsPerRow));
  }
  const nextCarousel = () => setCurrentCarousel(prev => Math.min(prev + 1, totalCarousels - 1));
  const prevCarousel = () => setCurrentCarousel(prev => Math.max(prev - 1, 0));
  const handleRefresh = () => window.location.reload();
  const toggleSection = (section) => setExpandedSections(prev => ({
    ...prev,
    [section]: !prev[section]
  }));
  const clearAllFilters = () => {
    setFilterVolt("all");
    setFilterColor("all");
    setSearchTerm("");
  };

  // Animation variants (same as water.js)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f8fafc"
    }
  };
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };
  const loadingContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const loadingItem = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { repeat: Infinity, repeatType: "reverse", duration: 0.8 }
    }
  };

  const hasActiveFilters = filterVolt !== "all" || filterColor !== "all";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section
        className="w-full sm:h-[400px] px-4 sm:px-6 lg:px-20 py-12 md:py-16 text-black relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-red-600">AUTOMAX</h2>
              <p className="text-sm uppercase text-white mb-2">MANUFACTURING | MARKETING </p>
              <div className="w-16 h-1 bg-orange-400 mb-6"></div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-1 text-white hover:text-blue-300 transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span className="text-sm sm:text-lg font-medium">Home</span>
                </button>
                <span className="text-sm sm:text-lg text-gray-300">/ BOAT LED LIGHTS</span>
              </div>
            </div>
            <div className="lg:w-2/3">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
                BOAT LED LIGHTS
              </h3>
              <p className="text-sm sm:text-base mb-6 text-gray-200">
                Astra Boat LED Lights are designed for marine environments, offering reliable and waterproof illumination for boats and yachts. Explore our collection for the perfect lighting solution for your vessel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 bg-white relative">
        {/* Filter Bar */}
        <div className="flex flex-col gap-3 mb-4 sm:mb-6 px-2 py-2 border-b border-gray-100">
          {/* Top Row: Filter dropdown and Clear All button */}
          <div className="flex items-center justify-between w-full">
            {/* Filter Dropdown */}
            <div className="relative" ref={filterDropdownRef}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center h-10 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full gap-2 text-gray-700"
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filters</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute z-50 top-12 left-0 w-64 sm:w-80 bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    <div className="max-h-96 overflow-y-auto">
                      {/* Voltage Filter */}
                      <div className="p-4 border-b border-gray-100">
                        <div
                          className="flex justify-between items-center cursor-pointer mb-3"
                          onClick={() => toggleSection("voltage")}
                        >
                          <h3 className="font-medium">Voltage</h3>
                          {expandedSections.voltage ?
                            <ChevronUp className="h-4 w-4 text-gray-500" /> :
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          }
                        </div>
                        {expandedSections.voltage && (
                          <div className="space-y-3">
                            {["all", "12V", "24V"].map((volt) => (
                              <div key={volt} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`volt-${volt}`}
                                  name="volt"
                                  className="w-5 h-5 text-red-500 focus:ring-red-400"
                                  checked={filterVolt === volt}
                                  onChange={() => setFilterVolt(volt)}
                                />
                                <label htmlFor={`volt-${volt}`} className="ml-2 text-sm text-gray-700">
                                  {volt === "all" ? "All Volts" : volt}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Color Filter */}
                      <div className="p-4 border-b border-gray-100">
                        <div
                          className="flex justify-between items-center cursor-pointer mb-3"
                          onClick={() => toggleSection("color")}
                        >
                          <h3 className="font-medium">Color</h3>
                          {expandedSections.color ?
                            <ChevronUp className="h-4 w-4 text-gray-500" /> :
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          }
                        </div>
                        {expandedSections.color && (
                          <div className="flex flex-wrap gap-3">
                            <motion.button
                              onClick={() => setFilterColor("all")}
                              className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                filterColor === "all" ? "border-blue-500 scale-110" : "border-gray-200 hover:border-gray-400"
                              }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              title="All Colors"
                            >
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 via-green-500 to-blue-500"></div>
                              <span className="sr-only">All Colors</span>
                            </motion.button>
                            {uniqueColors.map((color) => (
                              <motion.button
                                key={color}
                                onClick={() => setFilterColor(color)}
                                className={`relative w-8 h-8 rounded-full border-2 transition-all group ${
                                  filterColor === color ? "border-blue-500 scale-110" : "border-gray-200 hover:border-gray-400"
                                }`}
                                style={{ backgroundColor: color }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-gray-50 text-sm text-gray-500">
                        Showing {filteredProducts.length} out of {products.length} products
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Clear All Button */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="h-10 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-700"
              >
                Clear All
              </button>
            )}
          </div>
          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filterVolt !== "all" && (
                <div className="flex items-center h-8 px-3 py-1 bg-gray-50 rounded-full gap-2">
                  <span className="text-sm font-medium">Voltage: {filterVolt}</span>
                  <button
                    onClick={() => setFilterVolt("all")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              {filterColor !== "all" && (
                <div className="flex items-center h-8 px-3 py-1 bg-gray-50 rounded-full gap-2">
                  <span className="text-sm font-medium">Color:</span>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: filterColor }}
                  ></div>
                  <button
                    onClick={() => setFilterColor("all")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Search Input */}
          <div className="w-full mt-3">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by name or part number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-9 pr-3 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 relative">
          {/* Products Count and Carousel Controls */}
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="text-sm sm:text-base text-gray-600">
              Showing {filteredProducts.length} out of {products.length} products
            </div>
            {totalCarousels > 1 && (
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={prevCarousel}
                  disabled={currentCarousel === 0}
                  className={`p-2 sm:p-3 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isMobile ? "text-2xl" : ""
                  }`}
                >
                  <ChevronLeft className={`${isMobile ? "h-6 w-6" : "h-5 w-5"}`} />
                </button>
                <div className="text-sm sm:text-base font-medium text-gray-700">
                  Page {currentCarousel + 1} of {totalCarousels}
                </div>
                <button
                  onClick={nextCarousel}
                  disabled={currentCarousel === totalCarousels - 1}
                  className={`p-2 sm:p-3 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isMobile ? "text-2xl" : ""
                  }`}
                >
                  <ChevronRight className={`${isMobile ? "h-6 w-6" : "h-5 w-5"}`} />
                </button>
              </div>
            )}
          </div>
          {/* Error State */}
          {fetchError && (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
              <div className="text-lg font-medium text-gray-700 mb-4">Failed to display products</div>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try again</span>
              </button>
            </div>
          )}
          {/* Loading Skeleton or Products Grid */}
          {!isLoaded ? (
            <motion.div
              variants={loadingContainer}
              initial="hidden"
              animate="show"
              className="space-y-4 sm:space-y-6"
            >
              {[...Array(rowsPerCarousel)].map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                  {[...Array(productsPerRow)].map((_, colIndex) => (
                    <motion.div
                      key={`loading-${rowIndex}-${colIndex}`}
                      variants={loadingItem}
                      className="bg-gray-100 rounded-lg overflow-hidden shadow-sm border"
                    >
                      <div className="flex flex-col h-full">
                        <div className="w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-gray-400 animate-spin"></div>
                        </div>
                        <div className="p-3 sm:p-4 flex-grow space-y-3">
                          <div className="h-6 w-3/4 bg-gradient-to-r from-gray-50 to-gray-100 rounded"></div>
                          <div className="space-y-2">
                            <div className="h-4 w-1/2 bg-gradient-to-r from-gray-50 to-gray-100 rounded"></div>
                            <div className="h-4 w-2/3 bg-gradient-to-r from-gray-50 to-gray-100 rounded"></div>
                            <div className="h-4 w-1/3 bg-gradient-to-r from-gray-50 to-gray-100 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          ) : !fetchError && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="space-y-4 sm:space-y-6"
            >
              {productRows.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                  {row.map((product) => (
                    <motion.div
                      key={product._id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="bg-white transition-all overflow-hidden shadow-sm group rounded-lg"
                    >
                      <div className="flex flex-col h-full">
                        {/* Product Image */}
                        <div className="relative w-full aspect-square bg-white flex items-center justify-center group">
                          <div className="absolute inset-0 overflow-hidden">
                            {product.image ? (
                              <img
                                src={`data:image/jpeg;base64,${product.image}`}
                                alt={product.name}
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                Image not available
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Product Details */}
                        <div className="p-3 sm:p-4 flex-grow flex flex-col">
                          <h3 className="text-sm sm:text-base font-bold text-red-600 mb-2 line-clamp-2 transition-colors">
                            {product.name}
                          </h3>
                          <div className="space-y-2 text-xs sm:text-sm mb-3">
                            <div className="flex items-center font-semibold text-gray-700">
                              <span className="mr-1">Part No:</span>
                              <span className="font-medium text-gray-800 truncate">{product.partNo}</span>
                            </div>
                            <div className="flex items-center font-semibold text-gray-700">
                              <span className="mr-1">Volt:</span>
                              <span className="font-medium text-gray-800">{product.volt}</span>
                            </div>
                            <div className="flex items-center font-semibold text-gray-700">
                              <span className="mr-1">Color:</span>
                              <div
                                className="w-8 h-4 rounded-full border border-gray-300 mr-1"
                                style={{ backgroundColor: product.color }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          )}
          {/* Carousel Pagination Dots */}
          {totalCarousels > 1 && !fetchError && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalCarousels }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCarousel(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentCarousel ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoatLEDLight;