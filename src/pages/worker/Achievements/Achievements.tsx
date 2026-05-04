import React, { useState, useEffect } from 'react';
import { 
  TrophyIcon, 
  StarIcon, 
  FireIcon,
  LockClosedIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Card } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { axiosClient } from '@lib/axios';

interface Achievement {
  id: number;
  type: string;
  title: string;
  description: string;
  points_earned: number;
  earned_at: string;
}

interface WorkerPoints {
  total_points: number;
  points_spent: number;
  current_balance: number;
  level: number;
}

export const WorkerAchievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [points, setPoints] = useState<WorkerPoints | null>(null);
  const [available, setAvailable] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await axiosClient.get('/achievements/me') as any;
      setAchievements(response.data?.achievements || []);
      setPoints(response.data?.points || null);
      setAvailable(response.data?.available_achievements || {});
    } catch (error) {
      console.error('Failed to load achievements');
    } finally {
      setLoading(false);
    }
  };

  const checkNewAchievements = async () => {
    try {
      await axiosClient.post('/achievements/check');
      fetchAchievements();
    } catch (error) {
      console.error('Failed to check achievements');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-slate-200 rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 bg-slate-200 rounded-lg" />
            <div className="h-24 bg-slate-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 lg:p-6 text-slate-900">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Level Card */}
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <TrophyIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Level</p>
              <p className="text-3xl font-bold">{points?.level || 1}</p>
            </div>
          </div>
        </Card>

        {/* Points Card */}
        <Card className="bg-gradient-to-br from-amber-500 to-yellow-500 text-white p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <StarIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Points</p>
              <p className="text-3xl font-bold">{points?.current_balance || 0}</p>
            </div>
          </div>
        </Card>

        {/* Total Earned Card */}
        <Card className="bg-gradient-to-br from-emerald-500 to-green-500 text-white p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <FireIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Total Earned</p>
              <p className="text-3xl font-bold">{points?.total_points || 0}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Check for New Achievements */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={checkNewAchievements}>
          Check for Achievements 🔄
        </Button>
      </div>

      {/* Earned Achievements */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrophyIcon className="h-6 w-6 text-orange-500" />
          Your Achievements
        </h2>
        {achievements.length === 0 ? (
          <p className="text-slate-500 text-center py-8">
            No achievements yet. Complete jobs to earn badges!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <div 
                key={ach.id}
                className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-100"
              >
                <CheckCircleIcon className="h-6 w-6 text-orange-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">{ach.title}</h3>
                  <p className="text-sm text-slate-600">{ach.description}</p>
                  <span className="text-xs text-orange-600 font-medium mt-1 block">
                    +{ach.points_earned} points
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Available Achievements */}
      {Object.keys(available).length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <LockClosedIcon className="h-6 w-6 text-slate-400" />
            Available to Unlock
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(available).map(([key, value]: [string, any]) => (
              <div 
                key={key}
                className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200"
              >
                <div className="w-6 h-6 rounded-full bg-slate-200 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-700">{value.title}</h3>
                  <p className="text-sm text-slate-500">{value.description}</p>
                  <span className="text-xs text-slate-500 font-medium mt-1 block">
                    +{value.points} points
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default WorkerAchievements;