import { axiosClient } from '@lib/axios';
import type {
  Post,
  PostComment,
  CreatePostRequest,
  Story,
  StoryViewer,
  StorySummary,
  CreateStoryRequest,
  FollowUser,
  CompanyPage,
  CreateCompanyPageRequest,
  SocialNotification,
  FeedResponse,
  StoriesFeedResponse,
  FollowSuggestionsResponse,
} from '../types/social.types';

const BASE_URL = '/api';

// ==================== POSTS ====================

export const postsApi = {
  create: async (data: CreatePostRequest): Promise<Post> => {
    const response = await axiosClient.post(`/posts`, data);
    return (response as any).post;
  },

  getFeed: async (page = 1, perPage = 20, maxId?: number): Promise<FeedResponse> => {
    const params = new URLSearchParams({ page: String(page), per_page: String(perPage) });
    if (maxId) params.append('max_id', String(maxId));
    const response = await axiosClient.get(`/posts/feed?${params}`);
    return response as any;
  },

  getById: async (postId: number): Promise<Post> => {
    const response = await axiosClient.get(`/posts/${postId}`);
    return (response as any).post;
  },

  like: async (postId: number): Promise<{ likes_count: number }> => {
    const response = await axiosClient.post(`/posts/${postId}/like`);
    return response as any;
  },

  unlike: async (postId: number): Promise<{ likes_count: number }> => {
    const response = await axiosClient.post(`/posts/${postId}/unlike`);
    return response as any;
  },

  addComment: async (postId: number, content: string, parentId?: number): Promise<PostComment> => {
    const response = await axiosClient.post(`/posts/${postId}/comment`, {
      content,
      parent_id: parentId,
    });
    return (response as any).comment;
  },

  getComments: async (postId: number, page = 1, perPage = 20): Promise<{
    comments: PostComment[];
    total: number;
    pages: number;
  }> => {
    const response = await axiosClient.get(`/posts/${postId}/comments?page=${page}&per_page=${perPage}`);
    return response as any;
  },

  share: async (postId: number, caption?: string, shareType = 'repost'): Promise<{ shares_count: number }> => {
    const response = await axiosClient.post(`/posts/${postId}/share`, {
      share_type: shareType,
      caption,
    });
    return response as any;
  },

  getUserPosts: async (userId: number, page = 1, perPage = 20): Promise<FeedResponse> => {
    const response = await axiosClient.get(`/posts/user/${userId}?page=${page}&per_page=${perPage}`);
    return response as any;
  },

  delete: async (postId: number): Promise<void> => {
    await axiosClient.delete(`/posts/${postId}`);
  },

  search: async (query: string, trade?: string, county?: string, page = 1, perPage = 20): Promise<FeedResponse & { query: string }> => {
    const params = new URLSearchParams({ q: query, page: String(page), per_page: String(perPage) });
    if (trade) params.append('trade', trade);
    if (county) params.append('county', county);
    const response = await axiosClient.get(`/posts/search?${params}`);
    return response as any;
  },
};

// ==================== STORIES ====================

export const storiesApi = {
  create: async (data: CreateStoryRequest): Promise<Story> => {
    const response = await axiosClient.post(`/stories`, data);
    return (response as any).story;
  },

  getFeed: async (): Promise<StoriesFeedResponse> => {
    const response = await axiosClient.get(`/stories/feed`);
    return response as any;
  },

  getUserStories: async (userId: number): Promise<{ stories: Story[]; user?: { id: number; username: string; name?: string } }> => {
    const response = await axiosClient.get(`/stories/user/${userId}`);
    return response as any;
  },

  markViewed: async (storyId: number): Promise<void> => {
    await axiosClient.post(`/stories/${storyId}/view`);
  },

  getViewers: async (storyId: number, page = 1, perPage = 50): Promise<{
    viewers: StoryViewer[];
    total: number;
    pages: number;
  }> => {
    const response = await axiosClient.get(`/stories/${storyId}/viewers?page=${page}&per_page=${perPage}`);
    return response as any;
  },

  delete: async (storyId: number): Promise<void> => {
    await axiosClient.delete(`/stories/${storyId}`);
  },

  getMyStories: async (includeExpired = false): Promise<{ stories: Story[]; active_count: number }> => {
    const response = await axiosClient.get(`/stories/my?include_expired=${includeExpired}`);
    return response as any;
  },
};

// ==================== SOCIAL (FOLLOWS, COMPANY PAGES, NOTIFICATIONS) ====================

export const socialApi = {
  // Follows
  followUser: async (userId: number): Promise<{ following: boolean }> => {
    const response = await axiosClient.post(`/social/follow/${userId}`);
    return response as any;
  },

  unfollowUser: async (userId: number): Promise<{ following: boolean }> => {
    const response = await axiosClient.post(`/social/unfollow/${userId}`);
    return response as any;
  },

  getFollowers: async (page = 1, perPage = 20): Promise<{
    followers: FollowUser[];
    total: number;
    pages: number;
  }> => {
    const response = await axiosClient.get(`/social/followers?page=${page}&per_page=${perPage}`);
    return response as any;
  },

  getFollowing: async (page = 1, perPage = 20): Promise<{
    following: FollowUser[];
    total: number;
    pages: number;
  }> => {
    const response = await axiosClient.get(`/social/following?page=${page}&per_page=${perPage}`);
    return response as any;
  },

  getFollowStatus: async (userId: number): Promise<{ is_following: boolean; follow_id?: number }> => {
    const response = await axiosClient.get(`/social/follow-status/${userId}`);
    return response as any;
  },

  getFollowSuggestions: async (limit = 10): Promise<FollowSuggestionsResponse> => {
    const response = await axiosClient.get(`/social/suggestions/follow?limit=${limit}`);
    return response as any;
  },

  // Company Pages
  createCompanyPage: async (data: CreateCompanyPageRequest): Promise<CompanyPage> => {
    const response = await axiosClient.post(`/social/company-pages`, data);
    return (response as any).company_page;
  },

  getCompanyPage: async (pageId: number): Promise<CompanyPage> => {
    const response = await axiosClient.get(`/social/company-pages/${pageId}`);
    return (response as any).company_page;
  },

  updateCompanyPage: async (pageId: number, data: Partial<CreateCompanyPageRequest>): Promise<CompanyPage> => {
    const response = await axiosClient.put(`/social/company-pages/${pageId}`, data);
    return (response as any).company_page;
  },

  followCompany: async (pageId: number): Promise<{ followers_count: number }> => {
    const response = await axiosClient.post(`/social/company-pages/${pageId}/follow`);
    return response as any;
  },

  unfollowCompany: async (pageId: number): Promise<{ followers_count: number }> => {
    const response = await axiosClient.post(`/social/company-pages/${pageId}/unfollow`);
    return response as any;
  },

  searchCompanyPages: async (query: string, industry?: string, county?: string, page = 1, perPage = 20): Promise<{
    company_pages: CompanyPage[];
    total: number;
    pages: number;
  }> => {
    const params = new URLSearchParams({ q: query, page: String(page), per_page: String(perPage) });
    if (industry) params.append('industry', industry);
    if (county) params.append('county', county);
    const response = await axiosClient.get(`/social/company-pages/search?${params}`);
    return response as any;
  },

  // Notifications
  getNotifications: async (page = 1, perPage = 20, unreadOnly = false): Promise<{
    notifications: SocialNotification[];
    total: number;
    pages: number;
    unread_count: number;
  }> => {
    const response = await axiosClient.get(`/social/notifications?page=${page}&per_page=${perPage}&unread_only=${unreadOnly}`);
    return response as any;
  },

  markNotificationRead: async (notificationId: number): Promise<void> => {
    await axiosClient.post(`/social/notifications/${notificationId}/read`);
  },

  markAllNotificationsRead: async (): Promise<void> => {
    await axiosClient.post(`/social/notifications/read-all`);
  },

  getUnreadCount: async (): Promise<{ unread_count: number }> => {
    const response = await axiosClient.get(`/social/notifications/unread-count`);
    return response as any;
  },
};

export default {
  posts: postsApi,
  stories: storiesApi,
  social: socialApi,
};