import { Route, Routes } from "react-router-dom";
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
import { GlobalStyle } from './GlobalStyle';
function App() {
  return (
    <div className="app">
      <GlobalStyle />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;