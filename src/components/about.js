import { motion, useAnimationControls } from "framer-motion";
import { Award, Users, Clock, Home} from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  // Sample gallery content (replace with your actual video and images)

  // Sample achievements content (replace with your actual achievements)
  

  // Animation controls for marquee
  const controls = useAnimationControls();

  // Start marquee animation
  useEffect(() => {
    controls.start({
      x: "-50%", // For doubled list
      transition: {
        x: { repeat: Infinity, repeatType: "loop", duration: 12, ease: "linear" },
      },
    });
  }, [controls]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle hover pause/resume
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col">
      {/* Banner with Header and Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-96 md:h-120 overflow-hidden"
        style={{
          backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/038/989/885/small_2x/ai-generated-colorful-lights-shining-brightly-in-the-dark-photo.jpeg')`, // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        {/* Header Section */}
        <div className="relative z-10 top-0 left-0 w-full px-4 md:px-6 lg:px-20 py-6">
          <div className="flex flex-col">
            {/* Automax Info and Breadcrumb */}
            <div className="mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-red-600">AUTOMAX</h2>
              <p className="text-sm uppercase text-gray-200 mb-2">MANUFACTURING | MARKETING</p>
              <div className="w-16 h-1 bg-orange-400 mb-2"></div>
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1 focus:outline-none"
                  onClick={() => navigate("/")}
                  style={{ background: "none", border: "none", padding: 0, margin: 0, cursor: "pointer" }}
                >
                  <Home className="h-5 w-5 text-gray-200" />
                  <span className="text-lg text-gray-200">Home</span>
                </button>
                <span className="text-lg text-gray-300">/ ABOUT US</span>
              </div>
            </div>
          </div>
        </div>

        {/* Three Cards in Banner */}
        <div className="relative z-10 inset-x-0 bottom-[60px] mt-[70px] flex justify-center space-x-2 px-4 pb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-red-600 text-white p-4 rounded-lg shadow-md w-1/3 min-w-[120px] flex flex-col items-center text-center"
          >
            <Clock className="w-8 h-8 mb-2" />
            <h4 className="text-sm font-bold">25 Years Experience</h4>
            <p className="text-xs">Excellence in quality and performance.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-red-600 text-white p-4 rounded-lg shadow-md w-1/3 min-w-[120px] flex flex-col items-center text-center"
          >
            <Award className="w-8 h-8 mb-2" />
            <h4 className="text-sm font-bold">Award Winning</h4>
            <p className="text-xs">Setting industry standards.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-red-600 text-white p-4 rounded-lg shadow-md w-1/3 min-w-[120px] flex flex-col items-center text-center"
          >
            <Users className="w-8 h-8 mb-2" />
            <h4 className="text-sm font-bold">Dedicated Team</h4>
            <p className="text-xs">Innovative solutions with quality.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* About Section (Overlapping Banner) */}
      <div className="container mx-auto py-4 relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: -20, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white p-6 rounded-lg shadow-lg max-w-[1400px] mx-auto -mt-12 z-10"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">About Automax Electronics</h3>
          <p className="text-gray-700 text-base">
            Automax Electronics is a leading company with a strong presence, manufacturing a wide range of electrical products for automobiles. Our range of products includes Decorative LED lights, Fog Lights, Roof lamp LED lights, Waterproof LED lights, Boat LED lights, Converters, Tail lamps, and much more. Located in Turmeric City, Erode, Automax Electronics caters to a wide range of automobile LED lightings from two-wheelers to commercial vehicles under the brand name ASTRA.
          </p>
          <p className="text-gray-700 text-base mt-4">
            With a focus on innovation and customer satisfaction, Automax boasts a robust distribution network. The company prioritizes sustainability, with an emphasis on renewable energy, waste reduction, and environmental conservation. Automax is committed to social responsibility, with initiatives in education, sanitation, and community development. Recognized for its sustainability efforts, Automax has been ranked in the Dow Jones Sustainability Index and maintains an 'A' rating in the MSCI ESG Rating.
          </p>

          {/* Our Branches Section */}
          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Our Branches</h3>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Branch 1 */}
            <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5xB4PPVK9CbUovXpSdjPiGqTLTtY8zM5cKg&s"
                alt="Branch 1"
                className="w-full h-48 object-cover rounded-md mb-4"
                loading="lazy"
              />
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Branch 1 - Erode (Main Branch)</h4>
              <p className="text-gray-700 text-sm mb-4">
                123 Automax Avenue, Turmeric City, Erode, Tamil Nadu 638001, India
              </p>
              <a
                href="https://www.google.com/maps?q=123+Automax+Avenue,+Turmeric+City,+Erode,+Tamil+Nadu+638001,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-500 text-white text-sm font-semibold py-2 px-4 rounded hover:bg-red-600 transition-colors"
              >
                See Location
              </a>
            </div>
            {/* Branch 2 */}
            <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2oDc2cDIxq7nwR_xq_3MyI_Yb6OyGGznmgw&s"
                alt="Branch 2"
                className="w-full h-48 object-cover rounded-md mb-4"
                loading="lazy"
              />
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Branch 2 - Coimbatore</h4>
              <p className="text-gray-700 text-sm mb-4">
                456 Industrial Road, Coimbatore, Tamil Nadu 641001, India
              </p>
              <a
                href="https://www.google.com/maps?q=456+Industrial+Road,+Coimbatore,+Tamil+Nadu+641001,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-500 text-white text-sm font-semibold py-2 px-4 rounded hover:bg-red-600 transition-colors"
              >
                See Location
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default About;