import { useState, useEffect, useRef } from "react";

function HomePage() {
  // Image carousel data with descriptions
  const carouselItems = [
    {
      image: "https://sparkledlights.in/img/carousel-1.png",
      title: "Premium Lighting Solutions",
      description: "Discover our high-quality lighting products that illuminate your space with elegance and efficiency. Perfect for both indoor and outdoor use.",
      gradient: "bg-gradient-to-r from-white to-red-100"
    },
    {
      image: "https://t3.ftcdn.net/jpg/09/85/53/02/240_F_985530270_SgZsAuSMfXttrmIvPtbGU85hYBxygx6I.jpg",
      title: "Latest Collection 2023",
      description: "Explore our newest arrivals featuring innovative designs and cutting-edge technology for modern lighting needs.",
      gradient: "bg-gradient-to-r from-blue-100 to-white"
    },
    {
      image: "https://sparkledlights.in/img/carousel-1.png",
      title: "Energy Efficient Options",
      description: "Save energy and reduce costs with our eco-friendly lighting solutions that don't compromise on brightness or style.",
      gradient: "bg-gradient-to-r from-white to-green-100"
    },
  ];

  // New arrivals data
  const newArrivals = [
    { id: 1, image: "https://sparkledlights.in/img/slider/swift.png", name: "Product 1" },
    { id: 2, image: "https://sparkledlights.in/img/slider/11.png", name: "Product 2" },
    { id: 3, image: "https://sparkledlights.in/img/slider/volvo-type-1.png", name: "Product 3" },
    { id: 4, image: "https://sparkledlights.in/img/slider/volvo-type2-b.png", name: "Product 4" },
    { id: 5, image: "https://sparkledlights.in/img/slider/1.png", name: "Product 5" },
    { id: 6, image: "https://sparkledlights.in/img/slider/222.png", name: "Product 6" },
  ];

  // Grid layout data
  const gridItems = [
    {
      id: 1,
      title: "Home Solutions",
      description: "Bring alive the vision of your perfect home and explore an array of options that suit every budget and need.",
      mobileImg: "https://www.magiklights.com/images/home-solutions-m.jpg",
      desktopImg: "https://www.magiklights.com/images/home-solutions.jpg"
    },
    {
      id: 2,
      title: "Office Solutions",
      description: "Make your office's environment brighter and more productive with LEDs that give the right illumination for a workplace.",
      mobileImg: "https://www.magiklights.com/images/office-solutions-m.jpg",
      desktopImg: "https://www.magiklights.com/images/office-solutions.jpg"
    },
    {
      id: 3,
      title: "Outdoor Solutions",
      description: "Illuminate your outdoor with durable and weatherproof lighting solutions that create a unique and defining look.",
      mobileImg: "https://www.magiklights.com/images/outdoor-solutions-m.jpg",
      desktopImg: "https://www.magiklights.com/images/outdoor-solutions.jpg"
    },
    {
      id: 4,
      title: "Industry Solutions",
      description: "Build a smarter industry with lighting that saves energy, reduces costs and stimulates economic development.",
      mobileImg: "https://www.magiklights.com/images/industry-solutions-m.jpg",
      desktopImg: "https://www.magiklights.com/images/industry-solutions.jpg"
    },
    {
      id: 5,
      title: "Hospitality Solutions",
      description: "Meet the functional and aesthetic needs of your space and make your guests feel at home with energy-efficient solutions that accentuate every decor.",
      mobileImg: "https://www.magiklights.com/images/hospitality-solutions-m.jpg",
      desktopImg: "https://www.magiklights.com/images/hospitality-solutions.jpg"
    },
    {
      id: 6,
      title: "Retail Solutions",
      description: "Create a strong brand identity with lighting that makes up a memorable experience for every customer.",
      mobileImg: "https://www.magiklights.com/images/retail-solutions-m.jpg",
      desktopImg: "https://www.magiklights.com/images/retail-solutions.jpg"
    },
  ];

  // About Automax features carousel data
  const aboutFeatures = [
    { id: 1, icon: "https://www.magiklights.com/images/2-year.png", title: "2 YEAR WARRANTY" },
    { id: 2, icon: "https://www.magiklights.com/images/consumer.png", title: "CONSUMER SAFETY" },
    { id: 3, icon: "https://www.magiklights.com/images/pre-tested.png", title: "PRE-TESTED LUMEN" },
    { id: 4, icon: "https://www.magiklights.com/images/consumer.png", title: "CONSUMER SAFETY" },
    { id: 5, icon: "https://www.magiklights.com/images/consumer.png", title: "CONSUMER SAFETY" },
    { id: 6, icon: "https://www.magiklights.com/images/consumer.png", title: "CONSUMER SAFETY" },
  ];

  // State for carousels
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [visibleFeatures, setVisibleFeatures] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);
  const productCarouselRef = useRef(null);
  const featureCarouselRef = useRef(null);

  // Handle window resize for responsive product and feature display
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleProducts(1);
        setVisibleFeatures(1);
      } else if (window.innerWidth < 1024) {
        setVisibleProducts(2);
        setVisibleFeatures(2);
      } else {
        setVisibleProducts(4);
        setVisibleFeatures(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Combined auto-advance for all carousels
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
      nextProduct();
      nextFeature();
    }, 5000);
    return () => clearInterval(interval);
  });

  // Carousel navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const nextProduct = () => {
    setCurrentProductIndex((prev) =>
      (prev + 1) % (newArrivals.length - visibleProducts + 1)
    );
  };

  const prevProduct = () => {
    setCurrentProductIndex((prev) =>
      prev === 0 ? newArrivals.length - visibleProducts : prev - 1
    );
  };

  const nextFeature = () => {
    setCurrentFeatureIndex((prev) =>
      (prev + 1) % (aboutFeatures.length - visibleFeatures + 1)
    );
  };

  const prevFeature = () => {
    setCurrentFeatureIndex((prev) =>
      prev === 0 ? aboutFeatures.length - visibleFeatures : prev - 1
    );
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextImage();
    }
    if (touchStart - touchEnd < -50) {
      prevImage();
    }
  };

  const handleProductTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleProductTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleProductTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextProduct();
    }
    if (touchStart - touchEnd < -50) {
      prevProduct();
    }
  };

  const handleFeatureTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleFeatureTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleFeatureTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextFeature();
    }
    if (touchStart - touchEnd < -50) {
      prevFeature();
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
      {/* About Automax Section */}
      <section
        className="w-full px-4 sm:px-6 lg:px-20 py-12 text-black relative"
        style={{
          backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/038/989/885/small_2x/ai-generated-colorful-lights-shining-brightly-in-the-dark-photo.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl font-bold mb-1 text-red-600">AUTOMAX</h2>
              <p className="text-sm uppercase text-white mb-2">MANUFACTURING | MARKETING</p>
              <div className="w-16 h-1 bg-orange-400 mb-6"></div>
            </div>
            <div className="lg:w-2/3">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
                LED LIGHTS ARE THE LATEST CHOICE FOR SMART AND SUSTAINABLE FUNCTIONING.
              </h3>
              <p className="text-sm sm:text-base mb-6 text-white">
                With LED being the new technology, LED lights are now available in a wide range to suit your home as well as the outdoor needs. Explore how Automax enhances the power of LED lights that illuminate your world with its smart solutions, the solutions empowered with innovative thinking.
              </p>
              <div className="relative overflow-hidden">
                <div
                  ref={featureCarouselRef}
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${currentFeatureIndex * (100 / visibleFeatures)}%)`,
                  }}
                  onTouchStart={handleFeatureTouchStart}
                  onTouchMove={handleFeatureTouchMove}
                  onTouchEnd={handleFeatureTouchEnd}
                >
                  {aboutFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex-shrink-0 p-2 sm:p-4 transition-all duration-300"
                      style={{ width: `${100 / visibleFeatures}%` }}
                    >
                      <div className="bg-white rounded-lg p-4 flex items-center justify-center space-x-4">
                        <img
                          src={feature.icon}
                          alt={feature.title}
                          className="w-12 h-12 object-contain"
                          loading="lazy"
                        />
                        <div className="text-gray-900 text-center">
                          <p className="font-semibold">{feature.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={prevFeature}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-800 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition flex items-center justify-center"
                >
                  ◀
                </button>
                <button
                  onClick={nextFeature}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-800 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition flex items-center justify-center"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <div className="product w-full px-4 sm:px-6 lg:px-20 py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto">
          <div className="product-left flex flex-col items-start justify-center p-6 bg-gray-50 mb-8">
            <div className="heading text-3xl sm:text-4xl font-extrabold text-red-600" style={{ fontFamily: "Georgia, sans-serif", fontStyle: "italic" }}>
              <div className="relative flex items-center">
                <img
                  src="https://sukanth-r.github.io/automax/images/logo.png"
                  alt="ASTRA Logo"
                  className="w-16 h-16 object-contain mr-1"
                  loading="lazy"
                />
                ASTRA
              </div>
            </div>
            <div className="text-lg sm:text-xl text-gray-900 mt-1">
              SOLUTIONS
            </div>
            <div className="w-16 h-1 bg-gray-900"></div>
          </div>
          <div className="product-right mt-6 sm:mt-0">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridItems.map((item) => (
                <li key={item.id} className="show-responsive">
                  <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 bg-white border border-red-100 hover:border-red-300">
                    <img
                      src={window.innerWidth < 640 ? item.mobileImg : item.desktopImg}
                      alt={item.title}
                      className="w-full h-56 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-600 to-transparent text-white text-center py-3 font-bold text-lg capitalize">
                      {item.title}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                      <div className="mask-inner text-center text-white p-6">
                        <h2 className="text-xl font-bold mb-3 capitalize">{item.title}</h2>
                        <p className="text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="clear"></div>
        </div>
      </div>

      {/* Main Image Carousel with Description */}
      <section className="w-full py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-8">
          Highlights
        </h2>
        <div className="w-full h-[350px] md:h-[450px] lg:h-[500px] relative overflow-hidden">
          <div
            ref={carouselRef}
            className="w-full h-full flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className={`w-full flex-shrink-0 h-full flex flex-col md:flex-row ${item.gradient}`}
              >
                {index % 2 === 0 ? (
                  <>
                    <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4">
                      <div className="bg-opacity-80 rounded-lg p-4 w-full h-full flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-6 md:p-12">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600 mb-4">
                        {item.title}
                      </h2>
                      <p className="text-gray-700 text-sm md:text-base lg:text-lg mb-6">
                        {item.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-6 md:p-12 order-2 md:order-1">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-4">
                        {item.title}
                      </h2>
                      <p className="text-gray-700 text-sm md:text-base lg:text-lg mb-6">
                        {item.description}
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4 order-1 md:order-2">
                      <div className="bg-opacity-80 rounded-lg p-4 w-full h-full flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-[64px] h-2 rounded-full transition ${
                  index === currentImageIndex
                    ? "bg-red-600 w-6"
                    : "bg-black bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="w-full px-4 lg:px-20 py-12 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-8">
          New Arrivals
        </h2>
        <div className="relative overflow-hidden px-8">
          <div
            ref={productCarouselRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentProductIndex * (100 / visibleProducts)}%)`,
            }}
            onTouchStart={handleProductTouchStart}
            onTouchMove={handleProductTouchMove}
            onTouchEnd={handleProductTouchEnd}
          >
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className={`flex-shrink-0 p-2 md:p-4 transition-all duration-300`}
                style={{ width: `${100 / visibleProducts}%` }}
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 h-full flex flex-col border border-red-100 hover:border-red-200">
                  <div className="flex-grow flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-auto max-h-48 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-lg font-semibold text-red-600 mt-4 text-center">
                    {product.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={prevProduct}
          className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center justify-center text-xl shadow-lg hover:shadow-xl"
        >
          ◀
        </button>
        <button
          onClick={nextProduct}
          className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center justify-center text-xl shadow-lg hover:shadow-xl"
        >
          ▶
        </button>
      </section>

    </div>
  );
}

export default HomePage;