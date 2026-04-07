import React, { useEffect, useState } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import type { StorySummary } from '../../types/social.types';
import { storiesApi } from '../../services/social.service';

interface StoriesBarProps {
  onViewStory?: (userId: number, storyIndex: number) => void;
  onAddStory?: () => void;
  currentUserId?: number;
}

export const StoriesBar: React.FC<StoriesBarProps> = ({
  onViewStory,
  onAddStory,
  currentUserId,
}) => {
  const [myStory, setMyStory] = useState<StorySummary | null>(null);
  const [followedStories, setFollowedStories] = useState<StorySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      setLoading(true);
      const response = await storiesApi.getFeed();
      setMyStory(response.my_story || null);
      setFollowedStories(response.followed_stories);
    } catch (error) {
      console.error('Failed to load stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('stories-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  if (loading) {
    return (
      <div className="flex gap-3 overflow-hidden py-2 px-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-shrink-0 animate-pulse">
            <div className="w-16 h-16 rounded-full bg-gray-200" />
            <div className="w-16 h-3 mt-1 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative bg-white border-b border-gray-100 py-3">
      {/* Scroll Buttons */}
      {followedStories.length > 5 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-1 hidden md:block"
            style={{ display: scrollPosition > 0 ? 'block' : 'none' }}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-1 hidden md:block"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </>
      )}

      <div
        id="stories-container"
        className="flex gap-4 overflow-x-auto scrollbar-hide px-3"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Add Story / My Story */}
        {myStory ? (
          <button
            onClick={() => onViewStory?.(myStory.user_id, 0)}
            className="flex-shrink-0 flex flex-col items-center relative"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-orange-500 via-orange-400 to-orange-300">
                <img
                  src={myStory.avatar || myStory.latest_story_thumbnail || `https://ui-avatars.com/api/?name=Me&background=C85A2C&color=fff`}
                  alt="Your story"
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-orange-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs">{myStory.stories_count}</span>
              </div>
            </div>
            <p className="text-xs mt-1 text-center truncate w-16 font-medium">Your Story</p>
          </button>
        ) : (
          <button
            onClick={onAddStory}
            className="flex-shrink-0 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-orange-300 flex items-center justify-center bg-orange-50 hover:bg-orange-100 transition-colors">
              <Plus className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-xs mt-1 text-center text-gray-600">Add Story</p>
          </button>
        )}

        {/* Followed Users' Stories */}
        {followedStories.map((story) => (
          <button
            key={story.user_id}
            onClick={() => onViewStory?.(story.user_id, 0)}
            className="flex-shrink-0 flex flex-col items-center relative"
          >
            <div className="relative">
              {/* Gradient Ring - Orange if unseen, gray if seen */}
              <div className={`w-16 h-16 rounded-full p-0.5 ${
                story.has_unseen 
                  ? 'bg-gradient-to-tr from-orange-500 via-orange-400 to-orange-300' 
                  : 'bg-gray-300'
              }`}>
                <img
                  src={story.avatar || story.latest_story_thumbnail || `https://ui-avatars.com/api/?name=${story.username}&background=666&color=fff`}
                  alt={story.name || story.username}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
            </div>
            <p className="text-xs mt-1 text-center truncate w-16">
              {story.name || story.username}
            </p>
          </button>
        ))}

        {/* Empty State */}
        {!myStory && followedStories.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-4">
            <p className="text-sm text-gray-400">No stories yet. Follow people to see their stories!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesBar;