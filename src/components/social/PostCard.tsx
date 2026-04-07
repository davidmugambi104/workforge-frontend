import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Play } from 'lucide-react';
import type { Post, PostComment } from '../../types/social.types';
import { postsApi } from '../../services/social.service';

interface PostCardProps {
  post: Post;
  onLike?: (postId: number, liked: boolean) => void;
  onComment?: (postId: number, comment: PostComment) => void;
  onShare?: (postId: number) => void;
  onClick?: (postId: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  onClick,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isPaused, setIsPaused] = useState(true);

  const handleLike = async () => {
    try {
      if (liked) {
        const result = await postsApi.unlike(post.id);
        setLikesCount(result.likes_count);
        setLiked(false);
      } else {
        const result = await postsApi.like(post.id);
        setLikesCount(result.likes_count);
        setLiked(true);
      }
      onLike?.(post.id, !liked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;
    try {
      const comment = await postsApi.addComment(post.id, newComment);
      setComments([comment, ...comments]);
      setNewComment('');
      onComment?.(post.id, comment);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const loadComments = async () => {
    if (!showComments) {
      try {
        const result = await postsApi.getComments(post.id);
        setComments(result.comments);
      } catch (error) {
        console.error('Failed to load comments:', error);
      }
    }
    setShowComments(!showComments);
  };

  const isVideo = post.post_type === 'video' || (post.media?.some?.(m => m.media_type === 'video') ?? false);
  const mainMedia = post.media?.[0];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img
            src={post.user?.avatar || `https://ui-avatars.com/api/?name=${post.user?.username}&background=C85A2C&color=fff`}
            alt={post.user?.name || post.user?.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm text-gray-900">{post.user?.name || post.user?.username}</p>
            <p className="text-xs text-gray-500">
              {post.county && `${post.county}`}
              {post.county && post.sub_county && ' • '}
              {post.sub_county && `${post.sub_county}`}
              {!post.county && !post.sub_county && formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
        {post.trade_tags && (
          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
            {JSON.parse(post.trade_tags)[0]}
          </span>
        )}
      </div>

      {/* Media */}
      {mainMedia && (
        <div 
          className="relative aspect-[4/5] bg-black cursor-pointer"
          onClick={() => onClick?.(post.id)}
        >
          {mainMedia.media_type === 'video' ? (
            <div className="relative w-full h-full">
              <video
                src={mainMedia.url}
                poster={mainMedia.thumbnail_url}
                className="w-full h-full object-contain"
                loop
                playsInline
                onClick={(e) => {
                  e.stopPropagation();
                  const video = e.currentTarget;
                  if (isPaused) {
                    video.play();
                    setIsPaused(false);
                  } else {
                    video.pause();
                    setIsPaused(true);
                  }
                }}
              />
              {isPaused && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="w-16 h-16 text-white" fill="white" />
                </div>
              )}
            </div>
          ) : (
            <img
              src={mainMedia.url}
              alt={post.caption || 'Post'}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Caption */}
      {post.caption && (
        <div className="p-3">
          <p className="text-sm text-gray-800 line-clamp-3">{post.caption}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
          >
            <Heart
              className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : ''}`}
            />
            <span className="text-sm">{likesCount}</span>
          </button>
          
          <button
            onClick={loadComments}
            className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm">{post.comments_count}</span>
          </button>
          
          <button
            onClick={() => onShare?.(post.id)}
            className="flex items-center gap-1 text-gray-600 hover:text-green-500 transition-colors"
          >
            <Share2 className="w-6 h-6" />
            <span className="text-sm">{post.shares_count}</span>
          </button>
        </div>
        
        <button className="text-gray-600 hover:text-gray-900 transition-colors">
          <Bookmark className="w-6 h-6" />
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 p-3">
          {/* Comment Input */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              onKeyDown={(e) => e.key === 'Enter' && handleComment()}
            />
            <button
              onClick={handleComment}
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
            >
              Post
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <img
                  src={comment.user?.avatar || `https://ui-avatars.com/api/?name=${comment.user?.username}&background=666&color=fff`}
                  alt={comment.user?.username}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{comment.user?.name || comment.user?.username}</span>{' '}
                    <span className="text-gray-700">{comment.content}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-2">No comments yet</p>
            )}
          </div>
        </div>
      )}

      {/* View Count */}
      {post.views_count > 0 && (
        <div className="px-3 pb-2">
          <p className="text-xs text-gray-400">{post.views_count.toLocaleString()} views</p>
        </div>
      )}
    </div>
  );
};

export default PostCard;