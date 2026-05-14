// workforge-frontend/src/pages/admin/Dashboard/Dashboard.tsx
import React from 'react';
// Use new enterprise layout (Phase 3)
import { EnterpriseAdminLayout } from '@components/layout/EnterpriseAdminLayout';

const Dashboard: React.FC = () => {
  return (
    <EnterpriseAdminLayout>
      <div className="rounded-2xl border border-white/5 bg-[#121218] p-6">
        <h2 className="text-xl font-semibold text-white">Platform Overview</h2>
        <p className="text-gray-400">Detailed analytics coming soon...</p>
      </div>
    </EnterpriseAdminLayout>
  );
};

export default Dashboard;
