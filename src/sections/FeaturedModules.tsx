import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, FileText, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { modules } from '@/data/modules';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
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

export function FeaturedModules() {
  const featuredModules = modules.slice(0, 3);

  return (
    <section className="section-padding bg-surface-2">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="font-heading text-h2-mobile md:text-h2 text-graphite">
            Популярные модули
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredModules.map((module) => (
            <motion.div
              key={module.id}
              variants={cardVariants}
              className="card-base card-hover overflow-hidden"
            >
              <Link to={`/library/${module.id}`}>
                <div
                  className="h-48 rounded-t-lg overflow-hidden mb-4 -mx-5 -mt-5"
                  style={{ backgroundColor: module.coverColor }}
                >
                  <img
                    src={module.coverImage}
                    alt={module.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
                
                <h3 className="font-heading text-h4 text-graphite mb-2">
                  {module.title}
                </h3>
                
                <p className="text-small text-graphite-secondary mb-4 line-clamp-2">
                  {module.outcome}
                </p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-micro text-graphite-secondary">
                    <Play className="w-3.5 h-3.5" />
                    Видео
                  </div>
                  <div className="flex items-center gap-1.5 text-micro text-graphite-secondary">
                    <ListChecks className="w-3.5 h-3.5" />
                    Чек-лист
                  </div>
                  <div className="flex items-center gap-1.5 text-micro text-graphite-secondary">
                    <FileText className="w-3.5 h-3.5" />
                    Шаблон
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Предпросмотр
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
