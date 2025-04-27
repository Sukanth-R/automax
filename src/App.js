import { useEffect } from 'react';
import { 
  BrowserRouter, 
  HashRouter, 
  Routes, 
  Route, 
  Navigate,
  useNavigate
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/HomePage';
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
import NotFound from './components/NotFound';
import './App.css';

// Main App Component
function AppContent() {
  const navigate = useNavigate();
  const isGitHubPages = window.location.host.includes('github.io');

  // Handle GitHub Pages 404 redirect
  useEffect(() => {
    if (isGitHubPages && window.location.hash.includes('#/')) {
      const path = window.location.hash.replace('#', '');
      navigate(path);
    }
  }, [navigate, isGitHubPages]);

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Redirects */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/automax" element={<Navigate to="/home" replace />} />
          
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// Router Wrapper Component
function AppWrapper() {
  const isGitHubPages = window.location.host.includes('github.io');

  return isGitHubPages ? (
    <HashRouter basename="/automax">
      <AppContent />
    </HashRouter>
  ) : (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default AppWrapper;