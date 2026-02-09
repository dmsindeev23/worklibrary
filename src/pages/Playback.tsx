import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Download, 
  FileText, 
  ListChecks,
  Play
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { modules } from '@/data/modules';

export function Playback() {
  const { id } = useParams<{ id: string }>();
  const { hasPurchased, hasSubscription } = useAuth();
  const [activeTab, setActiveTab] = useState('summary');

  const module = modules.find((m) => m.id === id);

  if (!module) {
    return (
      <div className="min-h-screen bg-paper">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-main text-center">
            <h1 className="font-heading text-h2 text-graphite mb-4">
              Модуль не найден
            </h1>
            <Link to="/dashboard">
              <Button className="btn-primary">В мою библиотеку</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!hasPurchased(module.id) && !hasSubscription()) {
    return (
      <div className="min-h-screen bg-paper">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-main text-center">
            <h1 className="font-heading text-h2 text-graphite mb-4">
              Требуется покупка
            </h1>
            <p className="text-body text-graphite-secondary mb-6">
              Этот модуль не в вашей библиотеке.
            </p>
            <Link to={`/library/${module.id}`}>
              <Button className="btn-primary">К модулю</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedModules = modules
    .filter((m) => m.collectionId === module.collectionId && m.id !== module.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-main">
          {/* Back Link */}
          <Link
            to="/dashboard"
            className="inline-flex items-center text-small text-graphite-secondary hover:text-forest transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Назад в библиотеку
          </Link>

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="aspect-video bg-graphite rounded-card overflow-hidden relative">
              {/* Placeholder for video player */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-white/60 text-small">
                    Нажмите для воспроизведения • {module.duration} мин
                  </p>
                </div>
              </div>
              
              {/* Video title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h1 className="font-heading text-h3 text-white mb-2">
                  {module.title}
                </h1>
                <p className="text-white/70 text-small">
                  {module.topic} • {module.duration} минут
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-2"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-surface-2 border border-lines mb-6">
                  <TabsTrigger value="summary">Конспект</TabsTrigger>
                  <TabsTrigger value="materials">Материалы</TabsTrigger>
                  <TabsTrigger value="notes">Заметки</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="mt-0">
                  <div className="card-base">
                    <h3 className="font-heading text-h4 text-graphite mb-4">
                      Конспект модуля
                    </h3>
                    <p className="text-body text-graphite-secondary mb-6">
                      {module.description}
                    </p>
                    
                    <h4 className="font-heading text-h4 text-graphite mb-3">
                      Результат обучения
                    </h4>
                    <p className="text-body text-graphite-secondary">
                      {module.outcome}
                    </p>

                    {module.summary && (
                      <>
                        <h4 className="font-heading text-h4 text-graphite mt-6 mb-3">
                          Ключевые выводы
                        </h4>
                        <p className="text-body text-graphite-secondary">
                          {module.summary}
                        </p>
                      </>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="materials" className="mt-0">
                  <div className="card-base">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-heading text-h4 text-graphite">
                        Материалы для скачивания
                      </h3>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Скачать все
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {module.materials.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center justify-between p-4 bg-surface-2 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {material.type === 'checklist' ? (
                              <ListChecks className="w-5 h-5 text-forest" />
                            ) : (
                              <FileText className="w-5 h-5 text-forest" />
                            )}
                            <span className="text-body text-graphite">
                              {material.name}
                            </span>
                            <span className="tag-default uppercase">
                              {material.type === 'checklist' ? 'Чек-лист' : 
                               material.type === 'template' ? 'Шаблон' : 'PDF'}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Скачать
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="mt-0">
                  <div className="card-base">
                    <h3 className="font-heading text-h4 text-graphite mb-4">
                      Ваши заметки
                    </h3>
                    <p className="text-body text-graphite-secondary mb-4">
                      Делайте заметки во время просмотра модуля. Они будут сохранены здесь для будущего использования.
                    </p>
                    <textarea
                      className="w-full h-48 p-4 rounded-card border border-lines bg-white resize-none focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20"
                      placeholder="Начните писать заметки..."
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="font-heading text-h4 text-graphite mb-4">
                Похожие модули
              </h3>
              <div className="space-y-4">
                {relatedModules.map((m) => (
                  <Link key={m.id} to={`/dashboard/playback/${m.id}`}>
                    <div className="card-base card-hover p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-12 h-16 rounded flex-shrink-0 overflow-hidden"
                          style={{ backgroundColor: m.coverColor }}
                        >
                          <img
                            src={m.coverImage}
                            alt={m.title}
                            className="w-full h-full object-cover opacity-90"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-small font-medium text-graphite truncate">
                            {m.title}
                          </h4>
                          <p className="text-micro text-graphite-secondary">
                            {m.topic} • {m.duration} мин
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
