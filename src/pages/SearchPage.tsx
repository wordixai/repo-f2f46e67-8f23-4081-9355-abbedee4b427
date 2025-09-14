import React, { useState, useMemo } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { MobileHeader } from '@/components/MobileHeader';
import { SearchInput } from '@/components/SearchInput';
import { SearchFilters, SearchFilter } from '@/components/SearchFilters';
import { SearchResults, SearchResult } from '@/components/SearchResults';
import { useSearch } from '@/hooks/useSearch';
import { 
  mockUsers, 
  mockPosts, 
  mockHashtags, 
  mockProducts, 
  convertToSearchResults 
} from '@/data/searchData';

export const SearchPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<SearchFilter>('all');
  
  const allSearchResults = useMemo(() => 
    convertToSearchResults(mockUsers, mockPosts, mockHashtags, mockProducts),
    []
  );

  const {
    searchQuery,
    setSearchQuery,
    filteredItems,
    isSearching,
    hasResults,
    clearSearch
  } = useSearch(allSearchResults, ['title', 'subtitle', 'data']);

  const filteredByType = useMemo(() => {
    if (activeFilter === 'all') return filteredItems;
    
    const typeMap: Record<SearchFilter, string> = {
      'all': '',
      'users': 'user',
      'posts': 'post',
      'hashtags': 'hashtag',
      'products': 'product'
    };
    
    return filteredItems.filter(item => item.type === typeMap[activeFilter]);
  }, [filteredItems, activeFilter]);

  const handleResultClick = (result: SearchResult) => {
    console.log('Clicked result:', result);
    // Navigate to specific page based on result type
    switch (result.type) {
      case 'user':
        // Navigate to user profile
        break;
      case 'post':
        // Navigate to post detail
        break;
      case 'hashtag':
        // Navigate to hashtag feed
        break;
      case 'product':
        // Navigate to product detail
        break;
    }
  };

  const renderTrendingSection = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Trending</h2>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-medium mb-2">Popular Hashtags</h3>
          <div className="flex flex-wrap gap-2">
            {mockHashtags.slice(0, 5).map(hashtag => (
              <div
                key={hashtag.id}
                className="px-3 py-1 bg-muted rounded-full text-sm cursor-pointer hover:bg-muted/80"
                onClick={() => setSearchQuery(hashtag.name)}
              >
                {hashtag.name}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Suggested Users</h3>
          <div className="space-y-2">
            {mockUsers.slice(0, 3).map(user => (
              <div
                key={user.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                onClick={() => setSearchQuery(user.name)}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <MobileLayout>
      <MobileHeader
        title="111 Search"
        showBack={false}
      />
      
      <div className="mobile-content">
        <div className="p-4 space-y-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search users, posts, hashtags..."
            autoFocus
            onClear={clearSearch}
          />
          
          {searchQuery && (
            <SearchFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          )}
        </div>

        {searchQuery ? (
          <SearchResults
            results={filteredByType}
            isLoading={isSearching}
            onResultClick={handleResultClick}
          />
        ) : (
          renderTrendingSection()
        )}
      </div>
    </MobileLayout>
  );
};