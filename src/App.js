import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/HomePage';
import Footer from './components/Footer';
import Water from './components/products/water';
import Boat from './components/products/boat';
import Fog from './components/products/fog';
import Twowheeler from './components/products/twowheeler';
import Converters from './components/products/converters';
import Roof from './components/products/roof';
import Tail from './components/products/tail';
import Side from './components/products/side';
import Decorative from './components/products/decorative';
import Contact from './components/contact';
import About from './components/about';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Redirects */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/automax" element={<Navigate to="/home" replace />} />
          <Route path="/components" element={<Navigate to="/home" replace />} />
          
          {/* Main Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Product Routes */}
          <Route path="/products/water" element={<Water />} />
          <Route path="/products/boat" element={<Boat />} />
          <Route path="/products/fog" element={<Fog />} />
          <Route path="/products/twowheeler" element={<Twowheeler />} />
          <Route path="/products/converters" element={<Converters />} />
          <Route path="/products/roof" element={<Roof />} />
          <Route path="/products/tail" element={<Tail />} />
          <Route path="/products/side" element={<Side />} />
          <Route path="/products/decorative" element={<Decorative />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;