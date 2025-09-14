import React from 'react';
import { ArrowLeft, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showMore?: boolean;
  onBack?: () => void;
  onSearch?: () => void;
  onMore?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  showBack = false,
  showSearch = false,
  showMore = false,
  onBack,
  onSearch,
  onMore,
  rightAction,
  className
}) => {
  return (
    <div className={cn("mobile-header", className)}>
      <div className="flex items-center justify-between p-4 h-16">
        <div className="flex items-center space-x-3">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              className="mobile-button w-10 h-10"
              onClick={onBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          {title && (
            <h1 className="text-lg font-semibold text-foreground truncate">
             111 {title}
            </h1>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {showSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="mobile-button w-10 h-10"
              onClick={onSearch}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          {showMore && (
            <Button
              variant="ghost"
              size="icon"
              className="mobile-button w-10 h-10"
              onClick={onMore}
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          )}
          {rightAction && rightAction}
        </div>
      </div>
    </div>
  );
};
