import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="section-padding bg-forest-soft">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-heading text-h2-mobile md:text-h2 text-graphite mb-6">
            Готовы выстроить свою библиотеку?
          </h2>
          
          <p className="text-body-lg text-graphite-secondary mb-8">
            Начните изучать нашу курированную коллекцию микро-уроков, созданных для современных работодателей.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/library">
              <Button className="btn-primary">
                В библиотеку
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/subscription">
              <Button variant="outline" className="btn-secondary">
                Оформить подписку
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
