import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const beliefs = [
  'Отличные команды строятся намеренно, а не случайно.',
  'Практичные инструменты важнее теоретических фреймворков.',
  'Маленькие изменения в том, как мы работаем вместе, дают большие результаты.',
];

export function AboutAuthor() {
  return (
    <section className="section-padding bg-surface-2">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="aspect-[4/5] max-w-md mx-auto lg:mx-0 bg-lines rounded-card overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-lines to-surface-2">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-graphite/10 flex items-center justify-center">
                    <span className="font-heading text-3xl text-graphite-secondary">А</span>
                  </div>
                  <p className="text-small text-graphite-secondary">Фото автора</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="font-heading text-h2-mobile md:text-h2 text-graphite mb-6">
              Об авторе
            </h2>
            
            <p className="text-body-lg text-graphite-secondary mb-8">
              Я помогаю работодателям выстраивать сильные команды через практичные уроки, 
              основанные на реальном опыте. После 15 лет в people operations в стартапах 
              и растущих компаниях я знаю, что работает, а что нет.
            </p>

            <div className="mb-8">
              <h4 className="text-h4 text-graphite mb-4">Мой подход</h4>
              <ul className="space-y-3">
                {beliefs.map((belief, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest mt-2 flex-shrink-0" />
                    <span className="text-body text-graphite-secondary">{belief}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/about">
              <Button variant="outline" className="btn-secondary">
                Подробнее
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
