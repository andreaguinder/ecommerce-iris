import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { Home } from './pages/Home/Home';
import { Footer } from './components/Footer/Footer';
import { MaquillajePage } from './pages/Maquillaje';
import { UnasPage } from './pages/Unas';
import { PerfumesPage } from './pages/Perfumes';
import { ProductDetail } from './components/ProductDetail/ProductDetail';
import { CheckoutPage } from './pages/Checkout/Checkout';
import { CartProvider } from './context/CartContext';
import { BrandPage } from './components/BrandPage/BrandPage';

function App() {
  return (
    <BrowserRouter>

      <CartProvider>
        
        <Header />
        
        <CartDrawer />

        <main style={{ minHeight: 'calc(100vh - 250px)' }}> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/maquillaje" element={<MaquillajePage />} />
            <Route path="/unas" element={<UnasPage />} />
            <Route path="/perfumes" element={<PerfumesPage />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/brand/:brandName" element={<BrandPage />} />
          </Routes>
        </main>

      </CartProvider>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;