import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, ShoppingBag, LogOut } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { label: 'Библиотека', href: '/library' },
  { label: 'Коллекции', href: '/collections' },
  { label: 'О нас', href: '/about' },
  { label: 'Подписка', href: '/subscription' },
  { label: 'FAQ', href: '/#how-it-works' },
];

export function Header() {
  const { isScrolled } = useScrollPosition();
  const { totalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    return location.pathname === href;
  };

  const onLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-paper/95 backdrop-blur-md shadow-header' : 'bg-paper'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-heading text-2xl font-semibold text-graphite">
              Curated Library
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-small font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-forest'
                    : 'text-graphite-secondary hover:text-forest'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="text-small font-medium">
                    Личный кабинет
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onLogout}
                  title="Выйти"
                  className="text-graphite-secondary hover:text-graphite"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
                <Link to="/library">
                  <Button className="btn-primary">В библиотеку</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-small font-medium">
                    Войти
                  </Button>
                </Link>
                <Link to="/library">
                  <Button className="btn-primary">В библиотеку</Button>
                </Link>
              </>
            )}

            <Link to="/checkout" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-forest text-white text-micro rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <Link to="/checkout" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-forest text-white text-micro rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-paper">
                <div className="flex flex-col gap-8 mt-8">
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-body font-medium transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'text-forest'
                            : 'text-graphite hover:text-forest'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex flex-col gap-3">
                    {isAuthenticated ? (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Button className="w-full btn-primary">Личный кабинет</Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={async () => {
                            await onLogout();
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Выйти
                        </Button>
                      </>
                    ) : (
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Войти
                        </Button>
                      </Link>
                    )}
                    <Link to="/library" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full btn-primary">В библиотеку</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
