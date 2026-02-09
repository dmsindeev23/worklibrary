
import { motion } from 'framer-motion';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const plans = [
  {
    id: 'monthly',
    name: 'Месячная',
    price: 4990,
    period: 'месяц',
    description: 'Полный доступ ко всем материалам',
    features: [
      'Доступ ко всем модулям',
      'Новые материалы каждую неделю',
      'Скачивание всех шаблонов',
      'Поддержка 24/7',
      'Отмена в любое время',
    ],
    icon: Zap,
    popular: false,
  },
  {
    id: 'yearly',
    name: 'Годовая',
    price: 3990,
    period: 'месяц',
    description: 'Экономия 20% при оплате за год',
    features: [
      'Всё из месячной подписки',
      'Экономия 12 000 ₽ в год',
      'Эксклюзивные вебинары',
      'Персональные консультации',
      'Приоритетная поддержка',
    ],
    icon: Crown,
    popular: true,
  },
  {
    id: 'team',
    name: 'Командная',
    price: 14990,
    period: 'месяц',
    description: 'Для команд до 10 человек',
    features: [
      'Доступ для 10 сотрудников',
      'Аналитика обучения',
      'Корпоративные воркшопы',
      'Выделенный менеджер',
      'Кастомизация контента',
    ],
    icon: Star,
    popular: false,
  },
];

export function Subscription() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-main max-w-5xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-h1-mobile md:text-h1 text-graphite mb-6">
              Выберите свой план
            </h1>
            <p className="text-body-lg text-graphite-secondary max-w-2xl mx-auto">
              Получите неограниченный доступ ко всей библиотеке микро-уроков. 
              Новый контент каждую неделю.
            </p>
          </motion.div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className={`relative card-base ${
                  plan.popular ? 'border-forest ring-1 ring-forest' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-forest text-white text-micro px-3 py-1 rounded-full">
                      Популярный
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-forest-soft flex items-center justify-center">
                    <plan.icon className="w-6 h-6 text-forest" />
                  </div>
                  <h3 className="font-heading text-h3 text-graphite mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-small text-graphite-secondary mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-heading text-h2 text-graphite">
                      {plan.price.toLocaleString()} ₽
                    </span>
                    <span className="text-small text-graphite-secondary">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
                      <span className="text-small text-graphite-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {user?.subscription ? 'Изменить план' : 'Подписаться'}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="mt-20"
          >
            <h2 className="font-heading text-h3 text-graphite text-center mb-8">
              Частые вопросы
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-base">
                <h4 className="font-heading text-h4 text-graphite mb-2">
                  Можно ли отменить подписку?
                </h4>
                <p className="text-small text-graphite-secondary">
                  Да, вы можете отменить подписку в любое время. Доступ останется до конца оплаченного периода.
                </p>
              </div>
              <div className="card-base">
                <h4 className="font-heading text-h4 text-graphite mb-2">
                  Что входит в подписку?
                </h4>
                <p className="text-small text-graphite-secondary">
                  Доступ ко всем текущим и новым модулям, шаблонам, чек-листам и эксклюзивному контенту.
                </p>
              </div>
              <div className="card-base">
                <h4 className="font-heading text-h4 text-graphite mb-2">
                  Как часто добавляется контент?
                </h4>
                <p className="text-small text-graphite-secondary">
                  Мы добавляем 2-3 новых модуля каждую неделю по разным темам.
                </p>
              </div>
              <div className="card-base">
                <h4 className="font-heading text-h4 text-graphite mb-2">
                  Есть ли пробный период?
                </h4>
                <p className="text-small text-graphite-secondary">
                  Да, 7 дней бесплатного доступа ко всей библиотеке. Без привязки карты.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
