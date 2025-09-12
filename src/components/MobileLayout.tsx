import React from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("mobile-container", className)}>
      {children}
    </div>
  );
};