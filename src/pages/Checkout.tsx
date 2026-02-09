import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Check, CreditCard } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { modules } from '@/data/modules';

export function Checkout() {
  const { items, removeItem } = useCart();
  const { addPurchase } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const cartModules = items.map((item) => ({
    ...modules.find((m) => m.id === item.moduleId)!,
    quantity: item.quantity,
  }));

  const subtotal = cartModules.reduce((sum, m) => sum + m.price * m.quantity, 0);
  const discount = promoCode === 'WELCOME10' ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Add all items to purchased
    cartModules.forEach((module) => {
      addPurchase(module.id);
    });
    
    setIsProcessing(false);
    setIsComplete(true);
  };

  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen bg-paper">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-main max-w-2xl text-center">
            <h1 className="font-heading text-h2 text-graphite mb-4">
              Корзина пуста
            </h1>
            <p className="text-body text-graphite-secondary mb-8">
              Изучите нашу библиотеку, чтобы найти модули для вашей команды.
            </p>
            <Link to="/library">
              <Button className="btn-primary">В библиотеку</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-paper">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-main max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="w-10 h-10 text-success" />
              </div>
              <h1 className="font-heading text-h2 text-graphite mb-4">
                Добавлено в вашу библиотеку
              </h1>
              <p className="text-body text-graphite-secondary mb-8">
                Ваши модули теперь доступны в личной библиотеке. 
                Вы можете смотреть и скачивать их в любое время.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button className="btn-primary">В мою библиотеку</Button>
                </Link>
                <Link to="/library">
                  <Button variant="outline" className="btn-secondary">
                    Продолжить покупки
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-main max-w-4xl">
          {/* Back Link */}
          <Link 
            to="/library" 
            className="inline-flex items-center text-small text-graphite-secondary hover:text-forest transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Продолжить покупки
          </Link>

          <h1 className="font-heading text-h1-mobile md:text-h2 text-graphite mb-10">
            Оформление заказа
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="font-heading text-h4 text-graphite mb-6">
                Состав заказа
              </h2>

              <div className="space-y-4 mb-6">
                {cartModules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-center gap-4 p-4 bg-white border border-lines rounded-card"
                  >
                    <div
                      className="w-16 h-20 rounded-lg flex-shrink-0 overflow-hidden"
                      style={{ backgroundColor: module.coverColor }}
                    >
                      <img
                        src={module.coverImage}
                        alt={module.title}
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-body font-medium text-graphite truncate">
                        {module.title}
                      </h4>
                      <p className="text-small text-graphite-secondary">
                        {module.topic} • {module.duration} мин
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-body font-medium text-graphite">
                        {module.price.toLocaleString()} ₽
                      </p>
                      <button
                        onClick={() => removeItem(module.id)}
                        className="text-small text-warning hover:underline"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="flex gap-3 mb-6">
                <Input
                  placeholder="Промокод"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="input-base"
                />
                <Button variant="outline" className="flex-shrink-0">
                  Применить
                </Button>
              </div>

              {/* Totals */}
              <div className="border-t border-lines pt-4 space-y-2">
                <div className="flex justify-between text-small text-graphite-secondary">
                  <span>Подытог</span>
                  <span>{subtotal.toLocaleString()} ₽</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-small text-success">
                    <span>Скидка</span>
                    <span>-{discount.toLocaleString()} ₽</span>
                  </div>
                )}
                <div className="flex justify-between text-h4 text-graphite pt-2">
                  <span>Итого</span>
                  <span>{total.toLocaleString()} ₽</span>
                </div>
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="font-heading text-h4 text-graphite mb-6">
                Данные для оплаты
              </h2>

              <div className="card-base space-y-4">
                <div>
                  <label className="block text-small font-medium text-graphite mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    className="input-base"
                  />
                </div>

                <div>
                  <label className="block text-small font-medium text-graphite mb-2">
                    Данные карты
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="0000 0000 0000 0000"
                      className="input-base pl-12"
                    />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-graphite-secondary" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-small font-medium text-graphite mb-2">
                      Срок действия
                    </label>
                    <Input
                      placeholder="ММ/ГГ"
                      className="input-base"
                    />
                  </div>
                  <div>
                    <label className="block text-small font-medium text-graphite mb-2">
                      CVC
                    </label>
                    <Input
                      placeholder="123"
                      className="input-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-small font-medium text-graphite mb-2">
                    Имя на карте
                  </label>
                  <Input
                    placeholder="Полное имя"
                    className="input-base"
                  />
                </div>

                <Button
                  className="w-full btn-primary mt-6"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Обработка...
                    </span>
                  ) : (
                    `Оплатить ${total.toLocaleString()} ₽`
                  )}
                </Button>

                <p className="text-micro text-graphite-secondary text-center">
                  Безопасная оплата через Stripe
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
