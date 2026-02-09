import type { FilterOption } from '@/types';

interface FilterChipsProps {
  options: FilterOption[];
  activeId: string;
  onChange: (id: string) => void;
}

export function FilterChips({ options, activeId, onChange }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`tag-default ${activeId === option.id ? 'tag-active' : 'hover:bg-lines/50'}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
