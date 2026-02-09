import { motion } from 'framer-motion';
import { Search, ShoppingBag, CreditCard, BookOpen } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Выберите модуль',
    description: 'Ищите по роли или теме, чтобы найти то, что нужно вашей команде.',
  },
  {
    number: '02',
    icon: ShoppingBag,
    title: 'Выберите модули или набор',
    description: 'Покупайте отдельные уроки или курированные коллекции.',
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Оплатите или оформите подписку',
    description: 'Разовый платёж или подписка с доступом ко всем материалам.',
  },
  {
    number: '04',
    icon: BookOpen,
    title: 'Доступ навсегда',
    description: 'Смотрите и скачивайте из вашей личной библиотеки в любое время.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-paper">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-h2-mobile md:text-h2 text-graphite">
            Как это работает
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-lines" />
              )}
              
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="w-16 h-16 rounded-full bg-forest text-white flex items-center justify-center mb-6 relative z-10"
                >
                  <step.icon className="w-6 h-6" />
                </motion.div>
                
                <span className="text-micro text-forest font-medium mb-2">
                  Шаг {step.number}
                </span>
                
                <h3 className="font-heading text-h4 text-graphite mb-3">
                  {step.title}
                </h3>
                
                <p className="text-small text-graphite-secondary max-w-xs">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
