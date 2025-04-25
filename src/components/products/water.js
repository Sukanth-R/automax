import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronLeft, ChevronRight, Home, Languages } from 'lucide-react';
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
  const [translationError, setTranslationError] = useState(null);
  
  // Translation states
  const [sourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("en");
  const [originalText] = useState({
    title: "WATERPROOF LED LIGHTS",
    description: "Astra Waterproof LED Lights combine durability with modern lighting solutions. Perfect for outdoor spaces, bathrooms, or kitchens, they provide reliable illumination while withstanding moisture and harsh conditions. Explore our collection to find waterproof LED lights that meet your needs.",
    filtersTitle: "Filters",
    voltageTitle: "Voltage",
    colorTitle: "Color",
    allVolts: "All Volts",
    allColors: "All Colors",
    showingText: "Showing {count} out of {total} products",
    searchPlaceholder: "Search by name or part number...",
    showFilters: "Show Filters",
    hideFilters: "Hide Filters",
    pageText: "Page {current} of {total}",
    partNoText: "Part No:",
    voltText: "Volt:",
    colorText: "Color:",
    homeText: "Home"
  });
  const [translatedText, setTranslatedText] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationCache, setTranslationCache] = useState({});

  // Check if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setShowFilters(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile filters are open
  useEffect(() => {
    document.body.style.overflow = showFilters && isMobile ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showFilters, isMobile]);

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

  // Safe text handling with replacements
  const getText = (key, replacements = {}) => {
    try {
      let text = String(translatedText[key] || originalText[key] || "");
      Object.entries(replacements).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
      return text;
    } catch (error) {
      console.error("Text processing error:", error);
      return "";
    }
  };

  // Translation handler with timeout
  const handleTranslate = useCallback(async () => {
    // Don't proceed if already translating or target is English
    if (isTranslating || targetLang === "en") {
      if (targetLang === "en") {
        setTranslatedText({});
        setTranslationError(null);
      }
      return;
    }
  
    setIsTranslating(true);
    setTranslationError(null);
    
    // Create new AbortController for this request
    const controller = new AbortController();
    const timeoutDuration = 15000; // 15 seconds timeout
    
    // Set timeout to abort the request
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeoutDuration);
  
    try {
      const newTranslatedText = {};
      const textsToTranslate = [];
      const newCache = { ...translationCache };
      
      // Prepare texts to translate (only uncached)
      Object.entries(originalText).forEach(([key, text]) => {
        const cacheKey = `${targetLang}-${key}`;
        if (translationCache[cacheKey]) {
          newTranslatedText[key] = translationCache[cacheKey];
        } else {
          textsToTranslate.push({ key, text: String(text) });
        }
      });
  
      // Only make API call if there are texts to translate
      if (textsToTranslate.length > 0) {
        const response = await fetch("https://translator-0dye.onrender.com/translate/batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            texts: textsToTranslate.map(t => t.text),
            from: sourceLang,
            to: targetLang,
          }),
          signal: controller.signal
        });
  
        // Handle HTTP errors
        if (!response.ok) {
          throw new Error(`Translation failed: ${response.statusText}`);
        }
  
        const data = await response.json();
        
        // Handle API errors
        if (!data.success) {
          throw new Error(data.error || "Translation service error");
        }
  
        // Process successful translation
        data.translatedTexts.forEach((translated, i) => {
          const { key } = textsToTranslate[i];
          const cacheKey = `${targetLang}-${key}`;
          const safeText = String(translated || textsToTranslate[i].text);
          newTranslatedText[key] = safeText;
          newCache[cacheKey] = safeText;
        });
  
        setTranslationCache(newCache);
      }
  
      setTranslatedText(newTranslatedText);
    } catch (error) {
      console.error("Translation error:", error);
      
      // Differentiate between timeout and other errors
      if (error.name === 'AbortError') {
        setTranslationError("Translation took too long. Please try again.");
      } else {
        setTranslationError(error.message || "Translation failed. Please try again later.");
      }
    } finally {
      clearTimeout(timeoutId);
      setIsTranslating(false);
    }
  }, [targetLang, sourceLang, originalText, translationCache, isTranslating]);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  const filterSidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden"
      >
        <img
          src="https://t3.ftcdn.net/jpg/09/85/53/02/240_F_985530270_SgZsAuSMfXttrmIvPtbGU85hYBxygx6I.jpg"
          alt="Waterproof LED Lights Banner"
          className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-center justify-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-center px-4 drop-shadow-lg"
          >
            {getText("title")}
          </motion.h1>
        </div>
      </motion.div>

      {/* Logo and Translation Section */}
      <div className="w-full bg-white">
        <section className="px-6 lg:px-20 py-8 sm:py-12 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex-shrink-0 w-32 sm:w-40 md:w-48 flex justify-center">
            <img src="/images/logo.png" alt="Logo" className="w-full h-auto object-contain rounded-lg" />
          </div>
          <div className="w-full sm:w-auto flex justify-center">
            <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-extrabold text-red-700" style={{ fontFamily: "Georgia, sans-serif", fontStyle: "italic" }}>
              ASTRA
            </h3>
          </div>
        </section>

        {/* Translation Controls */}
        <div className="w-full px-6 pb-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md text-sm"
              disabled={isTranslating}
            >
              <option value="en">English</option>
              <option value="ta">Tamil</option>
              <option value="hi">Hindi</option>
              <option value="kn">Kannada</option>
              <option value="te">Telugu</option>
              <option value="ml">Malayalam</option>
            </select>
            
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition flex items-center justify-center gap-2 text-sm relative min-w-[100px]"
            >
              {isTranslating ? (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  />
                </motion.div>
              ) : (
                <>
                  <Languages className="h-4 w-4" />
                  <span>Translate</span>
                </>
              )}
            </button>
          </div>
          
          {translationError && (
            <p className="text-red-500 text-sm">{translationError}</p>
          )}
        </div>
      </div>

      {/* Navigation and Description Section */}
      <section className="w-full bg-white px-4 sm:px-6 lg:px-20 py-6 sm:py-8">
        <div className="max-w-8xl mx-auto flex flex-col sm:flex-row items-start gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="text-lg font-medium">{getText("homeText")}</span>
            </button>
            <span className="text-lg text-gray-500">/ {getText("title")}</span>
          </div>

          <div className="flex-1 text-base sm:text-lg text-gray-700">
            {getText("description")}
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
              {showFilters ? getText("hideFilters") : getText("showFilters")}
            </span>
          </motion.button>

          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder={getText("searchPlaceholder")}
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
                    <h2 className="text-lg sm:text-xl font-bold">{getText("filtersTitle")}</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-gray-500 hover:text-gray-700 lg:hidden p-1"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Voltage Filter */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="font-semibold mb-2 sm:mb-3">{getText("voltageTitle")}</h3>
                    <div className="space-y-4 sm:space-y-6">
                      {["all", "12V", "24V"].map((volt) => (
                        <div key={volt} className="flex items-center">
                          <input
                            type="radio"
                            id={`volt-${volt}`}
                            name="volt"
                            className="mr-2 h-5 w-5 sm:h-6 sm:w-6"
                            checked={filterVolt === volt}
                            onChange={() => setFilterVolt(volt)}
                          />
                          <label htmlFor={`volt-${volt}`} className="text-sm sm:text-base">
                            {volt === "all" ? getText("allVolts") : volt}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Color Filter */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="font-semibold mb-2 sm:mb-3">{getText("colorTitle")}</h3>
                    <div className="flex flex-wrap gap-4 sm:gap-3">
                      <motion.button
                        onClick={() => setFilterColor("all")}
                        className={`relative w-9 h-9 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          filterColor === "all" ? "border-blue-500 scale-110" : "border-gray-200 hover:border-gray-400"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={getText("allColors")}
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-red-500 via-green-500 to-blue-500"></div>
                        <span className="sr-only">{getText("allColors")}</span>
                      </motion.button>

                      {uniqueColors.map((color) => (
                        <motion.button
                          key={color}
                          onClick={() => setFilterColor(color)}
                          className={`relative w-9 h-9 sm:w-8 sm:h-8 rounded-full border-2 transition-all group ${
                            filterColor === color ? "border-blue-500 scale-110" : "border-gray-200 hover:border-gray-400"
                          }`}
                          style={{ backgroundColor: color }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
                    {getText("showingText", { 
                      count: filteredProducts.length, 
                      total: products.length 
                    })}
                  </p>
                </motion.div>

                {/* Overlay for mobile */}
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
            className="w-full"
            animate={showFilters ? { width: "75%" } : { width: "100%" }}
            transition={{ duration: 0.3 }}
          >
            {/* Products Count and Carousel Controls */}
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div className="text-sm sm:text-base text-gray-600">
                {getText("showingText", { 
                  count: filteredProducts.length, 
                  total: products.length 
                })}
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
                    {getText("pageText", {
                      current: currentCarousel + 1,
                      total: totalCarousels
                    })}
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
                              <span className="text-gray-500 mr-2">{getText("partNoText")}</span>
                              <span className="font-medium text-gray-700 truncate">{product.partNo}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-500 mr-2">{getText("voltText")}</span>
                              <span className="font-medium text-gray-700">{product.volt}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-500 mr-2">{getText("colorText")}</span>
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
          </motion.div>
        </div>
      </div>

      {/* Full-page loading overlay */}
      <AnimatePresence>
        {isTranslating && (
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WaterproofLEDLight;