import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Post {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    initials: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

interface PostCardProps {
  post: Post;
  className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({ post, className }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className={cn("bg-card border-b border-border", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback className="bg-gradient-primary text-white">
              {post.user.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{post.user.username}</p>
            <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Image */}
      <div className="aspect-square bg-muted">
        <img
          src={post.image}
          alt="Post content"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 p-0"
              onClick={handleLike}
            >
              <Heart className={cn(
                "h-6 w-6 transition-colors",
                isLiked ? "fill-red-500 text-red-500" : "text-foreground"
              )} />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 p-0"
            onClick={handleSave}
          >
            <Bookmark className={cn(
              "h-6 w-6 transition-colors",
              isSaved ? "fill-current" : ""
            )} />
          </Button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mb-2">
          {likes.toLocaleString()} likes
        </p>

        {/* Caption */}
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-semibold">{post.user.username}</span>{' '}
            {post.caption}
          </p>
          {post.comments > 0 && (
            <p className="text-sm text-muted-foreground">
              View all {post.comments} comments
            </p>
          )}
        </div>
      </div>
    </div>
  );
};