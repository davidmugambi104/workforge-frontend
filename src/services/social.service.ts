import api from './api';
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
    const response = await api.post(`${BASE_URL}/posts`, data);
    return response.data.post;
  },

  getFeed: async (page = 1, perPage = 20, maxId?: number): Promise<FeedResponse> => {
    const params = new URLSearchParams({ page: String(page), per_page: String(perPage) });
    if (maxId) params.append('max_id', String(maxId));
    const response = await api.get(`${BASE_URL}/posts/feed?${params}`);
    return response.data;
  },

  getById: async (postId: number): Promise<Post> => {
    const response = await api.get(`${BASE_URL}/posts/${postId}`);
    return response.data.post;
  },

  like: async (postId: number): Promise<{ likes_count: number }> => {
    const response = await api.post(`${BASE_URL}/posts/${postId}/like`);
    return response.data;
  },

  unlike: async (postId: number): Promise<{ likes_count: number }> => {
    const response = await api.post(`${BASE_URL}/posts/${postId}/unlike`);
    return response.data;
  },

  addComment: async (postId: number, content: string, parentId?: number): Promise<PostComment> => {
    const response = await api.post(`${BASE_URL}/posts/${postId}/comment`, {
      content,
      parent_id: parentId,
    });
    return response.data.comment;
  },

  getComments: async (postId: number, page = 1, perPage = 20): Promise<{
    comments: PostComment[];
    total: number;
    pages: number;
  }> => {
    const response = await api.get(`${BASE_URL}/posts/${postId}/comments?page=${page}&per_page=${perPage}`);
    return response.data;
  },

  share: async (postId: number, caption?: string, shareType = 'repost'): Promise<{ shares_count: number }> => {
    const response = await api.post(`${BASE_URL}/posts/${postId}/share`, {
      share_type: shareType,
      caption,
    });
    return response.data;
  },

  getUserPosts: async (userId: number, page = 1, perPage = 20): Promise<FeedResponse> => {
    const response = await api.get(`${BASE_URL}/posts/user/${userId}?page=${page}&per_page=${perPage}`);
    return response.data;
  },

  delete: async (postId: number): Promise<void> => {
    await api.delete(`${BASE_URL}/posts/${postId}`);
  },

  search: async (query: string, trade?: string, county?: string, page = 1, perPage = 20): Promise<FeedResponse & { query: string }> => {
    const params = new URLSearchParams({ q: query, page: String(page), per_page: String(perPage) });
    if (trade) params.append('trade', trade);
    if (county) params.append('county', county);
    const response = await api.get(`${BASE_URL}/posts/search?${params}`);
    return response.data;
  },
};

// ==================== STORIES ====================

export const storiesApi = {
  create: async (data: CreateStoryRequest): Promise<Story> => {
    const response = await api.post(`${BASE_URL}/stories`, data);
    return response.data.story;
  },

  getFeed: async (): Promise<StoriesFeedResponse> => {
    const response = await api.get(`${BASE_URL}/stories/feed`);
    return response.data;
  },

  getUserStories: async (userId: number): Promise<{ stories: Story[]; user?: { id: number; username: string; name?: string } }> => {
    const response = await api.get(`${BASE_URL}/stories/user/${userId}`);
    return response.data;
  },

  markViewed: async (storyId: number): Promise<void> => {
    await api.post(`${BASE_URL}/stories/${storyId}/view`);
  },

  getViewers: async (storyId: number, page = 1, perPage = 50): Promise<{
    viewers: StoryViewer[];
    total: number;
    pages: number;
  }> => {
    const response = await api.get(`${BASE_URL}/stories/${storyId}/viewers?page=${page}&per_page=${perPage}`);
    return response.data;
  },

  delete: async (storyId: number): Promise<void> => {
    await api.delete(`${BASE_URL}/stories/${storyId}`);
  },

  getMyStories: async (includeExpired = false): Promise<{ stories: Story[]; active_count: number }> => {
    const response = await api.get(`${BASE_URL}/stories/my?include_expired=${includeExpired}`);
    return response.data;
  },
};

// ==================== SOCIAL (FOLLOWS, COMPANY PAGES, NOTIFICATIONS) ====================

export const socialApi = {
  // Follows
  followUser: async (userId: number): Promise<{ following: boolean }> => {
    const response = await api.post(`${BASE_URL}/social/follow/${userId}`);
    return response.data;
  },

  unfollowUser: async (userId: number): Promise<{ following: boolean }> => {
    const response = await api.post(`${BASE_URL}/social/unfollow/${userId}`);
    return response.data;
  },

  getFollowers: async (page = 1, perPage = 20): Promise<{
    followers: FollowUser[];
    total: number;
    pages: number;
  }> => {
    const response = await api.get(`${BASE_URL}/social/followers?page=${page}&per_page=${perPage}`);
    return response.data;
  },

  getFollowing: async (page = 1, perPage = 20): Promise<{
    following: FollowUser[];
    total: number;
    pages: number;
  }> => {
    const response = await api.get(`${BASE_URL}/social/following?page=${page}&per_page=${perPage}`);
    return response.data;
  },

  getFollowStatus: async (userId: number): Promise<{ is_following: boolean; follow_id?: number }> => {
    const response = await api.get(`${BASE_URL}/social/follow-status/${userId}`);
    return response.data;
  },

  getFollowSuggestions: async (limit = 10): Promise<FollowSuggestionsResponse> => {
    const response = await api.get(`${BASE_URL}/social/suggestions/follow?limit=${limit}`);
    return response.data;
  },

  // Company Pages
  createCompanyPage: async (data: CreateCompanyPageRequest): Promise<CompanyPage> => {
    const response = await api.post(`${BASE_URL}/social/company-pages`, data);
    return response.data.company_page;
  },

  getCompanyPage: async (pageId: number): Promise<CompanyPage> => {
    const response = await api.get(`${BASE_URL}/social/company-pages/${pageId}`);
    return response.data.company_page;
  },

  updateCompanyPage: async (pageId: number, data: Partial<CreateCompanyPageRequest>): Promise<CompanyPage> => {
    const response = await api.put(`${BASE_URL}/social/company-pages/${pageId}`, data);
    return response.data.company_page;
  },

  followCompany: async (pageId: number): Promise<{ followers_count: number }> => {
    const response = await api.post(`${BASE_URL}/social/company-pages/${pageId}/follow`);
    return response.data;
  },

  unfollowCompany: async (pageId: number): Promise<{ followers_count: number }> => {
    const response = await api.post(`${BASE_URL}/social/company-pages/${pageId}/unfollow`);
    return response.data;
  },

  searchCompanyPages: async (query: string, industry?: string, county?: string, page = 1, perPage = 20): Promise<{
    company_pages: CompanyPage[];
    total: number;
    pages: number;
  }> => {
    const params = new URLSearchParams({ q: query, page: String(page), per_page: String(perPage) });
    if (industry) params.append('industry', industry);
    if (county) params.append('county', county);
    const response = await api.get(`${BASE_URL}/social/company-pages/search?${params}`);
    return response.data;
  },

  // Notifications
  getNotifications: async (page = 1, perPage = 20, unreadOnly = false): Promise<{
    notifications: SocialNotification[];
    total: number;
    pages: number;
    unread_count: number;
  }> => {
    const response = await api.get(`${BASE_URL}/social/notifications?page=${page}&per_page=${perPage}&unread_only=${unreadOnly}`);
    return response.data;
  },

  markNotificationRead: async (notificationId: number): Promise<void> => {
    await api.post(`${BASE_URL}/social/notifications/${notificationId}/read`);
  },

  markAllNotificationsRead: async (): Promise<void> => {
    await api.post(`${BASE_URL}/social/notifications/read-all`);
  },

  getUnreadCount: async (): Promise<{ unread_count: number }> => {
    const response = await api.get(`${BASE_URL}/social/notifications/unread-count`);
    return response.data;
  },
};

export default {
  posts: postsApi,
  stories: storiesApi,
  social: socialApi,
};