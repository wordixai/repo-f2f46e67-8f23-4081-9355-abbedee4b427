import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Chat {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
    isOnline?: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isTyping?: boolean;
}

interface ChatListProps {
  chats?: Chat[];
  className?: string;
  onChatClick?: (chat: Chat) => void;
}

const defaultChats: Chat[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      initials: 'SW',
      isOnline: true
    },
    lastMessage: 'Hey! How are you doing today?',
    timestamp: '2m',
    unreadCount: 2
  },
  {
    id: '2',
    user: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      initials: 'JD',
      isOnline: false
    },
    lastMessage: 'Thanks for the help!',
    timestamp: '1h',
    isTyping: true
  },
  {
    id: '3',
    user: {
      name: 'Emma Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      initials: 'ED',
      isOnline: true
    },
    lastMessage: 'See you tomorrow at the meeting',
    timestamp: '3h',
    unreadCount: 1
  },
  {
    id: '4',
    user: {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      initials: 'MJ',
      isOnline: false
    },
    lastMessage: 'The project looks great!',
    timestamp: '1d'
  },
  {
    id: '5',
    user: {
      name: 'Lisa Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      initials: 'LC',
      isOnline: true
    },
    lastMessage: 'Can you send me the files?',
    timestamp: '2d',
    unreadCount: 5
  },
];

export const ChatList: React.FC<ChatListProps> = ({
  chats = defaultChats,
  className,
  onChatClick
}) => {
  return (
    <div className={cn("divide-y divide-border", className)}>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center space-x-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => onChatClick?.(chat)}
        >
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
              <AvatarFallback className="bg-gradient-primary text-white">
                {chat.user.initials}
              </AvatarFallback>
            </Avatar>
            {chat.user.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-sm truncate">{chat.user.name}</h3>
              <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
            </div>
            <p className={cn(
              "text-sm truncate",
              chat.unreadCount ? "text-foreground font-medium" : "text-muted-foreground"
            )}>
              {chat.isTyping ? (
                <span className="text-primary italic">typing...</span>
              ) : (
                chat.lastMessage
              )}
            </p>
          </div>
          
          {chat.unreadCount && chat.unreadCount > 0 && (
            <Badge className="bg-primary text-primary-foreground min-w-[20px] h-5 text-xs flex items-center justify-center rounded-full">
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
};