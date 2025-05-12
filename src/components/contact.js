import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();  
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });

    try {
      const response = await fetch('https://translator-0dye.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Message sent successfully! We will contact you soon.',
        });
        setFormData({
          name: "",
          email: "",
          mobile: "",
          country: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: error.message || 'Error sending message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  const destination = "Automax+Electronics,+11.352774448299584,+77.73003007452424";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

  return (
    <div className="flex min-h-screen bg-white flex-col">
      {/* Hero Section with Background Image */}
      <section 
        className="w-full px-4 sm:px-6 lg:px-20 py-12 text-black relative"
        style={{
          backgroundImage: `url('https://www.jycircuit.net/wp-content/uploads/2022/12/contact.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-red-600">AUTOMAX</h2>
              <p className="text-sm uppercase text-white mb-2">MANUFACTURING | MARKETING</p>
              <div className="w-16 h-1 bg-orange-400 mb-6"></div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate('/')} 
                  className="flex items-center gap-1 text-white hover:text-blue-300 transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span className="text-lg font-medium">Home</span>
                </button>
                <span className="text-lg text-gray-300">/ CONTACT US</span>
              </div>
            </div>
            <div className="lg:w-2/3">
              <h3 className="text-xl sm:text-4xl font-semibold mb-6 text-white">FEEL FREE TO CONTACT US<br></br>AND WE ARE AVAILABLE<br></br> AT ANYTIME</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="w-full px-4 sm:px-6 lg:px-20 py-12">
        <div className="container mx-auto">
        <h1 className="text-center text-3xl text-red-600 font-bold pb-6">CONTACT US</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp Card */}
            <div className="rounded-lg p-6 text-center shadow-md bg-gray-100">
              <svg className="mx-auto h-12 w-12 text-red-600 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                <path d="M15.5 14.5c-.3 0-.6-.1-.8-.2l-2.1-1c-.2-.1-.4-.1-.6 0l-1.2.6c-.4.2-.8.1-1.1-.2-.3-.3-.5-.7-.4-1.1l.5-1.5c.1-.2 0-.4-.1-.6l-1-1.5c-.2-.3-.2-.6-.1-.9.1-.3.4-.5.7-.5h1.5c.2 0 .4.1.5.2l2.5 3c.1.2.2.3.4.3s.3-.1.4-.2l1.5-2c.2-.2.4-.3.6-.2.2.1.3.3.2.6l-.5 1.5c-.1.2 0 .4.1.6l1 1.5c.2.3.2.6.1.9-.1.3-.4.5-.7.5h-1.5z"/>
              </svg>
              <h4 className="text-lg font-semibold mb-2">WhatsApp Support</h4>
              <p className="text-gray-600 mb-4">9711773333</p>
              <a
                href="https://wa.me/9711773333"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition-all duration-300"
              >
                Chat Now
              </a>
            </div>
            {/* Email Card */}
            <div className="bg-gray-100 rounded-lg p-6 text-center shadow-md">
              <svg className="mx-auto h-12 w-12 text-red-600 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <h4 className="text-lg font-semibold mb-2">Email Support</h4>
              <p className="text-gray-600 mb-4">customercare@havells.com</p>
              <a
                href="mailto:customercare@havells.com"
                className="inline-block bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition-all duration-300"
              >
                Email Us
              </a>
            </div>
            {/* Phone Card */}
            <div className="bg-gray-100 rounded-lg p-6 text-center shadow-md">
              <svg className="mx-auto h-12 w-12 text-red-600 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <h4 className="text-lg font-semibold mb-2">Customer Care No.</h4>
              <p className="text-gray-600 mb-4">08045771313</p>
              <a
                href="tel:08045771313"
                className="inline-block bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition-all duration-300"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map Grid Section */}
      <div className="container mx-auto p-4 mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Column */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-1 rounded-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Query Text */}
            <h2 className="text-2xl md:text-4xl font-bold text-black mb-8 text-left tracking-wide pb-5">
              If you have any queries,<br />Please feel free to contact us
            </h2>

            {/* Submission Status Message */}
            {submitStatus.message && (
              <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitStatus.message}
              </div>
            )}

            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:bg-white hover:shadow-md"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:bg-white hover:shadow-md"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Mobile and Country Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Mobile
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:bg-white hover:shadow-md"
                  placeholder="Enter your mobile"
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:bg-white hover:shadow-md"
                  placeholder="Enter your country"
                  required
                />
              </div>
            </div>

            {/* Subject Input */}
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:bg-white hover:shadow-md"
                placeholder="Enter the subject"
                required
              />
            </div>

            {/* Message Input */}
            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:bg-white hover:shadow-md resize-none"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r mb-5 ${isSubmitting ? 'from-gray-600 to-gray-800' : 'from-red-600 to-red-800'} text-white  bg-red-600 py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold`}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </motion.button>
          </motion.form>

          {/* Map Column */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-red-600 mb-8 text-left tracking-wide pb-5">
              Here We Are,<br />Head Office
            </h2>
            <div className="h-full overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.752573440062!2d77.73003007452424!3d11.352774448299584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f4deff2fa45%3A0xf50e560171992b50!2sAutomax%20Electronics!5e0!3m2!1sen!2sin!4v1739557612039!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </div>
            {/* Directions Button */}
            <div className="mt-4 text-center">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white py-3 mb-5 px-6 mt-3 rounded-lg hover:bg-red-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg md:text-xl"
              >
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;