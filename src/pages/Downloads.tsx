import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  ListChecks, 
  FolderOpen,
  Lock
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { modules } from '@/data/modules';
import { FilterChips } from '@/components/FilterChips';

const sidebarItems = [
  { icon: FolderOpen, label: 'Моя библиотека', href: '/dashboard' },
  { icon: FolderOpen, label: 'Продолжить', href: '/dashboard' },
  { icon: FolderOpen, label: 'Коллекции', href: '/dashboard/collections' },
  { icon: FolderOpen, label: 'Загрузки', href: '/dashboard/downloads', active: true },
  { icon: Lock, label: 'Аккаунт', href: '#' },
];

const typeFilters = [
  { id: 'all', label: 'Все файлы' },
  { id: 'checklist', label: 'Чек-листы' },
  { id: 'template', label: 'Шаблоны' },
  { id: 'pdf', label: 'PDF' },
];

export function DownloadsPage() {
  const { user } = useAuth();
  const [activeType, setActiveType] = useState('all');

  const purchasedModules = modules.filter((m) =>
    user?.purchasedModules.includes(m.id)
  );

  const allMaterials = useMemo(() => {
    let materials: Array<{
      id: string;
      name: string;
      type: 'checklist' | 'template' | 'pdf';
      moduleTitle: string;
      moduleId: string;
    }> = [];

    purchasedModules.forEach((module) => {
      module.materials.forEach((material) => {
        materials.push({
          ...material,
          moduleTitle: module.title,
          moduleId: module.id,
        });
      });
    });

    if (activeType !== 'all') {
      materials = materials.filter((m) => m.type === activeType);
    }

    return materials;
  }, [purchasedModules, activeType]);

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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h1 className="font-heading text-h1-mobile md:text-h2 text-graphite">
                  Загрузки
                </h1>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Скачать все
                </Button>
              </div>

              {/* Filters */}
              <div className="mb-6">
                <FilterChips
                  options={typeFilters}
                  activeId={activeType}
                  onChange={setActiveType}
                />
              </div>

              {allMaterials.length === 0 ? (
                <div className="card-base text-center py-16">
                  <FolderOpen className="w-16 h-16 mx-auto mb-4 text-graphite-secondary/50" />
                  <h3 className="font-heading text-h4 text-graphite mb-2">
                    Пока нет загрузок
                  </h3>
                  <p className="text-body text-graphite-secondary mb-6">
                    Купите модули, чтобы получить доступ к их материалам.
                  </p>
                  <Link to="/library">
                    <Button className="btn-primary">В библиотеку</Button>
                  </Link>
                </div>
              ) : (
                <div className="card-base">
                  <div className="space-y-2">
                    {allMaterials.map((material, index) => (
                      <motion.div
                        key={material.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                          ease: "easeOut",
                        }}
                        className="flex items-center justify-between p-4 rounded-lg hover:bg-surface-2 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-forest-soft flex items-center justify-center flex-shrink-0">
                            {material.type === 'checklist' ? (
                              <ListChecks className="w-5 h-5 text-forest" />
                            ) : (
                              <FileText className="w-5 h-5 text-forest" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-body font-medium text-graphite">
                              {material.name}
                            </h4>
                            <p className="text-small text-graphite-secondary">
                              Из: {material.moduleTitle}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="tag-default uppercase">
                            {material.type === 'checklist' ? 'Чек-лист' : 
                             material.type === 'template' ? 'Шаблон' : 'PDF'}
                          </span>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Скачать
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
