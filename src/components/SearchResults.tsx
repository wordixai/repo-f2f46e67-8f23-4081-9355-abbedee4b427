import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Hash, User, Image as ImageIcon, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchResult {
  id: string;
  type: 'user' | 'post' | 'hashtag' | 'product';
  title: string;
  subtitle?: string;
  image?: string;
  badge?: string;
  data: any;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading?: boolean;
  onResultClick: (result: SearchResult) => void;
  className?: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading = false,
  onResultClick,
  className
}) => {
  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'user': return <User className="h-4 w-4" />;
      case 'post': return <ImageIcon className="h-4 w-4" />;
      case 'hashtag': return <Hash className="h-4 w-4" />;
      case 'product': return <Package className="h-4 w-4" />;
      default: return null;
    }
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'user': return 'bg-blue-100 text-blue-800';
      case 'post': return 'bg-green-100 text-green-800';
      case 'hashtag': return 'bg-purple-100 text-purple-800';
      case 'product': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className={cn("space-y-3 p-4", className)}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex items-center space-x-3 animate-pulse">
            <div className="w-12 h-12 bg-muted rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No results found</h3>
        <p className="text-muted-foreground">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className={cn("divide-y divide-border", className)}>
      {results.map((result) => (
        <div
          key={result.id}
          className="flex items-center space-x-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => onResultClick(result)}
        >
          <div className="relative">
            {result.image ? (
              <Avatar className="w-12 h-12">
                <AvatarImage src={result.image} alt={result.title} />
                <AvatarFallback className="bg-gradient-primary text-white">
                  {result.title.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                getTypeColor(result.type)
              )}>
                {getIcon(result.type)}
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-sm truncate">{result.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {result.type}
              </Badge>
            </div>
            {result.subtitle && (
              <p className="text-sm text-muted-foreground truncate">
                {result.subtitle}
              </p>
            )}
            {result.badge && (
              <Badge variant="outline" className="mt-1 text-xs">
                {result.badge}
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};