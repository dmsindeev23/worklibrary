import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const beliefs = [
  {
    title: 'Практичность важнее теории',
    description: 'Каждый урок построен на реальном опыте. Вы получаете инструменты, которые работают, а не абстрактные концепции.',
  },
  {
    title: 'Маленькие изменения, большой эффект',
    description: 'Микро-уроки позволяют учиться и применять сразу. Не нужно выделять часы.',
  },
  {
    title: 'Покупайте то, что нужно',
    description: 'Никаких подписок, никакого лишнего. Покупайте именно те модули, которые нужны вашей команде.',
  },
];

const experience = [
  '15+ лет в People Operations',
  'Выстроил команды в 3 стартапах от 10 до 200+ человек',
  'Консультант для 20+ растущих компаний',
  'Обучил 500+ менеджеров и руководителей',
];

export function About() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-main max-w-4xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-h1-mobile md:text-h1 text-graphite mb-6">
              О Curated Library
            </h1>
            <p className="text-body-lg text-graphite-secondary max-w-2xl mx-auto">
              Коллекция практичных микро-уроков для работодателей, которые хотят выстраивать сильные команды.
            </p>
          </motion.div>

          {/* Author Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"
          >
            {/* Photo */}
            <div className="aspect-[4/5] max-w-sm mx-auto md:mx-0 bg-lines rounded-card overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-lines to-surface-2">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-graphite/10 flex items-center justify-center">
                    <span className="font-heading text-3xl text-graphite-secondary">А</span>
                  </div>
                  <p className="text-small text-graphite-secondary">Фото автора</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h2 className="font-heading text-h3 text-graphite mb-4">
                Привет, я Алекс
              </h2>
              <p className="text-body text-graphite-secondary mb-6">
                Последние 15 лет я помогаю компаниям выстраивать команды, которые процветают. 
                От стартапов, только что нашедших product-market fit, до растущих компаний, 
                которые масштабируются — я видел, что работает, а что нет.
              </p>
              <p className="text-body text-graphite-secondary mb-6">
                Curated Library — мой способ поделиться этим опытом. Каждый модуль построен на 
                реальных ситуациях, с которыми я сталкивался, отточен годами практики.
              </p>

              <h3 className="font-heading text-h4 text-graphite mb-3">
                Опыт
              </h3>
              <ul className="space-y-2">
                {experience.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest mt-2 flex-shrink-0" />
                    <span className="text-body text-graphite-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Beliefs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-20"
          >
            <h2 className="font-heading text-h3 text-graphite mb-8 text-center">
              Во что я верю
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {beliefs.map((belief, index) => (
                <div key={index} className="card-base text-center">
                  <h3 className="font-heading text-h4 text-graphite mb-3">
                    {belief.title}
                  </h3>
                  <p className="text-small text-graphite-secondary">
                    {belief.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="card-base bg-forest-soft text-center"
          >
            <h2 className="font-heading text-h3 text-graphite mb-4">
              Хотите работать вместе?
            </h2>
            <p className="text-body text-graphite-secondary mb-6 max-w-lg mx-auto">
              Я предлагаю кастомные программы обучения и консультации для команд, 
              которым нужно больше, чем готовые решения.
            </p>
            <a 
              href="mailto:hello@curatedlibrary.com"
              className="inline-flex items-center justify-center h-11 px-5 rounded-button bg-forest text-white font-medium text-base hover:bg-forest-hover transition-colors"
            >
              Связаться
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
