import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderOpen, ChevronRight, Lock } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { modules, collections } from '@/data/modules';

const sidebarItems = [
  { icon: FolderOpen, label: 'Моя библиотека', href: '/dashboard' },
  { icon: FolderOpen, label: 'Продолжить', href: '/dashboard' },
  { icon: FolderOpen, label: 'Коллекции', href: '/dashboard/collections', active: true },
  { icon: FolderOpen, label: 'Загрузки', href: '/dashboard/downloads' },
  { icon: Lock, label: 'Аккаунт', href: '#' },
];

export function CollectionsPage() {
  const { user } = useAuth();

  const userCollections = collections.map((collection) => {
    const collectionModules = modules.filter((m) =>
      collection.moduleIds.includes(m.id)
    );
    const purchasedCount = collectionModules.filter((m) =>
      user?.purchasedModules.includes(m.id)
    ).length;
    const totalCount = collectionModules.length;
    const isComplete = purchasedCount === totalCount;

    return {
      ...collection,
      modules: collectionModules,
      purchasedCount,
      totalCount,
      isComplete,
    };
  });

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:w-60 flex-shrink-0"
            >
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-body transition-colors ${
                      item.active
                        ? 'bg-forest-soft text-forest'
                        : 'text-graphite-secondary hover:bg-surface-2 hover:text-graphite'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex-1"
            >
              <h1 className="font-heading text-h1-mobile md:text-h2 text-graphite mb-8">
                Мои коллекции
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userCollections.map((collection) => (
                  <motion.div
                    key={collection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="card-base"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-forest-soft flex items-center justify-center">
                          <FolderOpen className="w-6 h-6 text-forest" />
                        </div>
                        <div>
                          <h3 className="font-heading text-h4 text-graphite">
                            {collection.name}
                          </h3>
                          <p className="text-small text-graphite-secondary">
                            {collection.description}
                          </p>
                        </div>
                      </div>
                      {collection.isComplete && (
                        <span className="tag-active">Завершено</span>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-small mb-2">
                        <span className="text-graphite-secondary">
                          Прогресс
                        </span>
                        <span className="text-graphite font-medium">
                          {collection.purchasedCount} / {collection.totalCount}
                        </span>
                      </div>
                      <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-forest rounded-full transition-all duration-500"
                          style={{
                            width: `${(collection.purchasedCount / collection.totalCount) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      {collection.modules.slice(0, 3).map((module) => {
                        const isPurchased = user?.purchasedModules.includes(module.id);
                        return (
                          <Link
                            key={module.id}
                            to={
                              isPurchased
                                ? `/dashboard/playback/${module.id}`
                                : `/library/${module.id}`
                            }
                          >
                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-2 transition-colors">
                              <div
                                className="w-10 h-14 rounded flex-shrink-0 overflow-hidden"
                                style={{ backgroundColor: module.coverColor }}
                              >
                                <img
                                  src={module.coverImage}
                                  alt={module.title}
                                  className="w-full h-full object-cover opacity-90"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-small font-medium text-graphite truncate">
                                  {module.title}
                                </h4>
                                <p className="text-micro text-graphite-secondary">
                                  {module.duration} мин
                                </p>
                              </div>
                              {isPurchased ? (
                                <span className="text-micro text-forest">Куплено</span>
                              ) : (
                                <span className="text-micro text-graphite-secondary">
                                  {module.price > 0 ? `${module.price.toLocaleString()} ₽` : 'Бесплатно'}
                                </span>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                      {collection.modules.length > 3 && (
                        <Link to="/library">
                          <Button variant="ghost" size="sm" className="w-full text-forest">
                            Все {collection.modules.length} модулей
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
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
