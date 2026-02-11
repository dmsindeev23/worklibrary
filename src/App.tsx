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
import { Login } from '@/pages/Login';

import { ProtectedRoute } from '@/components/ProtectedRoute';

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
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/subscription" element={<Subscription />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />

            {/* Protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/playback/:id"
              element={
                <ProtectedRoute>
                  <Playback />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/collections"
              element={
                <ProtectedRoute>
                  <CollectionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/downloads"
              element={
                <ProtectedRoute>
                  <DownloadsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
