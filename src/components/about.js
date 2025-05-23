import { motion, useAnimationControls } from "framer-motion";
import { Award, Users, Clock, Home, Play, Star, Milestone } from "lucide-react";
import { useEffect, useRef } from "react";

const About = () => {
  // Sample gallery content (replace with your actual video and images)
  const galleryVideo = {
    src: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-during-the-night-39859-large.mp4", // Placeholder video
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop", // Placeholder poster
  };

  const galleryImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1516321310767-0e7256f38719?q=80&w=2070&auto=format&fit=crop" }, // Factory
    { id: 2, src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop" }, // Team
    { id: 3, src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop" }, // Product
    { id: 4, src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" }, // Workshop
    { id: 5, src: "https://images.unsplash.com/photo-1503428593587-59321a727a43?q=80&w=2070&auto=format&fit=crop" }, // Event
  ];

  // Sample achievements content (replace with your actual achievements)
  const achievements = [
    {
      id: 1,
      icon: <Award className="w-8 h-8 text-red-600" />,
      title: "Best LED Innovation 2020",
      description: "Awarded for groundbreaking advancements in automotive LED technology.",
    },
    {
      id: 2,
      icon: <Star className="w-8 h-8 text-red-600" />,
      title: "Dow Jones Sustainability Index",
      description: "Ranked for outstanding sustainability practices in 2022.",
    },
    {
      id: 3,
      icon: <Users className="w-8 h-8 text-red-600" />,
      title: "Top Employer 2023",
      description: "Recognized for exceptional workplace culture and innovation.",
    },
    {
      id: 4,
      icon: <Award className="w-8 h-8 text-red-600" />,
      title: "MSCI ESG 'A' Rating",
      description: "Achieved 'A' rating for environmental and social responsibility in 2024.",
    },
  ];

  // Sample journey content (replace with your actual timeline events)
  const journey = [
    {
      id: 1,
      year: "2010",
      title: "Founded Automax Electronics",
      description: "Established in Erode, Tamil Nadu, with a vision to revolutionize automotive lighting.",
      icon: <Milestone className="w-6 h-6 text-red-600" />,
    },
    {
      id: 2,
      year: "2015",
      title: "Launched ASTRA Brand",
      description: "Introduced the ASTRA line of LED lights for two-wheelers and commercial vehicles.",
      icon: <Star className="w-6 h-6 text-red-600" />,
    },
    {
      id: 3,
      year: "2018",
      title: "Expanded to Coimbatore",
      description: "Opened a second branch in Coimbatore to meet growing demand.",
      icon: <Milestone className="w-6 h-6 text-red-600" />,
    },
    {
      id: 4,
      year: "2020",
      title: "Best LED Innovation Award",
      description: "Received industry recognition for innovative LED designs.",
      icon: <Award className="w-6 h-6 text-red-600" />,
    },
    {
      id: 5,
      year: "2023",
      title: "Sustainability Milestone",
      description: "Ranked in Dow Jones Sustainability Index for eco-friendly practices.",
      icon: <Star className="w-6 h-6 text-red-600" />,
    },
  ];

  // Animation controls for marquee
  const controls = useAnimationControls();
  const marqueeRef = useRef(null);

  // Start marquee animation
  useEffect(() => {
    controls.start({
      x: "-50%", // For doubled list
      transition: {
        x: { repeat: Infinity, repeatType: "loop", duration: 12, ease: "linear" },
      },
    });
  }, [controls]);

  // Handle hover pause/resume
  const handleHoverStart = () => {
    controls.stop();
  };

  const handleHoverEnd = () => {
    controls.start({
      x: "-50%",
      transition: {
        x: { repeat: Infinity, repeatType: "loop", duration: 12, ease: "linear" },
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col">
      {/* Banner with Header and Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-96 md:h-120 bg-gray-300 overflow-hidden"
      >
        {/* Header Section */}
        <div className="absolute top-0 left-0 w-full px-4 md:px-6 lg:px-20 py-6">
          <div className="flex flex-col">
            {/* Automax Info and Breadcrumb */}
            <div className="mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-red-600">AUTOMAX</h2>
              <p className="text-sm uppercase text-gray-800 mb-2">MANUFACTURING | MARKETING</p>
              <div className="w-16 h-1 bg-orange-400 mb-2"></div>
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-gray-700" />
                <span className="text-lg text-gray-700">Home</span>
                <span className="text-lg text-gray-500">/ ABOUT US</span>
              </div>
            </div>
          </div>
        </div>

        {/* Three Cards in Banner */}
        <div className="absolute inset-x-0 bottom-[60px] flex justify-center space-x-4 px-4 pb-4">
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
      <div className="container mx-auto px-4 py-4 relative">
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

          {/* Gallery of Moments Section */}
          <h3 className="text-xl font-bold text-gray-800 mt-[60px] mb-4">Gallery of Moments</h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Video Section */}
            <div className="relative w-full md:w-3/4 mx-auto">
              <video
                className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg shadow-lg"
                poster={galleryVideo.poster}
                controls
              >
                <source src={galleryVideo.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg"
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <Play className="w-12 h-12 text-white opacity-80" />
              </motion.div>
            </div>

            {/* Image Marquee Section */}
            <div className="overflow-hidden">
              <motion.div
                ref={marqueeRef}
                className="flex w-[max-content]"
                animate={controls}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              >
                {[...galleryImages, ...galleryImages].map((image, index) => (
                  <div
                    key={`${image.id}-${index}`}
                    className="flex-shrink-0 mx-4 relative hover:scale-105 transition-transform duration-300 transform-gpu z-10"
                  >
                    <img
                      src={image.src}
                      alt={`Gallery Image ${image.id}`}
                      className="h-24 md:h-32 lg:h-40 w-40 md:w-48 lg:w-56 object-cover rounded-lg shadow-md"
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Our Achievements and Journey Section */}
          <h3 className="text-xl font-bold text-gray-800 mt-[60px] mb-4">Our Achievements and Journey</h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            {/* Achievements Subsection */}
            <div>
              <h4 className="text-lg font-semibold text-red-600 mb-4">Achievements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:border-red-200 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {achievement.icon}
                      <h5 className="text-base font-semibold text-gray-800">{achievement.title}</h5>
                    </div>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Journey Subsection (Timeline) */}
            <div>
              <h4 className="text-lg font-semibold text-red-600 mb-4">Our Journey</h4>
              <div className="relative">
                {/* Central Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-600 h-full"></div>
                {journey.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`flex items-center mb-8 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`w-full md:w-5/12 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100 relative ${
                        index % 2 === 0 ? "mr-auto" : "ml-auto"
                      }`}
                    >
                      {/* Timeline Dot */}
                      
                      <div className="flex items-center gap-3 mb-2">
                        {event.icon}
                        <h5 className="text-base font-semibold text-gray-800">{event.year}: {event.title}</h5>
                      </div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;