import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type SearchFilter = 'all' | 'users' | 'posts' | 'hashtags' | 'products';

interface SearchFiltersProps {
  activeFilter: SearchFilter;
  onFilterChange: (filter: SearchFilter) => void;
  className?: string;
}

const filters: { key: SearchFilter; label: string; count?: number }[] = [
  { key: 'all', label: 'All' },
  { key: 'users', label: 'People' },
  { key: 'posts', label: 'Posts' },
  { key: 'hashtags', label: 'Tags' },
  { key: 'products', label: 'Products' },
];

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  activeFilter,
  onFilterChange,
  className
}) => {
  return (
    <div className={cn("flex space-x-2 overflow-x-auto pb-2", className)}>
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? "default" : "outline"}
          size="sm"
          className={cn(
            "whitespace-nowrap",
            activeFilter === filter.key && "bg-primary text-primary-foreground"
          )}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
          {filter.count && (
            <span className="ml-1 text-xs">({filter.count})</span>
          )}
        </Button>
      ))}
    </div>
  );
};