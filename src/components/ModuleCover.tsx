import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Plus, Check } from 'lucide-react';
import type { Module } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface ModuleCoverProps {
  module: Module;
  variant?: 'sm' | 'md' | 'lg';
  showActions?: boolean;
}

export function ModuleCover({ module, variant = 'md', showActions = true }: ModuleCoverProps) {
  const { addItem, removeItem, isInCart } = useCart();
  const { hasPurchased, hasSubscription } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const isAdded = isInCart(module.id);
  const isPurchased = hasPurchased(module.id) || hasSubscription();

  const dimensions = {
    sm: { width: 120, height: 160 },
    md: { width: 240, height: 320 },
    lg: { width: 280, height: 380 },
  };

  const { width, height } = dimensions[variant];
  const isSmall = variant === 'sm';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdded) {
      removeItem(module.id);
    } else {
      addItem(module.id);
    }
  };

  return (
    <Link to={`/library/${module.id}`}>
      <motion.div
        className="relative cursor-pointer"
        style={{ width, height }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div
          className="w-full rounded-card overflow-hidden shadow-card transition-shadow duration-300"
          style={{
            height: isSmall ? '100%' : '75%',
            backgroundColor: module.coverColor,
          }}
        >
          {/* Cover Image */}
          <img
            src={module.coverImage}
            alt={module.title}
            className="w-full h-full object-cover opacity-90"
          />
          
          {/* Hover Overlay */}
          {!isSmall && showActions && (
            <motion.div
              className="absolute inset-0 bg-graphite/60 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-graphite"
              >
                <Play className="w-4 h-4 mr-1" />
                Смотреть
              </Button>
            </motion.div>
          )}
        </div>

        {/* Content Area */}
        {!isSmall && (
          <div className="bg-white border border-lines border-t-0 rounded-b-card p-4">
            <h4 className="font-heading text-h4 text-graphite line-clamp-1 mb-1">
              {module.title}
            </h4>
            <p className="text-small text-graphite-secondary line-clamp-1 mb-3">
              {module.outcome}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-micro text-graphite-secondary uppercase tracking-wide">
                {module.topic} • {module.duration} мин
              </span>
              
              {showActions && !isPurchased && module.price > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    size="sm"
                    variant={isAdded ? "default" : "outline"}
                    className={isAdded ? "bg-forest" : ""}
                    onClick={handleAddToCart}
                  >
                    {isAdded ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </Button>
                </motion.div>
              )}
              
              {isPurchased && (
                <span className="text-micro text-forest font-medium">
                  В библиотеке
                </span>
              )}
              
              {module.price === 0 && !isPurchased && (
                <span className="text-micro text-forest font-medium">
                  Бесплатно
                </span>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </Link>
  );
}
