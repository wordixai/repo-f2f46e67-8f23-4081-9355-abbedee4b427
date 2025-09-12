import React from 'react';
import { Home, Search, Heart, User, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}

interface MobileBottomNavProps {
  items?: NavItem[];
  className?: string;
}

const defaultItems: NavItem[] = [
  { icon: Home, label: 'Home', active: true },
  { icon: Search, label: 'Search' },
  { icon: MessageCircle, label: 'Messages', badge: 3 },
  { icon: Heart, label: 'Activity', badge: 12 },
  { icon: User, label: 'Profile' },
];

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  items = defaultItems,
  className
}) => {
  return (
    <div className={cn("mobile-bottom-nav", className)}>
      <div className="flex items-center justify-around p-3">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={cn(
                "mobile-button relative w-12 h-12",
                item.active && "text-primary"
              )}
              onClick={item.onClick}
            >
              <Icon className={cn(
                "h-6 w-6",
                item.active ? "fill-current" : ""
              )} />
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};