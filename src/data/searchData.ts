import { SearchResult } from '@/components/SearchResults';

export const mockUsers = [
  {
    id: 'user1',
    name: 'Sarah Wilson',
    username: '@sarah_wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    followers: 1240,
    isVerified: true
  },
  {
    id: 'user2',
    name: 'John Developer',
    username: '@john_dev',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    followers: 890,
    isVerified: false
  },
  {
    id: 'user3',
    name: 'Emma Artist',
    username: '@emma_creates',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    followers: 2156,
    isVerified: true
  },
  {
    id: 'user4',
    name: 'Mike Photographer',
    username: '@mike_photos',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followers: 567,
    isVerified: false
  }
];

export const mockPosts = [
  {
    id: 'post1',
    caption: 'Beautiful sunset at the mountains',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
    user: mockUsers[0],
    likes: 1247,
    hashtags: ['#sunset', '#mountains', '#nature']
  },
  {
    id: 'post2',
    caption: 'Homemade pizza night',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=500&fit=crop',
    user: mockUsers[1],
    likes: 892,
    hashtags: ['#food', '#pizza', '#homemade']
  },
  {
    id: 'post3',
    caption: 'City lights never get old',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&h=500&fit=crop',
    user: mockUsers[2],
    likes: 2156,
    hashtags: ['#city', '#lights', '#urban']
  }
];

export const mockHashtags = [
  { id: 'tag1', name: '#travel', postCount: 1500000 },
  { id: 'tag2', name: '#food', postCount: 890000 },
  { id: 'tag3', name: '#photography', postCount: 2300000 },
  { id: 'tag4', name: '#nature', postCount: 1200000 },
  { id: 'tag5', name: '#sunset', postCount: 450000 },
];

export const mockProducts = [
  {
    id: 'product1',
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    rating: 4.5,
    brand: 'TechSound'
  },
  {
    id: 'product2',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    rating: 4.7,
    brand: 'SmartTech'
  },
  {
    id: 'product3',
    name: 'Camera Lens',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop',
    rating: 4.8,
    brand: 'PhotoPro'
  }
];

export const convertToSearchResults = (
  users: any[],
  posts: any[],
  hashtags: any[],
  products: any[]
): SearchResult[] => {
  const userResults: SearchResult[] = users.map(user => ({
    id: user.id,
    type: 'user' as const,
    title: user.name,
    subtitle: `${user.username} • ${user.followers} followers`,
    image: user.avatar,
    badge: user.isVerified ? 'Verified' : undefined,
    data: user
  }));

  const postResults: SearchResult[] = posts.map(post => ({
    id: post.id,
    type: 'post' as const,
    title: post.caption,
    subtitle: `by ${post.user.name} • ${post.likes} likes`,
    image: post.image,
    data: post
  }));

  const hashtagResults: SearchResult[] = hashtags.map(hashtag => ({
    id: hashtag.id,
    type: 'hashtag' as const,
    title: hashtag.name,
    subtitle: `${hashtag.postCount.toLocaleString()} posts`,
    data: hashtag
  }));

  const productResults: SearchResult[] = products.map(product => ({
    id: product.id,
    type: 'product' as const,
    title: product.name,
    subtitle: `${product.brand} • $${product.price}`,
    image: product.image,
    badge: `★ ${product.rating}`,
    data: product
  }));

  return [...userResults, ...postResults, ...hashtagResults, ...productResults];
};