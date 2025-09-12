import React from 'react';
import { Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  hasNewStory?: boolean;
  isOwn?: boolean;
}

interface StoryCarouselProps {
  stories?: Story[];
  className?: string;
}

const defaultStories: Story[] = [
  {
    id: '1',
    user: { name: 'Your Story', avatar: '', initials: 'YS' },
    isOwn: true
  },
  {
    id: '2',
    user: { name: 'Alice', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', initials: 'AL' },
    hasNewStory: true
  },
  {
    id: '3',
    user: { name: 'Bob', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', initials: 'BO' },
    hasNewStory: true
  },
  {
    id: '4',
    user: { name: 'Carol', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', initials: 'CA' },
    hasNewStory: false
  },
  {
    id: '5',
    user: { name: 'David', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', initials: 'DA' },
    hasNewStory: true
  },
];

export const StoryCarousel: React.FC<StoryCarouselProps> = ({
  stories = defaultStories,
  className
}) => {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="flex space-x-4 p-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-2 min-w-[70px]">
            <div className={cn(
              "relative",
              story.hasNewStory && "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-full"
            )}>
              <Avatar className="w-16 h-16">
                <AvatarImage src={story.user.avatar} alt={story.user.name} />
                <AvatarFallback className="bg-gradient-primary text-white">
                  {story.user.initials}
                </AvatarFallback>
              </Avatar>
              {story.isOwn && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
            <span className="text-xs text-center text-muted-foreground truncate w-full">
              {story.user.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};