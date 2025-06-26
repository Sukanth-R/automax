import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer 
      className="py-6 px-3 text-white relative"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/04/50/02/58/360_F_450025868_B7JguGOyDYfWFgVIO7JnFoJhNMV9O2q4.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black sm:bg-opacity-90 bg-opacity-50"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Container: Split into Left and Right */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side: Logo, MANUFACTURING | MARKETING, Follow Us */}
          <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
            <img 
              src="https://sukanth-r.github.io/automax/images/logo1.png"
              alt="AUTOMAX Logo" 
              className="h-12 mb-3"
            />
            <p className="text-[10px] text-gray-300 md:ms-6 mb-2">
              MANUFACTURING | MARKETING
            </p>
            <div className="w-10 h-1 bg-orange-500 md:ms-6 mb-3"></div>
            {/* Follow Us */}
            <div>
              <h3 className="text-sm font-semibold md:ms-6 mb-2 text-red-600">Follow Us</h3>
              <div className="flex space-x-3 justify-center md:ms-6 md:justify-start">
                {[
                  { icon: FaTwitter, url: 'https://twitter.com' },
                  { icon: FaFacebook, url: 'https://facebook.com' },
                  { icon: FaLinkedin, url: 'https://linkedin.com' },
                  { icon: FaInstagram, url: 'https://instagram.com' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="hover:text-red-400"
                  >
                    <social.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Links, Address, Contact */}
          <div className="md:w-2/3 flex flex-col gap-6">
            {/* Mobile View */}
            <div className="block md:hidden space-y-4">
              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-red-600">Quick Links</h3>
                <ul className="space-y-1 text-xs">
                  {[
                    { path: '/', label: 'Home' },
                    { path: '/about', label: 'About' },
                    { path: '/services', label: 'Gallery' },
                    { path: '/contact', label: 'Contact' },
                  ].map((link) => (
                    <motion.li
                      key={link.path}
                      whileHover={{ x: 5 }}
                    >
                      <Link 
                        to={link.path}
                        className="block py-0.5 hover:text-red-400 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-red-600">Our Products</h3>
                <ul className="space-y-1 text-xs">
                  {[
                    { path: 'water', label: 'Water Proof LED Lights' },
                    { path: 'boat', label: 'Boat Lights' },
                    { path: 'fog', label: 'Fog Lights' },
                    { path: 'twowheeler', label: 'Two Wheeler Lights' },
                    { path: 'converters', label: 'Converters' },
                    { path: 'roof', label: 'Roof Lamps' },
                    { path: 'tail', label: 'Tail Lamp Assembly' },
                    { path: 'side', label: 'Side Indicators' },
                    { path: 'decorative', label: 'Decorative Lights' },
                  ].map((product) => (
                    <motion.li
                      key={product.path}
                      whileHover={{ x: 5 }}
                    >
                      <Link 
                        to={`/products/${product.path}`}
                        className="block py-0.5 hover:text-red-400 transition-colors duration-200"
                      >
                        {product.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Head Office Address */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-red-600">Head Office Address</h3>
                <p className="text-xs">123 Business Avenue</p>
                <p className="text-xs">Mumbai, MH, 400001</p>
                <p className="text-xs">India</p>
              </div>

              {/* Factory Address */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-red-600">Factory Address</h3>
                <p className="text-xs">456 Industrial Zone</p>
                <p className="text-xs">Pune, MH, 411001</p>
                <p className="text-xs">India</p>
              </div>

              {/* Contact Us */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-red-600">Contact Us</h3>
                <p className="text-xs flex items-center justify-start md:justify-start">
                  <FaEnvelope className="mr-2 text-red-600" size={14} />
                  <a href="mailto:contact@automax.com" className="hover:text-red-400">contact@automax.com</a>
                </p>
                <p className="text-xs flex items-center justify-start md:justify-start">
                  <FaPhone className="mr-2 text-red-600" size={14} />
                  <a href="tel:+912345678900" className="hover:text-red-400">+91 234 567 8900</a>
                </p>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
              {/* Top: Links (Quick Links and Products) */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {/* Quick Links */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-red-600">Quick Links</h3>
                  <ul className="space-y-1 text-xs">
                    {[
                      { path: '/', label: 'Home' },
                      { path: '/about', label: 'About' },
                      { path: '/contact', label: 'Contact' },
                    ].map((link) => (
                      <motion.li
                        key={link.path}
                        whileHover={{ x: 5 }}
                      >
                        <Link 
                          to={link.path}
                          className="block py-0.5 hover:text-red-400 transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Products - Split into 3 columns */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-red-600">Our Products</h3>
                  <ul className="space-y-1 text-xs">
                    {[
                      { path: 'water', label: 'Water Proof LED Lights' },
                      { path: 'boat', label: 'Boat Lights' },
                      { path: 'fog', label: 'Fog Lights' },
                    ].map((product) => (
                      <motion.li
                        key={product.path}
                        whileHover={{ x: 5 }}
                      >
                        <Link 
                          to={`/products/${product.path}`}
                          className="block py-0.5 hover:text-red-400 transition-colors duration-200"
                        >
                          {product.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-red-600 invisible">Our Products</h3>
                  <ul className="space-y-1 text-xs">
                    {[
                      { path: 'twowheeler', label: 'Two Wheeler Lights' },
                      { path: 'converters', label: 'Converters' },
                      { path: 'roof', label: 'Roof Lamps' },
                    ].map((product) => (
                      <motion.li
                        key={product.path}
                        whileHover={{ x: 5 }}
                      >
                        <Link 
                          to={`/products/${product.path}`}
                          className="block py-0.5 hover:text-red-400 transition-colors duration-200"
                        >
                          {product.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-red-600 invisible">Our Products</h3>
                  <ul className="space-y-1 text-xs">
                    {[
                      { path: 'tail', label: 'Tail Lamp Assembly' },
                      { path: 'side', label: 'Side Indicators' },
                      { path: 'decorative', label: 'Decorative Lights' },
                    ].map((product) => (
                      <motion.li
                        key={product.path}
                        whileHover={{ x: 5 }}
                      >
                        <Link 
                          to={`/products/${product.path}`}
                          className="block py-0.5 hover:text-red-400 transition-colors duration-200"
                        >
                          {product.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Divider Line */}
              <hr className="border-red-600 mb-4" />

              {/* Bottom: Address, Contact */}
              <div className="grid grid-cols-3 gap-4">
                {/* Head Office Address */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-red-600">Head Office Address</h3>
                  <p className="text-xs">123 Business Avenue</p>
                  <p className="text-xs">Mumbai, MH, 400001</p>
                  <p className="text-xs">India</p>
                </div>

                {/* Factory Address */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-red-600">Factory Address</h3>
                  <p className="text-xs">456 Industrial Zone</p>
                  <p className="text-xs">Pune, MH, 411001</p>
                  <p className="text-xs">India</p>
                </div>

                {/* Contact Us */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-red-600">Contact Us</h3>
                  <p className="text-xs flex items-center">
                    <FaEnvelope className="mr-2 text-red-600" size={14} />
                    <a href="mailto:contact@automax.com" className="hover:text-red-400">contact@automax.com</a>
                  </p>
                  <p className="text-xs flex items-center mt-1">
                    <FaPhone className="mr-2 text-red-600" size={14} />
                    <a href="tel:+912345678900" className="hover:text-red-400">+91 234 567 8900</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-gray-300 text-xs">
          © AUTOMAX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;