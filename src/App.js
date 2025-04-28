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
          <Route path="/components" element={<Navigate to="/home" replace />} />
          
          {/* Main Routes */}
          <Route path="automax/home" element={<Home />} />
          <Route path="automax/about" element={<About />} />
          <Route path="automax/contact" element={<Contact />} />
          
          {/* Product Routes */}
          <Route path="automax/products/water" element={<Water />} />
          <Route path="automax/products/boat" element={<Boat />} />
          <Route path="automax/products/fog" element={<Fog />} />
          <Route path="automax/products/twowheeler" element={<Twowheeler />} />
          <Route path="automax/products/converters" element={<Converters />} />
          <Route path="automax/products/roof" element={<Roof />} />
          <Route path="automax/products/tail" element={<Tail />} />
          <Route path="automax/products/side" element={<Side />} />
          <Route path="automax/products/decorative" element={<Decorative />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;