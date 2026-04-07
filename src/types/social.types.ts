// Social Types - Posts, Stories, Follows, Company Pages

export enum PostType {
  VIDEO = 'video',
  IMAGE = 'image',
  TEXT = 'text',
  MIXED = 'mixed',
}

export enum PostVisibility {
  PUBLIC = 'public',
  FOLLOWERS = 'followers',
  PRIVATE = 'private',
}

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

export interface PostMedia {
  id: number;
  media_type: 'video' | 'image' | 'gif';
  url: string;
  thumbnail_url?: string;
  order_index: number;
  duration_seconds?: number;
  width?: number;
  height?: number;
}

export interface PostUser {
  id: number;
  username: string;
  role: string;
  name?: string;
  avatar?: string;
  trade?: string;
}

export interface Post {
  id: number;
  user_id: number;
  user?: PostUser;
  post_type: PostType;
  caption?: string;
  title?: string;
  visibility: PostVisibility;
  status: PostStatus;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  views_count: number;
  saves_count: number;
  media: PostMedia[];
  job_id?: number;
  trade_tags?: string;
  county?: string;
  sub_county?: string;
  created_at: string;
  published_at?: string;
}

export interface PostComment {
  id: number;
  post_id: number;
  user_id: number;
  parent_id?: number;
  content: string;
  likes_count: number;
  replies_count: number;
  user?: PostUser;
  replies?: PostComment[];
  created_at: string;
}

export interface CreatePostRequest {
  post_type: PostType;
  caption?: string;
  title?: string;
  visibility?: PostVisibility;
  status?: PostStatus;
  media?: {
    media_type: string;
    url: string;
    thumbnail_url?: string;
    duration_seconds?: number;
    width?: number;
    height?: number;
  }[];
  job_id?: number;
  trade_tags?: number[];
  county?: string;
  sub_county?: string;
}

// Stories
export enum StoryMediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export enum StoryStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  DELETED = 'deleted',
}

export interface Story {
  id: number;
  user_id: number;
  media_type: StoryMediaType;
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  sticker_data?: string;
  duration_seconds?: number;
  trade_tags?: string;
  county?: string;
  sub_county?: string;
  status: StoryStatus;
  views_count: number;
  expires_at: string;
  created_at: string;
  is_expired: boolean;
  user?: PostUser;
}

export interface StoryViewer {
  id: number;
  story_id: number;
  viewer_id: number;
  created_at: string;
  viewer?: PostUser;
}

export interface StorySummary {
  user_id: number;
  username?: string;
  name?: string;
  avatar?: string;
  stories_count: number;
  latest_story_thumbnail?: string;
  latest_story_created_at?: string;
  total_views_count: number;
  stories?: Story[];
  has_unseen?: boolean;
}

export interface CreateStoryRequest {
  media_type: StoryMediaType;
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  stickers?: object;
  duration_seconds?: number;
  trade_tags?: number[];
  county?: string;
  sub_county?: string;
}

// Follows
export enum FollowStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  UNFOLLOWED = 'unfollowed',
}

export interface Follow {
  id: number;
  follower_id: number;
  following_id: number;
  status: FollowStatus;
  notify_on_post: boolean;
  notify_on_story: boolean;
  notify_on_job: boolean;
  created_at: string;
}

export interface FollowUser {
  id: number;
  username: string;
  name?: string;
  avatar?: string;
  role?: string;
  followed_at?: string;
  notify_on_post?: boolean;
  notify_on_story?: boolean;
  notify_on_job?: boolean;
}

// Company Pages
export interface CompanyPage {
  id: number;
  employer_id: number;
  company_name: string;
  logo_url?: string;
  cover_photo_url?: string;
  tagline?: string;
  description?: string;
  founded_year?: number;
  company_size?: string;
  headquarters_county?: string;
  headquarters_sub_county?: string;
  address?: string;
  website_url?: string;
  phone?: string;
  email?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  industry?: string;
  trades_offered?: string;
  is_verified: boolean;
  verification_status: string;
  followers_count: number;
  jobs_count: number;
  completed_jobs_count: number;
  total_fundis_hired: number;
  average_rating: number;
  created_at: string;
  employer?: {
    id: number;
    user_id: number;
  };
}

export interface CreateCompanyPageRequest {
  company_name: string;
  logo_url?: string;
  cover_photo_url?: string;
  tagline?: string;
  description?: string;
  founded_year?: number;
  company_size?: string;
  headquarters_county?: string;
  headquarters_sub_county?: string;
  address?: string;
  website_url?: string;
  phone?: string;
  email?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  industry?: string;
  trades_offered?: string[];
}

// Notifications
export enum NotificationType {
  POST_LIKE = 'post_like',
  POST_COMMENT = 'post_comment',
  POST_SHARE = 'post_share',
  POST_MENTION = 'post_mention',
  STORY_VIEW = 'story_view',
  STORY_REPLY = 'story_reply',
  NEW_FOLLOWER = 'new_follower',
  COMPANY_FOLLOWER = 'company_follower',
  NEW_JOB_FROM_FOLLOWED = 'new_job_from_followed',
  JOB_APPLICATION_UPDATE = 'job_application_update',
  JOB_COMPLETED = 'job_completed',
  NEW_REVIEW = 'new_review',
  PAYMENT_RECEIVED = 'payment_received',
  PAYMENT_PENDING = 'payment_pending',
  SYSTEM_ANNOUNCEMENT = 'system_announcement',
  VERIFICATION_UPDATE = 'verification_update',
}

export interface SocialNotification {
  id: number;
  user_id: number;
  notification_type: NotificationType;
  actor_id?: number;
  actor?: PostUser;
  post_id?: number;
  story_id?: number;
  comment_id?: number;
  job_id?: number;
  company_page_id?: number;
  title?: string;
  message?: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

// Feed Responses
export interface FeedResponse {
  posts: Post[];
  total: number;
  pages: number;
  current_page: number;
  has_next: boolean;
}

export interface StoriesFeedResponse {
  my_story?: StorySummary;
  followed_stories: StorySummary[];
}

export interface FollowSuggestionsResponse {
  suggestions: {
    user: FollowUser;
    reason: string;
    suggestion_type: string;
  }[];
}