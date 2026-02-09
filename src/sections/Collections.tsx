import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { collections, modules } from '@/data/modules';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const shelfVariants = {
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

function CollectionShelf({ collection }: { collection: typeof collections[0] }) {
  const collectionModules = modules.filter(m => collection.moduleIds.includes(m.id));
  
  return (
    <motion.div variants={shelfVariants} className="mb-10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-heading text-h3-mobile md:text-h3 text-graphite mb-1">
            {collection.name}
          </h3>
          <p className="text-small text-graphite-secondary">
            {collection.description}
          </p>
        </div>
        <Link to={`/library?collection=${collection.id}`}>
          <Button variant="ghost" size="sm" className="text-forest hover:text-forest-hover">
            Все
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {collectionModules.map((module) => (
            <Link key={module.id} to={`/library/${module.id}`}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <div
                  className="w-[180px] h-[240px] rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
                  style={{ backgroundColor: module.coverColor }}
                >
                  <img
                    src={module.coverImage}
                    alt={module.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
                <p className="mt-2 text-small font-medium text-graphite truncate w-[180px]">
                  {module.title}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.div>
  );
}

export function CollectionsSection() {
  return (
    <section className="section-padding bg-paper">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="font-heading text-h2-mobile md:text-h2 text-graphite">
            Коллекции
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {collections.map((collection) => (
            <CollectionShelf key={collection.id} collection={collection} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
