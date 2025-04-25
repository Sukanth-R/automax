import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Mobile dropdown component with smooth transitions
  const MobileDropdown = ({ title, children }) => (
    <div className="border-b border-gray-700 pb-4">
      <button 
        onClick={() => toggleSection(title)}
        className="flex justify-between items-center w-full text-left py-3 focus:outline-none"
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <motion.div
          animate={{ rotate: openSection === title ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-gray-400"
        >
          <FaChevronDown />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {openSection === title && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: "auto",
              transition: { 
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { 
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
            className="overflow-hidden"
          >
            <div className="pt-2 pl-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <footer className="bg-[#01013E] text-white py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Mobile View */}
        <div className="block md:hidden">
          <MobileDropdown title="Address">
            <div className="space-y-2 text-gray-300">
              <p>123 Street Name</p>
              <p>City, State, ZIP</p>
              <p>Country</p>
              <p>Email: example@email.com</p>
              <p>Phone: +123 456 7890</p>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2 text-white">Follow Us</h4>
                <div className="flex space-x-5 mt-4">
                  {[
                    { icon: FaTwitter, url: 'https://twitter.com' },
                    { icon: FaFacebook, url: 'https://facebook.com' },
                    { icon: FaLinkedin, url: 'https://linkedin.com' },
                    { icon: FaInstagram, url: 'https://instagram.com' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="hover:text-blue-300"
                    >
                      <social.icon size={34} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </MobileDropdown>

          <MobileDropdown title="Quick Links">
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/services', label: 'Gallery' },
                { path: '/components/contact', label: 'Contact' }
              ].map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: index * 0.05 }
                  }}
                >
                  <Link 
                    to={link.path}
                    className="block py-1 hover:text-blue-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </MobileDropdown>

          <MobileDropdown title="Our Products">
            <ul className="space-y-3">
              {[
                { path: 'water', label: 'Water Proof LED Lights' },
                { path: 'boat', label: 'Boat Lights' },
                { path: 'fog', label: 'Fog Lights' },
                { path: 'twowheeler', label: 'Two Wheeler Lights' },
                { path: 'converters', label: 'Converters' },
                { path: 'roof', label: 'Roof Lamps' },
                { path: 'tail', label: 'Tail Lamp Assembly' },
                { path: 'side', label: 'Side Indicators' },
                { path: 'decorative', label: 'Decorative Lights' }
              ].map((product, index) => (
                <motion.li
                  key={product.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: index * 0.05 }
                  }}
                >
                  <Link 
                    to={`/components/products/${product.path}`}
                    className="block py-1 hover:text-blue-300 transition-colors duration-200"
                  >
                    {product.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </MobileDropdown>
        </div>

        {/* Desktop View (unchanged) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-10">
          {/* Address Section */}
          <div className="text-lg">
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p>123 Street Name</p>
            <p>City, State, ZIP</p>
            <p>Country</p>
            <p>Email: example@email.com</p>
            <p>Phone: +123 456 7890</p>

            {/* Follow Us Section */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-200">
                  <FaTwitter size={24} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-200">
                  <FaFacebook size={24} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-200">
                  <FaLinkedin size={24} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-200">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block hover:text-gray-400 hover:tracking-widest transition-all duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/components/about" className="block hover:text-gray-400 hover:tracking-widest transition-all duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="block hover:text-gray-400 hover:tracking-widest transition-all duration-200">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/components/contact" className="block hover:text-gray-400 hover:tracking-widest transition-all duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Products Section */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/components/products/water" className="block hover:text-gray-400 hover:tracking-widest transition-all duration-200">
                  Water Proof LED Lights
                </Link>
              </li>
              <li>
                <Link to="/components/products/boat" className="block hover:text-gray-400 hover:tracking-widest transition-all duration-200">
                  Boat Lights
                </Link>
              </li>
              <li>
                <Link to="/components/products/fog" className="block hover:text-gray-400 hover:tracking-widest transition-all duration-200">
                  Fog Lights
                </Link>
              </li>
              <li>
                <Link to="/components/products/twowheeler" className="block hover:text-gray-400 hover:tracking-widest transition-all duration-200">
                  Two Wheeler Lights
                </Link>
              </li>
              <li>
                <Link to="/components/products/converters" className="block hover:text-gray-400 hover:tracking-widest transition-all duration-200">
                  Converters
                </Link>
              </li>
              <li>
                <Link to="/components/products/roof" className="block hover:text-gray-400 hover:tracking-widest transition-all duration-200">
                  Roof Lamps
                </Link>
              </li>
              <li>
                <Link to="/components/products/tail" className="block hover:text-gray-400 hover:tracking-widest transition-all duration-200">
                  Tail Lamp Assembly
                </Link>
              </li>
              <li>
                <Link to="/components/products/side" className="block hover:text-gray-400 hover:tracking-widest transition-all duration-200">
                  Side Indicators
                </Link>
              </li>
              <li>
                <Link to="/components/products/decorative" className="block hover:text-gray-400 hover:tracking-widest transition-all duration-200">
                  Decorative Lights
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center mt-6 text-gray-200 text-sm">
          ©AUTOMAX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;