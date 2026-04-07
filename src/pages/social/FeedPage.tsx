import React, { useEffect, useState, useCallback } from 'react';
import { RefreshCw, Plus, Search, Briefcase, Video, Image } from 'lucide-react';
import { PostCard } from '../../components/social/PostCard';
import { StoriesBar } from '../../components/social/StoriesBar';
import { StoryViewer } from '../../components/social/StoryViewer';
import { postsApi, storiesApi } from '../../services/social.service';
import type { Post, Story, StorySummary } from '../../types/social.types';
import type { PostType } from '../../types/social.types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [selectedStoryUser, setSelectedStoryUser] = useState<{
    userId: number;
    stories: Story[];
    user?: { id: number; username: string; name?: string; avatar?: string };
  } | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [storySummaries, setStorySummaries] = useState<StorySummary[]>([]);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const loadFeed = useCallback(async (pageNum: number, append = false) => {
    try {
      if (!append) setLoading(true);
      const response = await postsApi.getFeed(pageNum, 10);
      
      if (append) {
        setPosts(prev => [...prev, ...response.posts]);
      } else {
        setPosts(response.posts);
      }
      
      setHasMore(response.has_next);
    } catch (error) {
      console.error('Failed to load feed:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const loadStories = useCallback(async () => {
    try {
      const response = await storiesApi.getFeed();
      setStorySummaries(response.followed_stories);
    } catch (error) {
      console.error('Failed to load stories:', error);
    }
  }, []);

  useEffect(() => {
    loadFeed(1);
    loadStories();
  }, [loadFeed, loadStories]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await Promise.all([loadFeed(1), loadStories()]);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadFeed(nextPage, true);
    }
  };

  const handleViewStory = async (userId: number, initialIndex: number) => {
    try {
      const response = await storiesApi.getUserStories(userId);
      if (response.stories.length > 0) {
        setSelectedStoryUser({
          userId,
          stories: response.stories,
          user: response.user,
        });
        setStoryIndex(initialIndex);
        setShowStoryViewer(true);
      }
    } catch (error) {
      console.error('Failed to load story:', error);
    }
  };

  const handleNextStoryUser = () => {
    const currentUserIndex = storySummaries.findIndex(s => s.user_id === selectedStoryUser?.userId);
    if (currentUserIndex < storySummaries.length - 1) {
      const nextUser = storySummaries[currentUserIndex + 1];
      handleViewStory(nextUser.user_id, 0);
    } else {
      setShowStoryViewer(false);
      setSelectedStoryUser(null);
    }
  };

  const handlePrevStoryUser = () => {
    const currentUserIndex = storySummaries.findIndex(s => s.user_id === selectedStoryUser?.userId);
    if (currentUserIndex > 0) {
      const prevUser = storySummaries[currentUserIndex - 1];
      handleViewStory(prevUser.user_id, 0);
    } else {
      setShowStoryViewer(false);
      setSelectedStoryUser(null);
    }
  };

  const handlePostClick = (postId: number) => {
    navigate(`/social/post/${postId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">WorkForge</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/social/search')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => navigate('/social/create')}
              className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600"
            >
              <Plus className="w-4 h-4" />
              Create
            </button>
          </div>
        </div>
      </div>

      {/* Stories */}
      <StoriesBar
        currentUserId={user?.id}
        onViewStory={handleViewStory}
        onAddStory={() => navigate('/social/create?tab=story')}
      />

      {/* Tab Bar */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex gap-6">
          <button className="py-3 border-b-2 border-orange-500 text-orange-500 font-medium text-sm">
            For You
          </button>
          <button className="py-3 text-gray-500 text-sm hover:text-gray-700">
            Following
          </button>
          <button className="py-3 text-gray-500 text-sm hover:text-gray-700">
            Jobs
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-lg mx-auto pb-20">
        {loading && posts.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
          </div>
        ) : (
          <>
            {/* Posts */}
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onClick={handlePostClick}
              />
            ))}

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center py-4">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 text-orange-500 hover:bg-orange-50 rounded-full text-sm font-medium disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  Load More
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && posts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <Video className="w-16 h-16 text-gray-300 mb-4" />
                <h2 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h2>
                <p className="text-gray-500 text-center mb-4">
                  Be the first to share your work with the community!
                </p>
                <button
                  onClick={() => navigate('/social/create')}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600"
                >
                  <Plus className="w-5 h-5" />
                  Create Post
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Story Viewer Modal */}
      {showStoryViewer && selectedStoryUser && (
        <StoryViewer
          userId={selectedStoryUser.userId}
          stories={selectedStoryUser.stories}
          user={selectedStoryUser.user}
          initialStoryIndex={storyIndex}
          onClose={() => {
            setShowStoryViewer(false);
            setSelectedStoryUser(null);
          }}
          onNextUser={handleNextStoryUser}
          onPrevUser={handlePrevStoryUser}
        />
      )}
    </div>
  );
};

export default FeedPage;