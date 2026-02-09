import { motion } from 'framer-motion';
import { Clock, FileCheck, BookOpen } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Микро-уроки (7–12 мин)',
    description: 'Сфокусированный, практичный контент. Без воды. Только то, что нужно знать.',
  },
  {
    icon: FileCheck,
    title: 'Чек-листы и шаблоны',
    description: 'Инструменты, которые можно использовать сразу. Скачайте и применяйте.',
  },
  {
    icon: BookOpen,
    title: 'Всегда доступно',
    description: 'Смотрите в любое время в вашей личной библиотеке. Доступ навсегда.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function WhatYouGet() {
  return (
    <section className="section-padding bg-paper">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-h2-mobile md:text-h2 text-graphite">
            Что вы получаете
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-soft mb-6"
              >
                <feature.icon className="w-7 h-7 text-forest" />
              </motion.div>
              <h3 className="font-heading text-h4 text-graphite mb-3">
                {feature.title}
              </h3>
              <p className="text-body text-graphite-secondary max-w-sm mx-auto">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
