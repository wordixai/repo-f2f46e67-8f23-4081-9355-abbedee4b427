import { useState, useMemo } from 'react';

export interface SearchResult {
  id: string;
  type: 'user' | 'post' | 'hashtag' | 'product';
  title: string;
  subtitle?: string;
  image?: string;
  data: any;
}

export const useSearch = <T>(items: T[], searchFields: (keyof T)[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;

    setIsSearching(true);
    
    const query = searchQuery.toLowerCase();
    const filtered = items.filter((item) => {
      return searchFields.some((field) => {
        const fieldValue = item[field];
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(query);
        }
        if (typeof fieldValue === 'object' && fieldValue !== null) {
          return JSON.stringify(fieldValue).toLowerCase().includes(query);
        }
        return false;
      });
    });

    setTimeout(() => setIsSearching(false), 300);
    return filtered;
  }, [items, searchQuery, searchFields]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    isSearching,
    hasResults: filteredItems.length > 0,
    clearSearch: () => setSearchQuery('')
  };
};