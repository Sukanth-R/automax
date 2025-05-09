import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronLeft, ChevronRight, Search, Home, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WaterproofLEDLight = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterVolt, setFilterVolt] = useState("all");
  const [filterColor, setFilterColor] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentCarousel, setCurrentCarousel] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Change from single string to an object to track multiple expanded sections
  const [expandedSections, setExpandedSections] = useState({
    voltage: true,
    color: true
  });
  
  const filterDropdownRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicking outside
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

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data.filter(p => p.category === "Water Proof LED Lights"));
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  // Filter and display logic
  const uniqueColors = [...new Set(products.map(p => p.color))].filter(Boolean);
  const filteredProducts = products.filter(p => 
    (filterVolt === "all" || p.volt.toLowerCase() === filterVolt.toLowerCase()) &&
    (filterColor === "all" || p.color === filterColor) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     p.partNo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Carousel logic
  const productsPerRow = isMobile ? 2 : 4;
  const rowsPerCarousel = 3;
  const productsPerCarousel = productsPerRow * rowsPerCarousel;
  const totalCarousels = Math.ceil(filteredProducts.length / productsPerCarousel);
  const currentProducts = filteredProducts.slice(
    currentCarousel * productsPerCarousel,
    (currentCarousel + 1) * productsPerCarousel
  );

  // Split into rows
  const productRows = [];
  for (let i = 0; i < currentProducts.length; i += productsPerRow) {
    productRows.push(currentProducts.slice(i, i + productsPerRow));
  }

  const nextCarousel = () => {
    setCurrentCarousel(prev => Math.min(prev + 1, totalCarousels - 1));
  };

  const prevCarousel = () => {
    setCurrentCarousel(prev => Math.max(prev - 1, 0));
  };

  // Toggle filter section expansion - modified to handle multiple sections
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilterVolt("all");
    setFilterColor("all");
    setSearchTerm("");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  // Check if any filters are active
  const hasActiveFilters = filterVolt !== "all" || filterColor !== "all";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-20 py-12 text-black bg-gray-300">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-red-600">AUTOMAX</h2>
              <p className="text-sm uppercase text-gray-800 mb-2">MANUFACTURING | MARKETING </p>
              <div className="w-16 h-1 bg-orange-400 mb-6"></div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate('/')} 
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span className="text-lg font-medium">Home</span>
                </button>
                <span className="text-lg text-gray-500">/ WATERPROOF LED LIGHTS</span>
              </div>
            </div>
            <div className="lg:w-2/3">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                WATERPROOF LED LIGHTS
              </h3>
              <p className="text-sm sm:text-base mb-6">
                Astra Waterproof LED Lights combine durability with modern lighting solutions. Perfect for outdoor spaces, bathrooms, or kitchens, they provide reliable illumination while withstanding moisture and harsh conditions. Explore our collection to find waterproof LED lights that meet your needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 bg-white relative">
        {/* Filter Bar - Redesigned for mobile */}
        <div className="flex flex-col gap-3 mb-4 sm:mb-6 px-2 py-2 border-b border-gray-100">
          {/* Top Row: Filter dropdown and Clear All button on same line */}
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
              
              {/* Filter Dropdown Menu */}
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
            
            {/* Clear All Button - always in the same row as Filters */}
            {hasActiveFilters && (
              <button 
                onClick={clearAllFilters}
                className="h-10 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-700"
              >
                Clear All
              </button>
            )}
          </div>
          
          {/* Second Row: Active Filter Tags - Only visible when filters are active */}
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
          
          {/* Third Row: Search Input - moved below chosen filters */}
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

          {/* Products Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="space-y-4 sm:space-y-6"
          >
            {productRows.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {row.map((product) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    className="bg-white rounded-lg transition-all overflow-hidden shadow-sm hover:shadow-md"
                  >
                    <div className="flex flex-col h-full">
                      {/* Product Image */}
                      <div className="w-full h-40 sm:h-48 bg-gray-50 flex items-center justify-center">
                        {product.image ? (
                          <img
                            src={`data:image/jpeg;base64,${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-contain p-4"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            Image not available
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="p-3 sm:p-4 flex-grow">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                          {product.name}
                        </h3>

                        <div className="space-y-1 text-sm">
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">Part No:</span>
                            <span className="font-medium text-gray-700 truncate">{product.partNo}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">Volt:</span>
                            <span className="font-medium text-gray-700">{product.volt}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">Color:</span>
                            <div
                              className="w-4 h-4 rounded-full border border-gray-300"
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

          {/* Carousel Pagination Dots */}
          {totalCarousels > 1 && (
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

export default WaterproofLEDLight;