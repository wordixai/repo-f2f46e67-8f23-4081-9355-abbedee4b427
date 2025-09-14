import React, { useState } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { MobileHeader } from '@/components/MobileHeader';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { StoryCarousel } from '@/components/StoryCarousel';
import { PostCard } from '@/components/PostCard';
import { ChatList } from '@/components/ChatList';
import { SearchPage } from '@/pages/SearchPage';
import { Home, Search, MessageCircle, Heart, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/SearchInput';
import { useSearch } from '@/hooks/useSearch';

const mockPosts = [
  {
    id: '1',
    user: {
      name: 'Travel Explorer',
      username: 'travel_explorer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      initials: 'TE'
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
    caption: 'Beautiful sunset at the mountains! Nature never ceases to amaze me 🌅',
    likes: 1247,
    comments: 23,
    timeAgo: '2h',
    isLiked: false
  },
  {
    id: '2',
    user: {
      name: 'Food Lover',
      username: 'foodie_delights',
      avatar: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=150&h=150&fit=crop&crop=face',
      initials: 'FL'
    },
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=500&fit=crop',
    caption: 'Homemade pizza night! Nothing beats fresh ingredients 🍕',
    likes: 892,
    comments: 45,
    timeAgo: '4h',
    isLiked: true
  },
  {
    id: '3',
    user: {
      name: 'City Explorer',
      username: 'urban_wanderer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      initials: 'CE'
    },
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&h=500&fit=crop',
    caption: 'The city lights never get old. Love this urban vibe! ✨',
    likes: 2156,
    comments: 67,
    timeAgo: '6h',
    isLiked: false
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [homeSearchQuery, setHomeSearchQuery] = useState('');

  // Search functionality for home feed
  const {
    searchQuery: postsSearchQuery,
    setSearchQuery: setPostsSearchQuery,
    filteredItems: filteredPosts,
    clearSearch: clearPostsSearch
  } = useSearch(mockPosts, ['caption', 'user']);

  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      active: activeTab === 'home',
      onClick: () => setActiveTab('home')
    },
    { 
      icon: Search, 
      label: 'Search', 
      active: activeTab === 'search',
      onClick: () => setActiveTab('search')
    },
    { 
      icon: MessageCircle, 
      label: 'Messages', 
      badge: 3,
      active: activeTab === 'messages',
      onClick: () => setActiveTab('messages')
    },
    { 
      icon: Heart, 
      label: 'Activity', 
      badge: 12,
      active: activeTab === 'activity',
      onClick: () => setActiveTab('activity')
    },
    { 
      icon: User, 
      label: 'Profile', 
      active: activeTab === 'profile',
      onClick: () => setActiveTab('profile')
    },
  ];

  const handleSearchClick = () => {
    if (activeTab === 'home') {
      // Show search input for home feed
      setHomeSearchQuery(homeSearchQuery ? '' : 'show');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="mobile-content">
            {homeSearchQuery && (
              <div className="p-4 border-b border-border">
                <SearchInput
                  value={postsSearchQuery}
                  onChange={setPostsSearchQuery}
                  placeholder="Search posts and users..."
                  autoFocus
                  onClear={() => {
                    clearPostsSearch();
                    setHomeSearchQuery('');
                  }}
                />
              </div>
            )}
            
            {!postsSearchQuery && <StoryCarousel />}
            
            <div className="space-y-0">
              {(postsSearchQuery ? filteredPosts : mockPosts).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            
            {postsSearchQuery && filteredPosts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground">Try searching for something else</p>
              </div>
            )}
          </div>
        );
      
      case 'search':
        return <SearchPage />;
      
      case 'messages':
        return (
          <div className="mobile-content">
            <ChatList />
          </div>
        );
      
      case 'activity':
        return (
          <div className="mobile-content p-4">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <div className="space-y-3">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">user_{i + 1}</span> liked your post
                      </p>
                      <p className="text-xs text-muted-foreground">{i + 1}h ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div className="mobile-content">
            <div className="p-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  YS
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">Your Name</h2>
                  <p className="text-muted-foreground">@yourhandle</p>
                  <div className="flex space-x-4 mt-2">
                    <span className="text-sm"><strong>1.2k</strong> followers</span>
                    <span className="text-sm"><strong>180</strong> following</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-1">
                {Array.from({ length: 9 }, (_, i) => (
                  <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${1400000000000 + i}?w=200&h=200&fit=crop`}
                      alt={`Post ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'home': return 'Instagram';
      case 'search': return 'Explore';
      case 'messages': return 'Messages';
      case 'activity': return 'Activity';
      case 'profile': return 'Profile';
      default: return 'App';
    }
  };

  // Don't render header for search page as it has its own
  if (activeTab === 'search') {
    return (
      <MobileLayout>
        <SearchPage />
        <MobileBottomNav items={navItems} />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <MobileHeader
        title={getHeaderTitle()}
        showSearch={activeTab === 'home'}
        onSearch={handleSearchClick}
        rightAction={
          activeTab === 'messages' ? (
            <Button variant="ghost" size="icon" className="mobile-button w-10 h-10">
              <Plus className="h-5 w-5" />
            </Button>
          ) : null
        }
      />
      
      {renderContent()}
      
      <MobileBottomNav items={navItems} />
    </MobileLayout>
  );
};

export default Index;