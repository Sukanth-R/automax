import { useState, useEffect } from "react";

export default function HomePage() {
  const images = [
    "https://sparkledlights.in/img/carousel-1.png",
    "data:image/jpeg;base64,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",
    "https://sparkledlights.in/img/carousel-1.png",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // New Arrivals Data
  const newArrivals = [
    {
      id: 1,
      image: "https://sparkledlights.in/img/slider/swift.png",
      name: "Product 1",
    },
    {
      id: 2,
      image: "https://sparkledlights.in/img/slider/11.png",
      name: "Product 2",
    },
    {
      id: 3,
      image: "https://sparkledlights.in/img/slider/volvo-type-1.png",
      name: "Product 3",
    },
    {
      id: 4,
      image: "https://sparkledlights.in/img/slider/volvo-type2-b.png",
      name: "Product 4",
    },
    {
      id: 5,
      image: "https://sparkledlights.in/img/slider/1.png",
      name: "Product 5",
    },
    {
      id: 6,
      image: "https://sparkledlights.in/img/slider/222.png",
      name: "Product 6",
    },
  ];

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(4); // Default number of visible products

  // Update the number of visible products based on screen size
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleProducts(1); // 1 product for mobile
      } else if (window.innerWidth < 1024) {
        setVisibleProducts(2); // 2 products for tablets
      } else {
        setVisibleProducts(4); // 4 products for desktop
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Image carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  });

  // Automatic New Arrivals carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextProduct();
    }, 5000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }); // Re-run effect when currentProductIndex or visibleProducts changes

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      (prevIndex + 1) % (newArrivals.length - visibleProducts + 1)
    );
  };

  const prevProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? newArrivals.length - visibleProducts : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
      {/* Image Carousel */}
      <div className="w-full relative overflow-hidden bg-blue-50 shadow-xl">
        <div className="w-full" style={{ paddingTop: "56.25%" }}>
          {" "}
          {/* 16:9 Aspect Ratio */}
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={prevImage}
          className="absolute left-4 md:left-10 w-12 h-12 md:w-14 md:h-14 bg-gray-800 bg-opacity-30 text-white rounded-full hover:bg-opacity-80 transition flex items-center justify-center text-2xl shadow-lg hover:shadow-xl"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          ◀
        </button>

        {/* Next Button */}
        <button
          onClick={nextImage}
          className="absolute right-4 md:right-10 w-12 h-12 md:w-14 md:h-14 bg-gray-800 bg-opacity-30 text-white rounded-full hover:bg-opacity-80 transition flex items-center justify-center text-2xl shadow-lg hover:shadow-xl"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          ▶
        </button>
      </div>

      {/* Image with Text Section */}
      <section className="w-full px-6 lg:px-20 py-12 flex flex-col md:flex-row items-center justify-center">         
  <div className="flex-shrink-0 w-48 flex justify-center">           
    <img             
      src="/images/logo.png"             
      alt="Logo"             
      className="w-48 h-48 object-contain rounded-lg"           
    />         
  </div>         
  <div className="w-[350px] mb-4  flex justify-center">           
    <h3 className="text-[70px] md:text-[100px] font-extrabold text-red-700" style={{ fontFamily: 'Georgia, sans-serif' ,fontStyle:'italic'}}>             
      ASTRA           
    </h3>         
  </div>       
</section>


      {/* New Arrivals Section */}
      <section className="w-full px-6 lg:px-20 py-12 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-[#133E87] text-center mb-8">
          New Arrivals
        </h2>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentProductIndex * (100 / visibleProducts)}%)`,
            }}
          >
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className={`flex-shrink-0 p-4`}
                style={{ width: `${100 / visibleProducts}%` }}
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 transform hover:scale-105">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain rounded-t-lg"
                  />
                  <p className="text-lg font-semibold text-[#608BC1] mt-2 text-center">
                    {product.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Button for New Arrivals */}
        <button
          onClick={prevProduct}
          className="absolute left-2 md:left-5 w-12 h-12 md:w-14 md:h-14 bg-gray-800 bg-opacity-30 text-white rounded-full hover:bg-opacity-80 transition flex items-center justify-center text-2xl shadow-lg hover:shadow-xl"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          ◀
        </button>

        {/* Next Button for New Arrivals */}
        <button
          onClick={nextProduct}
          className="absolute right-2 md:right-5 w-12 h-12 md:w-14 md:h-14 bg-gray-800 bg-opacity-30 text-white rounded-full hover:bg-opacity-80 transition flex items-center justify-center text-2xl shadow-lg hover:shadow-xl"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          ▶
        </button>
      </section>
    </div>
  );
}