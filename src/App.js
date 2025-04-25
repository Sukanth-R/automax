import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/HomePage'
import Footer from './components/Footer'
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
    <BrowserRouter basename="/automax">
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/components/products/water" element={<Water/>}/>
          <Route path="/components/products/boat" element={<Boat/>}/>
          <Route path="/components/products/fog" element={<Fog/>}/>
          <Route path="/components/products/twowheeler" element={<Twowheeler/>}/>
          <Route path="/components/products/converters" element={<Converters/>}/>
          <Route path="/components/products/roof" element={<Roof/>}/>
          <Route path="/components/products/tail" element={<Tail/>}/>
          <Route path="/components/products/side" element={<Side/>}/>
          <Route path="/components/products/decorative" element={<Decorative/>}/>
          <Route path="/components/contact" element={<Contact/>}/>
          <Route path="/components/about" element={<About/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
