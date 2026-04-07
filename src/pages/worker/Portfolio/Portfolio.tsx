/**
 * Worker Portfolio Page - Before/After work photos
 */
import React, { useState } from 'react';
import {
  PhotoIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
  EyeIcon,
  HeartIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Card } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Badge } from '@components/ui/Badge';
import { Modal } from '@components/ui/Modal';
import { Input } from '@components/ui/Input';

interface PortfolioItem {
  id: number;
  before_photo_url: string | null;
  after_photo_url: string;
  title: string;
  description: string | null;
  skill_name: string | null;
  county: string | null;
  days_to_complete: number | null;
  views_count: number;
  likes_count: number;
  is_featured: boolean;
  is_public: boolean;
  created_at: string;
}

// Mock data for demo
const mockPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    before_photo_url: null,
    after_photo_url: '/portfolio/example1.jpg',
    title: 'Complete Bathroom Renovation',
    description: 'Full bathroom overhaul - tiles, plumbing, and fixtures installed in Karen home.',
    skill_name: 'Plumbing',
    county: 'Nairobi',
    days_to_complete: 5,
    views_count: 124,
    likes_count: 18,
    is_featured: true,
    is_public: true,
    created_at: '2026-03-15T10:00:00Z',
  },
  {
    id: 2,
    before_photo_url: null,
    after_photo_url: '/portfolio/example2.jpg',
    title: 'Kitchen Cabinet Installation',
    description: 'Custom mdf cabinets fitted in Westlands apartment.',
    skill_name: 'Carpentry',
    county: 'Nairobi',
    days_to_complete: 3,
    views_count: 89,
    likes_count: 12,
    is_featured: false,
    is_public: true,
    created_at: '2026-03-10T14:00:00Z',
  },
];

export const WorkerPortfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(mockPortfolioItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skill: '',
    county: '',
    days_to_complete: '',
    before_photo: null as File | null,
    after_photo: null as File | null,
  });

  const handleAddItem = async () => {
    setIsUploading(true);
    // TODO: Call API to create portfolio item
    setTimeout(() => {
      const newItem: PortfolioItem = {
        id: Date.now(),
        before_photo_url: formData.before_photo ? URL.createObjectURL(formData.before_photo) : null,
        after_photo_url: formData.after_photo ? URL.createObjectURL(formData.after_photo) : '/placeholder.jpg',
        title: formData.title,
        description: formData.description,
        skill_name: formData.skill || null,
        county: formData.county || null,
        days_to_complete: formData.days_to_complete ? parseInt(formData.days_to_complete) : null,
        views_count: 0,
        likes_count: 0,
        is_featured: false,
        is_public: true,
        created_at: new Date().toISOString(),
      };
      setPortfolioItems([newItem, ...portfolioItems]);
      setIsAddModalOpen(false);
      setIsUploading(false);
      setFormData({
        title: '',
        description: '',
        skill: '',
        county: '',
        days_to_complete: '',
        before_photo: null,
        after_photo: null,
      });
    }, 1000);
  };

  const handleDeleteItem = (id: number) => {
    if (confirm('Delete this portfolio item?')) {
      setPortfolioItems(portfolioItems.filter(item => item.id !== id));
    }
  };

  const handleFeatureItem = (id: number) => {
    setPortfolioItems(portfolioItems.map(item => ({
      ...item,
      is_featured: item.id === id ? !item.is_featured : false,
    })));
  };

  const featuredItems = portfolioItems.filter(item => item.is_featured);
  const otherItems = portfolioItems.filter(item => !item.is_featured);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            My Portfolio
          </h1>
          <p className="mt-1 text-slate-600">
            Show off your best work - before & after photos
          </p>
        </div>
        <Button 
          leftIcon={<PlusIcon className="h-5 w-5" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Work
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">{portfolioItems.length}</p>
          <p className="text-sm text-slate-600">Total Projects</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">
            {portfolioItems.reduce((sum, item) => sum + item.views_count, 0)}
          </p>
          <p className="text-sm text-slate-600">Total Views</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">
            {portfolioItems.reduce((sum, item) => sum + item.likes_count, 0)}
          </p>
          <p className="text-sm text-slate-600">Total Likes</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">{featuredItems.length}</p>
          <p className="text-sm text-slate-600">Featured</p>
        </Card>
      </div>

      {/* Featured Work */}
      {featuredItems.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <StarIcon className="h-5 w-5 text-orange-500" />
            Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map(item => (
              <PortfolioCard 
                key={item.id} 
                item={item} 
                onView={() => { setSelectedItem(item); setIsViewModalOpen(true); }}
                onDelete={() => handleDeleteItem(item.id)}
                onFeature={() => handleFeatureItem(item.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Work */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          {featuredItems.length > 0 ? 'Other Work' : 'My Work'}
        </h2>
        {otherItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherItems.map(item => (
              <PortfolioCard 
                key={item.id} 
                item={item} 
                onView={() => { setSelectedItem(item); setIsViewModalOpen(true); }}
                onDelete={() => handleDeleteItem(item.id)}
                onFeature={() => handleFeatureItem(item.id)}
              />
            ))}
          </div>
        ) : featuredItems.length === 0 ? (
          <Card className="p-12 text-center">
            <PhotoIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No portfolio items yet
            </h3>
            <p className="text-slate-600 mb-6">
              Add photos of your completed work to show employers what you can do
            </p>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <PlusIcon className="h-5 w-5" />
              Add Your First Project
            </Button>
          </Card>
        ) : null}
      </div>

      {/* Add Portfolio Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Portfolio Item"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              After Photo (Required) *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-orange-400 transition-colors cursor-pointer">
              <div className="space-y-2 text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-slate-400" />
                <div className="flex text-sm text-slate-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500">
                    <span>Upload after photo</span>
                    <input 
                      type="file" 
                      className="sr-only" 
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, after_photo: e.target.files?.[0] || null })}
                    />
                  </label>
                </div>
                {formData.after_photo && (
                  <p className="text-xs text-green-600">{formData.after_photo.name}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Before Photo (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-slate-400 transition-colors cursor-pointer">
              <div className="space-y-2 text-center">
                <PhotoIcon className="mx-auto h-8 w-8 text-slate-400" />
                <div className="flex text-sm text-slate-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-slate-600 hover:text-slate-500">
                    <span>Upload before photo</span>
                    <input 
                      type="file" 
                      className="sr-only" 
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, before_photo: e.target.files?.[0] || null })}
                    />
                  </label>
                </div>
                {formData.before_photo && (
                  <p className="text-xs text-green-600">{formData.before_photo.name}</p>
                )}
              </div>
            </div>
          </div>

          <Input
            label="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Complete Bathroom Renovation"
            required
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              rows={3}
              placeholder="Describe what you did..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Skill Used"
              value={formData.skill}
              onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
              placeholder="e.g., Plumbing"
            />
            <Input
              label="Days to Complete"
              type="number"
              value={formData.days_to_complete}
              onChange={(e) => setFormData({ ...formData, days_to_complete: e.target.value })}
              placeholder="e.g., 5"
            />
          </div>

          <Input
            label="Location"
            value={formData.county}
            onChange={(e) => setFormData({ ...formData, county: e.target.value })}
            placeholder="e.g., Nairobi"
          />

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-orange-600 hover:bg-orange-700" 
              onClick={handleAddItem}
              disabled={!formData.title || !formData.after_photo}
              isLoading={isUploading}
            >
              Add to Portfolio
            </Button>
          </div>
        </div>
      </Modal>

      {/* View Portfolio Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={selectedItem?.title || 'Portfolio Item'}
      >
        {selectedItem && (
          <div className="space-y-4">
            {selectedItem.before_photo_url && selectedItem.after_photo_url && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Before</p>
                  <img src={selectedItem.before_photo_url} alt="Before" className="rounded-lg w-full h-40 object-cover bg-slate-100" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">After</p>
                  <img src={selectedItem.after_photo_url} alt="After" className="rounded-lg w-full h-40 object-cover bg-slate-100" />
                </div>
              </div>
            )}
            {!selectedItem.before_photo_url && selectedItem.after_photo_url && (
              <img src={selectedItem.after_photo_url} alt={selectedItem.title} className="rounded-lg w-full h-64 object-cover bg-slate-100" />
            )}
            
            {selectedItem.description && (
              <p className="text-slate-600">{selectedItem.description}</p>
            )}
            
            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              {selectedItem.skill_name && (
                <Badge variant="outline">{selectedItem.skill_name}</Badge>
              )}
              {selectedItem.county && (
                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  {selectedItem.county}
                </span>
              )}
              {selectedItem.days_to_complete && (
                <span className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  {selectedItem.days_to_complete} days
                </span>
              )}
              <span className="flex items-center gap-1">
                <EyeIcon className="h-4 w-4" />
                {selectedItem.views_count} views
              </span>
              <span className="flex items-center gap-1">
                <HeartIcon className="h-4 w-4" />
                {selectedItem.likes_count} likes
              </span>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleFeatureItem(selectedItem.id)}
              >
                <StarIcon className={`h-4 w-4 ${selectedItem.is_featured ? 'fill-orange-500 text-orange-500' : ''}`} />
                {selectedItem.is_featured ? 'Unfeature' : 'Feature'}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => { handleDeleteItem(selectedItem.id); setIsViewModalOpen(false); }}
              >
                <TrashIcon className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Portfolio Card Component
const PortfolioCard: React.FC<{
  item: PortfolioItem;
  onView: () => void;
  onDelete: () => void;
  onFeature: () => void;
}> = ({ item, onView, onDelete, onFeature }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative" onClick={onView}>
        {item.before_photo_url && item.after_photo_url ? (
          <div className="grid grid-cols-2">
            <img src={item.before_photo_url} alt="Before" className="h-32 w-full object-cover bg-slate-100" />
            <img src={item.after_photo_url} alt="After" className="h-32 w-full object-cover bg-slate-100" />
          </div>
        ) : (
          <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <PhotoIcon className="h-12 w-12 text-slate-400" />
          </div>
        )}
        {item.is_featured && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-orange-500 text-white border-0">
              <StarIcon className="h-3 w-3 fill-current" />
              Featured
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 truncate">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">{item.description}</p>
        )}
        
        <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
          <div className="flex gap-3">
            <span className="flex items-center gap-1">
              <EyeIcon className="h-3.5 w-3.5" />
              {item.views_count}
            </span>
            <span className="flex items-center gap-1">
              <HeartIcon className="h-3.5 w-3.5" />
              {item.likes_count}
            </span>
          </div>
          {item.skill_name && (
            <Badge variant="outline" className="text-xs">{item.skill_name}</Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WorkerPortfolio;