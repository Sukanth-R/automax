import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Mobile View - Stacked Layout */}
        <div className="block md:hidden space-y-8">
          {/* Address Section */}
          <div className="pb-4">
            <h3 className="text-lg font-semibold mb-3 text-red-500">Address</h3>
            <div className="space-y-2 text-black">
              <p>123 Street Name</p>
              <p>City, State, ZIP</p>
              <p>Country</p>
              <p>Email: example@email.com</p>
              <p>Phone: +123 456 7890</p>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Follow Us</h4>
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
                      <social.icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-b border-gray-300 mt-4"></div>
          </div>

          {/* Quick Links Section */}
          <div className="pb-4">
            <h3 className="text-lg font-semibold mb-3 text-red-500">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { path: 'automax/home', label: 'Home' },
                { path: 'automax/about', label: 'About' },
                { path: 'automax/services', label: 'Gallery' },
                { path: 'automax/contact', label: 'Contact' }
              ].map((link) => (
                <motion.li
                  key={link.path}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    to={link.path}
                    className="block py-1 hover:text-red-600 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className=" mt-4"></div>
          </div>

          {/* Products Section */}
          <div className="pb-4">
            <h3 className="text-lg font-semibold mb-3 text-red-500">Our Products</h3>
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
              ].map((product) => (
                <motion.li
                  key={product.path}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    to={`automax/products/${product.path}`}
                    className="block py-1 hover:text-red-600 transition-colors duration-200"
                  >
                    {product.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="border-b border-gray-300 mt-4"></div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-10">
          {/* Address Section */}
          <div className="text-lg">
            <h3 className="text-xl font-semibold mb-2 text-red-500">Address</h3>
            <p>123 Street Name</p>
            <p>City, State, ZIP</p>
            <p>Country</p>
            <p>Email: example@email.com</p>
            <p>Phone: +123 456 7890</p>

            {/* Follow Us Section */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2 text-red-600">Follow Us</h3>
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
            <h3 className="text-xl font-semibold mb-2 text-red-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="automax/home" className="block hover:text-red-600  hover:tracking-widest transition-all duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="automax/about" className="block hover:text-red-600  hover:tracking-widest transition-all duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="automax/services" className="block hover:text-red-600  hover:tracking-widest transition-all duration-200">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="automax/contact" className="block hover:text-red-600  hover:tracking-widest transition-all duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Products Section */}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-red-500">Our Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="automax/products/water" className="block hover:text-red-600 hover:tracking-widest transition-all duration-200">
                  Water Proof LED Lights
                </Link>
              </li>
              <li>
                <Link to="automax/products/boat" className="block hover:text-red-600  hover:tracking-widest transition-all duration-200">
                  Boat Lights
                </Link>
              </li>
              <li>
                <Link to="automax/products/fog" className="block hover:text-red-600  hover:tracking-widest transition-all duration-200">
                  Fog Lights
                </Link>
              </li>
              <li>
                <Link to="automax/products/twowheeler" className="block hover:text-red-600  hover:tracking-widest transition-all duration-200">
                  Two Wheeler Lights
                </Link>
              </li>
              <li>
                <Link to="automax/products/converters" className="block hover:text-red-600  hover:tracking-widest transition-all duration-200">
                  Converters
                </Link>
              </li>
              <li>
                <Link to="automax/products/roof" className="block hover:text-red-600  hover:tracking-widest transition-all duration-200">
                  Roof Lamps
                </Link>
              </li>
              <li>
                <Link to="automax/products/tail" className="block hover:text-red-600  hover:tracking-widest transition-all duration-200">
                  Tail Lamp Assembly
                </Link>
              </li>
              <li>
                <Link to="automax/products/side" className="block hover:text-red-600  hover:tracking-widest transition-all duration-200">
                  Side Indicators
                </Link>
              </li>
              <li>
                <Link to="automax/products/decorative" className="block hover:text-red-600  hover:tracking-widest transition-all duration-200">
                  Decorative Lights
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center mt-6 text-gray-600 text-sm">
          ©AUTOMAX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;