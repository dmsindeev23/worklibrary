import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  Plus, 
  Check, 
  Clock, 
  Users, 
  BarChart3, 
  FileText, 
  ListChecks,
  ChevronRight,
  Download
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { modules, collections } from '@/data/modules';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ModuleCover } from '@/components/ModuleCover';

export function ModuleDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem, removeItem, isInCart } = useCart();
  const { hasPurchased, addPurchase, hasSubscription } = useAuth();
  const [, setShowPreview] = useState(false);

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
            <Link to="/library">
              <Button className="btn-primary">В библиотеку</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isAdded = isInCart(module.id);
  const isPurchased = hasPurchased(module.id) || hasSubscription();
  const collection = collections.find((c) => c.id === module.collectionId);
  const relatedModules = modules
    .filter((m) => m.collectionId === module.collectionId && m.id !== module.id)
    .slice(0, 3);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdded) {
      removeItem(module.id);
    } else {
      addItem(module.id);
    }
  };

  const handleBuy = () => {
    addPurchase(module.id);
  };

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-main">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-small text-graphite-secondary mb-8"
          >
            <Link to="/library" className="hover:text-forest transition-colors">
              Библиотека
            </Link>
            <ChevronRight className="w-4 h-4" />
            {collection && (
              <>
                <Link 
                  to={`/library?collection=${collection.id}`} 
                  className="hover:text-forest transition-colors"
                >
                  {collection.name}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-graphite">{module.title}</span>
          </motion.nav>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div
                className="aspect-[3/4] max-w-md rounded-card overflow-hidden shadow-card"
                style={{ backgroundColor: module.coverColor }}
              >
                <img
                  src={module.coverImage}
                  alt={module.title}
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="font-heading text-h1-mobile md:text-h2 text-graphite mb-4">
                {module.title}
              </h1>

              <p className="text-body-lg text-graphite-secondary mb-6">
                {module.outcome}
              </p>

              {/* What's Inside */}
              <div className="mb-6">
                <h4 className="text-small font-semibold text-graphite uppercase tracking-wide mb-3">
                  Что внутри
                </h4>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-small text-graphite-secondary">
                    <Play className="w-4 h-4" />
                    Видео-урок
                  </div>
                  <div className="flex items-center gap-2 text-small text-graphite-secondary">
                    <ListChecks className="w-4 h-4" />
                    Чек-лист
                  </div>
                  <div className="flex items-center gap-2 text-small text-graphite-secondary">
                    <FileText className="w-4 h-4" />
                    Шаблон
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-small text-graphite-secondary">
                  <Clock className="w-4 h-4" />
                  {module.duration} минут
                </div>
                <div className="flex items-center gap-2 text-small text-graphite-secondary">
                  <Users className="w-4 h-4" />
                  Для: {module.bestFor.join(', ')}
                </div>
                <div className="flex items-center gap-2 text-small text-graphite-secondary">
                  <BarChart3 className="w-4 h-4" />
                  Уровень: <span className="capitalize">
                    {module.level === 'beginner' ? 'Начинающий' : 
                     module.level === 'intermediate' ? 'Средний' : 'Продвинутый'}
                  </span>
                </div>
              </div>

              {/* Price */}
              {module.price > 0 && (
                <div className="mb-8">
                  <span className="font-heading text-h3 text-graphite">
                    {module.price.toLocaleString()} ₽
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                {!isPurchased && module.price > 0 ? (
                  <>
                    <Button
                      variant="outline"
                      className="btn-secondary"
                      onClick={() => setShowPreview(true)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Предпросмотр
                    </Button>
                    <Button className="btn-primary" onClick={handleBuy}>
                      Купить
                    </Button>
                    <Button
                      variant="outline"
                      className={isAdded ? 'bg-forest text-white' : ''}
                      onClick={handleAddToCart}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Добавлено
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          В корзину
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <Link to={`/dashboard/playback/${module.id}`}>
                    <Button className="btn-primary">
                      <Play className="w-4 h-4 mr-2" />
                      Смотреть
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <Tabs defaultValue="overview" className="mb-16">
              <TabsList className="bg-surface-2 border border-lines mb-6">
                <TabsTrigger value="overview">Описание</TabsTrigger>
                <TabsTrigger value="materials">Материалы</TabsTrigger>
                <TabsTrigger value="notes">Конспект</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <div className="card-base">
                  <h3 className="font-heading text-h4 text-graphite mb-4">
                    Об этом модуле
                  </h3>
                  <p className="text-body text-graphite-secondary">
                    {module.description}
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
                    {isPurchased && module.materials.length > 0 && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Скачать все
                      </Button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {module.materials.map((material) => (
                      <div
                        key={material.id}
                        className="flex items-center justify-between p-4 bg-surface-2 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-graphite-secondary" />
                          <span className="text-body text-graphite">
                            {material.name}
                          </span>
                          <span className="tag-default">
                            {material.type === 'checklist' ? 'Чек-лист' : 
                             material.type === 'template' ? 'Шаблон' : 'PDF'}
                          </span>
                        </div>
                        {isPurchased ? (
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Скачать
                          </Button>
                        ) : (
                          <span className="text-small text-graphite-secondary">
                            Доступно после покупки
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notes" className="mt-0">
                <div className="card-base">
                  <h3 className="font-heading text-h4 text-graphite mb-4">
                    Конспект модуля
                  </h3>
                  <p className="text-body text-graphite-secondary">
                    Краткое изложение ключевых концепций, рассмотренных в этом модуле.
                    Доступно после покупки.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Related Modules */}
          {relatedModules.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              <h2 className="font-heading text-h3 text-graphite mb-6">
                Похожие модули
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedModules.map((m) => (
                  <ModuleCover key={m.id} module={m} variant="md" />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
