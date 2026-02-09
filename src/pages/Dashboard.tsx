import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Play, 
  Download, 
  ChevronRight,
  Library,
  FolderOpen,
  User,
  Crown
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { modules, collections } from '@/data/modules';

const sidebarItems = [
  { icon: Library, label: 'Моя библиотека', href: '/dashboard' },
  { icon: Play, label: 'Продолжить', href: '/dashboard' },
  { icon: FolderOpen, label: 'Коллекции', href: '/dashboard/collections' },
  { icon: Download, label: 'Загрузки', href: '/dashboard/downloads' },
  { icon: Crown, label: 'Подписка', href: '/subscription' },
  { icon: User, label: 'Аккаунт', href: '#' },
];

export function Dashboard() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const purchasedModules = modules.filter((m) =>
    user?.purchasedModules.includes(m.id)
  );

  const filteredModules = searchQuery
    ? purchasedModules.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.topic.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : purchasedModules;

  const inProgressModules = purchasedModules.filter(
    (m) => {
      const progress = user?.moduleProgress[m.id] || 0;
      return progress > 0 && progress < 100;
    }
  );

  const recentModules = purchasedModules.slice(0, 3);

  const userCollections = collections.filter((c) =>
    c.moduleIds.some((id) => user?.purchasedModules.includes(id))
  );

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
              transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
              className="lg:w-60 flex-shrink-0"
            >
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-body transition-colors ${
                      item.href === '/dashboard'
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
              transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
              className="flex-1"
            >
              <h1 className="font-heading text-h1-mobile md:text-h2 text-graphite mb-8">
                Моя библиотека
              </h1>

              {/* Search */}
              <div className="relative mb-10">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-graphite-secondary" />
                <Input
                  type="text"
                  placeholder="Поиск в вашей библиотеке..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-base pl-12"
                />
              </div>

              {purchasedModules.length === 0 ? (
                <div className="card-base text-center py-16">
                  <Library className="w-16 h-16 mx-auto mb-4 text-graphite-secondary/50" />
                  <h3 className="font-heading text-h4 text-graphite mb-2">
                    Ваша библиотека пуста
                  </h3>
                  <p className="text-body text-graphite-secondary mb-6">
                    Изучите наши коллекции, чтобы найти модули для вашей команды.
                  </p>
                  <Link to="/library">
                    <Button className="btn-primary">В библиотеку</Button>
                  </Link>
                </div>
              ) : (
                <>
                  {/* Continue Watching */}
                  {inProgressModules.length > 0 && !searchQuery && (
                    <div className="mb-10">
                      <h2 className="font-heading text-h4 text-graphite mb-4">
                        Продолжить просмотр
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {inProgressModules.slice(0, 3).map((module) => {
                          const progress = user?.moduleProgress[module.id] || 0;
                          return (
                            <Link key={module.id} to={`/dashboard/playback/${module.id}`}>
                              <div className="card-base card-hover">
                                <div className="flex items-start gap-4 mb-4">
                                  <div
                                    className="w-16 h-20 rounded-lg flex-shrink-0 overflow-hidden"
                                    style={{ backgroundColor: module.coverColor }}
                                  >
                                    <img
                                      src={module.coverImage}
                                      alt={module.title}
                                      className="w-full h-full object-cover opacity-90"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-body font-medium text-graphite truncate">
                                      {module.title}
                                    </h4>
                                    <p className="text-small text-graphite-secondary">
                                      {progress}% просмотрено
                                    </p>
                                  </div>
                                </div>
                                <Progress value={progress} className="h-1" />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Recently Added */}
                  {!searchQuery && (
                    <div className="mb-10">
                      <h2 className="font-heading text-h4 text-graphite mb-4">
                        Недавно добавленные
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recentModules.map((module) => (
                          <Link key={module.id} to={`/dashboard/playback/${module.id}`}>
                            <div className="card-base card-hover">
                              <div className="flex items-start gap-4">
                                <div
                                  className="w-16 h-20 rounded-lg flex-shrink-0 overflow-hidden"
                                  style={{ backgroundColor: module.coverColor }}
                                >
                                  <img
                                    src={module.coverImage}
                                    alt={module.title}
                                    className="w-full h-full object-cover opacity-90"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-body font-medium text-graphite truncate">
                                    {module.title}
                                  </h4>
                                  <p className="text-small text-graphite-secondary">
                                    {module.topic} • {module.duration} мин
                                  </p>
                                  <div className="flex items-center gap-2 mt-3">
                                    <Button size="sm" className="btn-primary">
                                      <Play className="w-4 h-4 mr-1" />
                                      Смотреть
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Modules / Search Results */}
                  <div>
                    <h2 className="font-heading text-h4 text-graphite mb-4">
                      {searchQuery ? 'Результаты поиска' : 'Все модули'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredModules.map((module) => (
                        <Link key={module.id} to={`/dashboard/playback/${module.id}`}>
                          <div className="card-base card-hover">
                            <div className="flex items-start gap-4">
                              <div
                                className="w-16 h-20 rounded-lg flex-shrink-0 overflow-hidden"
                                style={{ backgroundColor: module.coverColor }}
                              >
                                <img
                                  src={module.coverImage}
                                  alt={module.title}
                                  className="w-full h-full object-cover opacity-90"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-body font-medium text-graphite truncate">
                                  {module.title}
                                </h4>
                                <p className="text-small text-graphite-secondary">
                                  {module.topic} • {module.duration} мин
                                </p>
                                <div className="flex items-center gap-2 mt-3">
                                  <Button size="sm" className="btn-primary">
                                    <Play className="w-4 h-4 mr-1" />
                                    Смотреть
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Your Collections */}
                  {userCollections.length > 0 && !searchQuery && (
                    <div className="mt-10">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="font-heading text-h4 text-graphite">
                          Ваши коллекции
                        </h2>
                        <Link to="/dashboard/collections">
                          <Button variant="ghost" size="sm" className="text-forest">
                            Все
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userCollections.slice(0, 2).map((collection) => (
                          <div key={collection.id} className="card-base card-hover">
                            <div className="flex items-center gap-3">
                              <FolderOpen className="w-8 h-8 text-forest" />
                              <div>
                                <h4 className="text-body font-medium text-graphite">
                                  {collection.name}
                                </h4>
                                <p className="text-small text-graphite-secondary">
                                  {collection.moduleIds.filter((id) =>
                                    user?.purchasedModules.includes(id)
                                  ).length}{' '}
                                  из {collection.moduleIds.length} модулей
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
