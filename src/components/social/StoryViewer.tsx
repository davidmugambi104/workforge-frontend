import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import type { Story, StorySummary } from '../../types/social.types';
import { storiesApi } from '../../services/social.service';

interface StoryViewerProps {
  userId: number;
  initialStoryIndex?: number;
  stories: Story[];
  user?: {
    id: number;
    username: string;
    name?: string;
    avatar?: string;
  };
  onClose: () => void;
  onNextUser?: () => void;
  onPrevUser?: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  userId,
  initialStoryIndex = 0,
  stories,
  user,
  onClose,
  onNextUser,
  onPrevUser,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [viewers, setViewers] = useState<{ id: number; viewer?: { id: number; username: string }; created_at: string }[]>([]);
  const [showViewers, setShowViewers] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<number>(0);

  const currentStory = stories[currentIndex];
  const STORY_DURATION = currentStory?.media_type === 'video' ? (currentStory.duration_seconds || 15) * 1000 : 5000;
  const isOwnStory = user?.id === userId;

  useEffect(() => {
    if (!isPaused && currentStory) {
      startProgress();
    }
    return () => stopProgress();
  }, [currentIndex, isPaused, currentStory]);

  useEffect(() => {
    // Mark story as viewed
    if (currentStory && !isOwnStory) {
      storiesApi.markViewed(currentStory.id).catch(console.error);
    }
  }, [currentStory, isOwnStory]);

  const startProgress = () => {
    stopProgress();
    const startTime = Date.now() - (progressRef.current * STORY_DURATION);
    
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / STORY_DURATION, 1);
      setProgress(newProgress);
      progressRef.current = newProgress;
      
      if (newProgress >= 1) {
        goToNext();
      }
    }, 50);
  };

  const stopProgress = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      progressRef.current = 0;
      setProgress(0);
    } else {
      // End of stories for this user
      onNextUser?.();
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      progressRef.current = 0;
      setProgress(0);
    } else {
      onPrevUser?.();
    }
  };

  const handleTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    if (x < width / 3) {
      goToPrev();
    } else if (x > (width * 2) / 3) {
      goToNext();
    } else {
      setIsPaused(!isPaused);
    }
  };

  const handleVideoPlayPause = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const loadViewers = async () => {
    if (!isOwnStory || !currentStory) return;
    try {
      const result = await storiesApi.getViewers(currentStory.id);
      setViewers(result.viewers);
      setShowViewers(true);
    } catch (error) {
      console.error('Failed to load viewers:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 text-white hover:text-gray-300 transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Story Container */}
      <div
        className="relative w-full h-full max-w-md mx-auto bg-gray-900"
        onClick={handleTap}
      >
        {/* Progress Bars */}
        <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
          {stories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-50"
                style={{
                  width: index < currentIndex
                    ? '100%'
                    : index === currentIndex
                    ? `${progress * 100}%`
                    : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=C85A2C&color=fff`}
              alt={user?.name || user?.username}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-white text-sm font-medium">{user?.name || user?.username}</p>
              <p className="text-gray-300 text-xs">
                {currentStory && new Date(currentStory.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isPaused && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleVideoPlayPause();
                }}
                className="text-white"
              >
                <Play className="w-6 h-6" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
                if (videoRef.current) {
                  videoRef.current.muted = !isMuted;
                }
              }}
              className="text-white"
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Story Content */}
        {currentStory && (
          <>
            {currentStory.media_type === 'video' ? (
              <video
                ref={videoRef}
                src={currentStory.media_url}
                poster={currentStory.thumbnail_url}
                className="w-full h-full object-contain"
                autoPlay
                muted={isMuted}
                playsInline
                onEnded={goToNext}
                onPause={() => setIsPaused(true)}
                onPlay={() => setIsPaused(false)}
              />
            ) : (
              <img
                src={currentStory.media_url}
                alt={currentStory.caption || 'Story'}
                className="w-full h-full object-contain"
              />
            )}

            {/* Caption */}
            {currentStory.caption && (
              <div className="absolute bottom-20 left-4 right-4 z-10">
                <p className="text-white text-center text-lg drop-shadow-lg">
                  {currentStory.caption}
                </p>
              </div>
            )}
          </>
        )}

        {/* Trade Tags */}
        {currentStory?.trade_tags && (
          <div className="absolute bottom-8 left-4 right-4 z-10 flex justify-center gap-2 flex-wrap">
            {JSON.parse(currentStory.trade_tags).slice(0, 3).map((tag: string, i: number) => (
              <span key={i} className="bg-orange-500/80 text-white text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Viewers Button (Own Stories) */}
        {isOwnStory && currentStory && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              loadViewers();
            }}
            className="absolute bottom-4 left-4 z-10 bg-white/20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm"
          >
            {currentStory.views_count} views
          </button>
        )}

        {/* Navigation Arrows */}
        {stories.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white/50 hover:text-white transition-colors"
              style={{ display: currentIndex > 0 ? 'block' : 'none' }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white/50 hover:text-white transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </>
        )}
      </div>

      {/* Viewers Modal */}
      {showViewers && (
        <div className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center" onClick={() => setShowViewers(false)}>
          <div className="bg-white rounded-lg max-w-sm w-full mx-4 max-h-96 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold">Story Views</h3>
            </div>
            <div className="overflow-y-auto max-h-72">
              {viewers.map(v => (
                <div key={v.id} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                  <img
                    src={v.viewer?.avatar || `https://ui-avatars.com/api/?name=${v.viewer?.username}&background=666&color=fff`}
                    alt={v.viewer?.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm">{v.viewer?.username}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(v.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {viewers.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p>No views yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryViewer;