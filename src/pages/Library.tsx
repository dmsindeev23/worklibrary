import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List as ListIcon } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchBar } from '@/components/SearchBar';
import { FilterChips } from '@/components/FilterChips';
import { ModuleCover } from '@/components/ModuleCover';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { modules, filterOptions } from '@/data/modules';
import type { ViewMode } from '@/types';

export function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRole, setActiveRole] = useState('all');
  const [activeTopic, setActiveTopic] = useState('all');
  const [activeDuration, setActiveDuration] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('covers');
  const [isLoading] = useState(false);

  const filteredModules = useMemo(() => {
    let result = modules;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.outcome.toLowerCase().includes(query) ||
          m.topic.toLowerCase().includes(query)
      );
    }

    // Role filter
    if (activeRole !== 'all') {
      result = result.filter((m) => m.bestFor.includes(activeRole));
    }

    // Topic filter
    if (activeTopic !== 'all') {
      result = result.filter((m) => m.topic === activeTopic);
    }

    // Duration filter
    if (activeDuration !== 'all') {
      result = result.filter((m) => {
        if (activeDuration === 'short') return m.duration < 10;
        if (activeDuration === 'medium') return m.duration >= 10 && m.duration <= 12;
        if (activeDuration === 'long') return m.duration > 12;
        return true;
      });
    }

    // Level filter
    if (activeLevel !== 'all') {
      result = result.filter((m) => m.level === activeLevel);
    }

    return result;
  }, [searchQuery, activeRole, activeTopic, activeDuration, activeLevel]);

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-main">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
            className="mb-10"
          >
            <h1 className="font-heading text-h1-mobile md:text-h1 text-graphite mb-8">
              Библиотека
            </h1>

            {/* Search */}
            <SearchBar
              placeholder="Поиск модулей, тем, ролей..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="mb-6"
            />

            {/* Filters */}
            <div className="flex flex-wrap gap-6 mb-4">
              <div>
                <span className="text-micro text-graphite-secondary uppercase tracking-wide mb-2 block">
                  Роль
                </span>
                <FilterChips
                  options={filterOptions.role}
                  activeId={activeRole}
                  onChange={setActiveRole}
                />
              </div>
              <div>
                <span className="text-micro text-graphite-secondary uppercase tracking-wide mb-2 block">
                  Тема
                </span>
                <FilterChips
                  options={filterOptions.topic}
                  activeId={activeTopic}
                  onChange={setActiveTopic}
                />
              </div>
              <div>
                <span className="text-micro text-graphite-secondary uppercase tracking-wide mb-2 block">
                  Длительность
                </span>
                <FilterChips
                  options={filterOptions.duration}
                  activeId={activeDuration}
                  onChange={setActiveDuration}
                />
              </div>
              <div>
                <span className="text-micro text-graphite-secondary uppercase tracking-wide mb-2 block">
                  Уровень
                </span>
                <FilterChips
                  options={filterOptions.level}
                  activeId={activeLevel}
                  onChange={setActiveLevel}
                />
              </div>
            </div>

            {/* View Toggle & Results Count */}
            <div className="flex items-center justify-between">
              <span className="text-small text-graphite-secondary">
                {filteredModules.length} модулей
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'covers' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('covers')}
                  className={viewMode === 'covers' ? 'bg-forest' : ''}
                >
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Обложки
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-forest' : ''}
                >
                  <ListIcon className="w-4 h-4 mr-2" />
                  Список
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Module Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-[320px] rounded-card" />
              ))}
            </div>
          ) : filteredModules.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`grid gap-8 ${
                viewMode === 'covers'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}
            >
              {filteredModules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0, 0, 0.2, 1],
                  }}
                  className="flex justify-center"
                >
                  {viewMode === 'covers' ? (
                    <ModuleCover module={module} variant="md" />
                  ) : (
                    <div className="card-base card-hover flex gap-6 w-full">
                      <div
                        className="w-32 h-40 rounded-lg flex-shrink-0 overflow-hidden"
                        style={{ backgroundColor: module.coverColor }}
                      >
                        <img
                          src={module.coverImage}
                          alt={module.title}
                          className="w-full h-full object-cover opacity-90"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-h4 text-graphite mb-2">
                          {module.title}
                        </h3>
                        <p className="text-small text-graphite-secondary mb-3">
                          {module.outcome}
                        </p>
                        <div className="flex items-center gap-4 text-micro text-graphite-secondary">
                          <span>{module.topic}</span>
                          <span>•</span>
                          <span>{module.duration} мин</span>
                          <span>•</span>
                          <span className="capitalize">{module.level}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-body text-graphite-secondary mb-4">
                Модули не найдены. Попробуйте изменить фильтры.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setActiveRole('all');
                  setActiveTopic('all');
                  setActiveDuration('all');
                  setActiveLevel('all');
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
