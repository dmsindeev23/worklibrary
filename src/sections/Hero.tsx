import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { modules } from '@/data/modules';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export function Hero() {
  const showcaseModules = modules.slice(0, 9);

  return (
    <section className="min-h-screen bg-paper pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.h1
              variants={itemVariants}
              className="font-heading text-h1-mobile md:text-h1 text-graphite mb-6"
            >
              Курированная библиотека микро-уроков для работодателей.
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-body-lg text-graphite-secondary mb-8"
            >
              Покупайте именно то, что нужно вашей команде — по одному уроку за раз. Видео + чек-лист + шаблоны.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-6"
            >
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
            </motion.div>
            
            <motion.p
              variants={itemVariants}
              className="text-small text-graphite-secondary"
            >
              Создано для HR, основателей и руководителей команд.
            </motion.p>
          </motion.div>

          {/* Right Column - Module Showcase */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:block"
          >
            <div className="grid grid-cols-3 gap-4">
              {showcaseModules.map((module, index) => (
                <motion.div
                  key={module.id}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="cursor-pointer"
                >
                  <Link to={`/library/${module.id}`}>
                    <div
                      className="rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
                      style={{
                        aspectRatio: '3/4',
                        backgroundColor: module.coverColor,
                      }}
                    >
                      <img
                        src={module.coverImage}
                        alt={module.title}
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
