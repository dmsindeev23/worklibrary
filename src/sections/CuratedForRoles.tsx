import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { roles } from '@/data/modules';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function CuratedForRoles() {
  return (
    <section id="roles" className="section-padding bg-surface-2">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="font-heading text-h2-mobile md:text-h2 text-graphite">
            Для разных ролей
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {roles.map((role) => (
            <motion.div
              key={role.id}
              variants={cardVariants}
              className="card-base card-hover p-6"
            >
              <h3 className="font-heading text-h3-mobile md:text-h3 text-graphite mb-2">
                {role.name}
              </h3>
              <p className="text-small text-graphite-secondary mb-4">
                {role.description}
              </p>
              <ul className="space-y-2">
                {role.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" />
                    <span className="text-small text-graphite-secondary">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
