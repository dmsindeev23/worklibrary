import { Link } from 'react-router-dom';
import { Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Библиотека', href: '/library' },
    { label: 'Коллекции', href: '/collections' },
    { label: 'Подписка', href: '/subscription' },
  ],
  company: [
    { label: 'О нас', href: '/about' },
    { label: 'Контакты', href: '/about' },
    { label: 'Для работодателей', href: '/#roles' },
  ],
  legal: [
    { label: 'Условия', href: '#' },
    { label: 'Конфиденциальность', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-graphite text-white">
      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="font-heading text-2xl font-semibold text-white">
                Curated Library
              </span>
            </Link>
            <p className="mt-4 text-small text-white/60 max-w-xs">
              Микро-уроки для современных работодателей. Покупайте именно то, что нужно вашей команде.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-small font-semibold uppercase tracking-wide text-white/40 mb-4">
              Продукт
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-small text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-small font-semibold uppercase tracking-wide text-white/40 mb-4">
              Компания
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-small text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-small font-semibold uppercase tracking-wide text-white/40 mb-4">
              Правовая информация
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-small text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-micro text-white/40">
            © {new Date().getFullYear()} Curated Library. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
