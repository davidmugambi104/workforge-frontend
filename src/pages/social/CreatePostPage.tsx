import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { X, Video, Image, FileText, MapPin, ChevronLeft, Send } from 'lucide-react';
import { postsApi, storiesApi } from '../../services/social.service';
import { useAuth } from '../../context/AuthContext';
import { StoryMediaType, PostType, PostVisibility } from '../../types/social.types';

type Tab = 'post' | 'story';

export const CreatePostPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as Tab) || 'post';
  
  const [activeTab, setActiveTab] = useState<Tab>(initialTab as Tab);
  const [postType, setPostType] = useState<PostType>(PostType.IMAGE);
  const [caption, setCaption] = useState('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreview, setMediaPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [county, setCounty] = useState('');
  const [subCounty, setSubCounty] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'followers' | 'private'>('public');
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // For stories, only allow single media
    if (activeTab === 'story' && files.length > 1) {
      alert('Stories can only have one image or video');
      return;
    }

    // Check file types
    const validFiles = files.filter(file => {
      const type = file.type.split('/')[0];
      return type === 'image' || type === 'video';
    });

    if (validFiles.length !== files.length) {
      alert('Only images and videos are allowed');
      return;
    }

    // Determine post type
    const hasVideo = validFiles.some(f => f.type.startsWith('video'));
    const hasImage = validFiles.some(f => f.type.startsWith('image'));
    if (hasVideo && hasImage) {
      setPostType(PostType.VIDEO); // Default to video if mixed
    } else if (hasVideo) {
      setPostType(PostType.VIDEO);
    } else {
      setPostType(PostType.IMAGE);
    }

    setMediaFiles(prev => [...prev, ...validFiles].slice(0, 10)); // Max 10 files
    
    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaPreview(prev => [...prev, e.target?.result as string].slice(0, 10));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
    setMediaPreview(prev => prev.filter((_, i) => i !== index));
  };

  const uploadMedia = async (files: File[]): Promise<{ url: string; media_type: string }[]> => {
    // TODO: Integrate with your actual upload service
    // For now, we'll use the files directly or placeholder URLs
    // This should be replaced with actual file upload logic
    
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    // Placeholder - replace with actual upload endpoint
    const uploadPromises = files.map(async (file) => {
      // Simulating upload - in production, use your upload service
      return {
        url: URL.createObjectURL(file), // Replace with actual uploaded URL
        media_type: file.type.startsWith('video') ? 'video' : 'image',
      };
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async () => {
    if (!caption.trim() && mediaFiles.length === 0) {
      alert('Please add a caption or media');
      return;
    }

    setLoading(true);
    try {
      if (activeTab === 'story') {
        // Create story
        if (mediaFiles.length === 0) {
          alert('Stories require an image or video');
          return;
        }

        const uploadedMedia = await uploadMedia([mediaFiles[0]]);
        const storyMediaType = uploadedMedia[0].media_type === 'video' ? StoryMediaType.VIDEO : StoryMediaType.IMAGE;
        await storiesApi.create({
          media_type: storyMediaType,
          media_url: uploadedMedia[0].url,
          caption: caption.trim() || undefined,
          county: county || undefined,
          sub_county: subCounty || undefined,
        });
      } else {
        // Create post
        const uploadedMedia = mediaFiles.length > 0 ? await uploadMedia(mediaFiles) : [];
        
        const isTextPost = caption.trim() && uploadedMedia.length === 0;
        const isVideo = uploadedMedia.some(m => m.media_type === 'video');
        const finalPostType = isTextPost ? PostType.TEXT : (isVideo ? PostType.VIDEO : PostType.IMAGE);
        
        const finalVisibility = visibility === 'public' ? PostVisibility.PUBLIC : visibility === 'followers' ? PostVisibility.FOLLOWERS : PostVisibility.PRIVATE;
        
        await postsApi.create({
          post_type: finalPostType,
          caption: caption.trim() || undefined,
          visibility: finalVisibility,
          media: uploadedMedia.length > 0 ? uploadedMedia : undefined,
          county: county || undefined,
          sub_county: subCounty || undefined,
        });
      }

      navigate('/social/feed');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="font-semibold text-lg">
            Create {activeTab === 'story' ? 'Story' : 'Post'}
          </h1>
          <button
            onClick={handleSubmit}
            disabled={loading || (!caption.trim() && mediaFiles.length === 0)}
            className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>

      {/* Tab Bar (only for posts) */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('post')}
            className={`flex-1 py-3 text-center font-medium text-sm ${
              activeTab === 'post'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500'
            }`}
          >
            <Image className="w-4 h-4 inline mr-1" />
            Post
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`flex-1 py-3 text-center font-medium text-sm ${
              activeTab === 'story'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500'
            }`}
          >
            <Video className="w-4 h-4 inline mr-1" />
            Story
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Media Upload */}
        <div className="mb-4">
          {mediaPreview.length === 0 ? (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
              {activeTab === 'story' ? (
                <Video className="w-12 h-12 text-gray-400 mb-2" />
              ) : (
                <Image className="w-12 h-12 text-gray-400 mb-2" />
              )}
              <span className="text-gray-500 text-sm">
                {activeTab === 'story' ? 'Add photo or video for your story' : 'Add photos or videos'}
              </span>
              <span className="text-gray-400 text-xs mt-1">
                {activeTab === 'story' ? 'Stories disappear after 24 hours' : 'Up to 10 photos/videos'}
              </span>
              <input
                type="file"
                accept="image/*,video/*"
                multiple={activeTab === 'post'}
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {mediaPreview.map((preview, index) => (
                <div key={index} className="relative aspect-square">
                  {mediaFiles[index]?.type.startsWith('video') ? (
                    <video
                      src={preview}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                  <button
                    onClick={() => removeMedia(index)}
                    className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
              {activeTab === 'post' && mediaPreview.length < 10 && (
                <label className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500">
                  <Plus className="w-8 h-8 text-gray-400" />
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="mb-4">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder={activeTab === 'story' ? "What's happening?" : "Write a caption..."}
            className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            maxLength={activeTab === 'story' ? 500 : 2000}
          />
          <p className="text-right text-xs text-gray-400 mt-1">
            {caption.length}/{activeTab === 'story' ? 500 : 2000}
          </p>
        </div>

        {/* Location */}
        <div className="mb-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500">
            <MapPin className="w-5 h-5" />
            <span className="text-sm">
              {county ? `${county}${subCounty ? `, ${subCounty}` : ''}` : 'Add location'}
            </span>
          </button>
          {county && (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                placeholder="County"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                value={subCounty}
                onChange={(e) => setSubCounty(e.target.value)}
                placeholder="Sub-county"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}
        </div>

        {/* Visibility (posts only) */}
        {activeTab === 'post' && (
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Who can see this?</p>
            <div className="flex gap-2">
              {['public', 'followers', 'private'].map((v) => (
                <button
                  key={v}
                  onClick={() => setVisibility(v as 'public' | 'followers' | 'private')}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    visibility === v
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Plus icon component
const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default CreatePostPage;