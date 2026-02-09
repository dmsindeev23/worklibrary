import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Home } from '@/pages/Home';
import { Library } from '@/pages/Library';
import { ModuleDetail } from '@/pages/ModuleDetail';
import { About } from '@/pages/About';
import { Checkout } from '@/pages/Checkout';
import { Dashboard } from '@/pages/Dashboard';
import { Playback } from '@/pages/Playback';
import { CollectionsPage } from '@/pages/Collections';
import { DownloadsPage } from '@/pages/Downloads';
import { Subscription } from '@/pages/Subscription';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/:id" element={<ModuleDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/playback/:id" element={<Playback />} />
            <Route path="/dashboard/collections" element={<CollectionsPage />} />
            <Route path="/dashboard/downloads" element={<DownloadsPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/subscription" element={<Subscription />} />
          </Routes>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
