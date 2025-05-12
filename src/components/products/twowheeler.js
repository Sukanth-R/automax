import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TwowheelerLight = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterVolt, setFilterVolt] = useState("all");
  const [filterColor, setFilterColor] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentCarousel, setCurrentCarousel] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowFilters(true);
      } else {
        setShowFilters(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile filters are open
  useEffect(() => {
    if (showFilters && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFilters, isMobile]);

  // Fetch products
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://translator-0dye.onrender.com/api/products");
        const data = await response.json();
        const filteredData = data.filter(
          (product) => product.category === "Two Wheeler Lights"
        );
        setProducts(filteredData);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Get unique colors from products
  const uniqueColors = [...new Set(products.map((product) => product.color))].filter(Boolean);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesVolt =
      filterVolt === "all" || product.volt.toLowerCase() === filterVolt.toLowerCase();
    const matchesColor = filterColor === "all" || product.color === filterColor;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.partNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesVolt && matchesColor && matchesSearch;
  });

  // Carousel logic
  const productsPerRow = isMobile ? 2 : 4;
  const rowsPerCarousel = 3;
  const productsPerCarousel = productsPerRow * rowsPerCarousel;
  const totalCarousels = Math.ceil(filteredProducts.length / productsPerCarousel);
  const currentProducts = filteredProducts.slice(
    currentCarousel * productsPerCarousel,
    (currentCarousel + 1) * productsPerCarousel
  );

  // Split current products into rows
  const productRows = [];
  for (let i = 0; i < currentProducts.length; i += productsPerRow) {
    productRows.push(currentProducts.slice(i, i + productsPerRow));
  }

  const nextCarousel = () => {
    setCurrentCarousel((prev) => Math.min(prev + 1, totalCarousels - 1));
  };

  const prevCarousel = () => {
    setCurrentCarousel((prev) => Math.max(prev - 1, 0));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const filterSidebarVariants = {
    hidden: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.5,
      transition: { duration: 0.2 },
    },
  };

  const containerWidthVariants = {
    expanded: {
      width: "75%",
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    collapsed: {
      width: "100%",
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full h-72 md:h-96 overflow-hidden"
      >
        <img
          src="https://t3.ftcdn.net/jpg/09/85/53/02/240_F_985530270_SgZsAuSMfXttrmIvPtbGU85hYBxygx6I.jpg"
          alt="Two Wheeler Lights Banner"
          className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-center justify-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-center px-4 drop-shadow-lg"
          >
            TWO WHEELER LIGHTS
          </motion.h1>
        </div>
      </motion.div>

      {/* Logo Section */}
      <section className="w-full bg-white px-6 lg:px-20 py-12 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8">
        <div className="flex-shrink-0 w-32 sm:w-40 md:w-48 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
        <div className="w-full sm:w-auto flex justify-center">
          <h3
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-extrabold text-red-700"
            style={{ fontFamily: "Georgia, sans-serif", fontStyle: "italic" }}
          >
            ASTRA
          </h3>
        </div>
      </section>

      {/* Navigation and Description Section */}
      <section className="w-full bg-white px-4 sm:px-6 lg:px-20 py-6 sm:py-8">
        <div className="max-w-8xl mx-auto flex flex-col sm:flex-row items-start gap-4 sm:gap-8">
          {/* Navigation Breadcrumb - Left Side */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="text-lg font-medium">Home</span>
            </button>
            <span className="text-lg text-gray-500">/ Two Wheeler Lights</span>
          </div>

          {/* Description - Right Side */}
          <div className="flex-1 text-base sm:text-lg text-gray-700">
            Astra Two Wheeler Lights are designed specifically for motorcycles and scooters,
            offering superior visibility and safety. These durable lights are built to withstand
            the vibrations and weather conditions of two-wheeler use while providing optimal
            illumination for night riding.
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 bg-white relative">
        {/* Filter and Search Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg w-fit"
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">
              {showFilters ? "Hide Filters" : "Show Filters"}
            </span>
          </motion.button>

          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by name or part number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 relative">
          {/* Filters Sidebar */}
          <AnimatePresence mode="wait">
            {showFilters && (
              <>
                <motion.div
                  key="sidebar"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={filterSidebarVariants}
                  className="fixed lg:relative z-50 lg:z-auto inset-y-0 left-0 w-72 sm:w-80 lg:w-1/4 bg-white p-4 sm:p-6 shadow-lg lg:shadow-none overflow-y-auto h-screen lg:h-auto"
                >
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-bold">Filters</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-gray-500 hover:text-gray-700 lg:hidden p-1"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Voltage Filter */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="font-semibold mb-2 sm:mb-3">Voltage</h3>
                    <div className="space-y-4 sm:space-y-6">
                      {["all", "12V", "24V"].map((volt) => (
                        <div key={volt} className="flex items-center">
                          <input
                            type="radio"
                            id={`${volt}-filter`}
                            name="volt"
                            className="mr-2 h-5 w-5 sm:h-6 sm:w-6"
                            checked={filterVolt === volt}
                            onChange={() => setFilterVolt(volt)}
                          />
                          <label htmlFor={`${volt}-filter`} className="text-sm sm:text-base">
                            {volt === "all" ? "All Volts" : volt}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Color Filter */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="font-semibold mb-2 sm:mb-3">Color</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {/* All Colors Button */}
                      <motion.button
                        onClick={() => setFilterColor("all")}
                        className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          filterColor === "all"
                            ? "border-blue-500 scale-110"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title="All Colors"
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-red-500 via-green-500 to-blue-500"></div>
                        <span className="sr-only">All Colors</span>
                      </motion.button>

                      {/* Color Buttons */}
                      {uniqueColors.map((color) => (
                        <motion.button
                          key={color}
                          onClick={() => setFilterColor(color)}
                          className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all group ${
                            filterColor === color
                              ? "border-blue-500 scale-110"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                          style={{ backgroundColor: color }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
                    Showing {filteredProducts.length} out of {products.length} products
                  </p>
                </motion.div>

                {/* Overlay for mobile/tablet */}
                <motion.div
                  key="overlay"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={overlayVariants}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={() => setShowFilters(false)}
                />
              </>
            )}
          </AnimatePresence>

          {/* Products List */}
          <motion.div
            variants={containerWidthVariants}
            animate={showFilters ? "expanded" : "collapsed"}
            className="w-full"
          >
            {/* Products Count and Carousel Controls */}
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div className="text-sm sm:text-base text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
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
                      className="bg-white rounded-lg transition-all overflow-hidden"
                    >
                      <div className="flex flex-col h-full">
                        {/* Product Image */}
                        <div className="w-full h-40 sm:h-48 bg-white flex items-center justify-center">
                          {product.image ? (
                            <img
                              src={`data:image/jpeg;base64,${product.image}`}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                              Image not available
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="p-3 sm:p-4 flex-grow">
                          <h3 className="text-sm sm:text-base font-semibold mb-2 line-clamp-2">
                            {product.name}
                          </h3>

                          {/* Quick Details */}
                          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                            <div>
                              <p className="text-gray-600">Part No:</p>
                              <p className="font-medium">{product.partNo}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Voltage:</p>
                              <p className="font-medium">{product.volt}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Color:</p>
                              <div className="flex items-center gap-1 mt-1">
                                <div
                                  className="w-4 h-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: product.color }}
                                />
                              </div>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                <span className="font-medium">Stock:</span>{" "}
                                <span
                                  className={`${
                                    product.stock === "available" ? "text-green-600" : "text-red-600"
                                  } font-semibold`}
                                >
                                  {product.stock === "available" ? "Available" : "Out of Stock"}
                                </span>
                              </p>
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
              <div className="flex justify-center mt-4 sm:mt-6 gap-2">
                {Array.from({ length: totalCarousels }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCarousel(index)}
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                      index === currentCarousel ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TwowheelerLight;