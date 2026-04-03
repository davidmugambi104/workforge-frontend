import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance as api } from '@lib/axios';

const API_URL = '/api/admin/advanced';

// Types
export interface AuditLog {
  id: number;
  admin_id: number;
  admin_username: string;
  action: string;
  resource_type: string;
  resource_id: number;
  details: Record<string, any>;
  ip_address: string;
  timestamp: string;
}

export interface Notification {
  id: number;
  admin_id: number | null;
  type: string;
  title: string;
  message: string;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Role {
  id: number;
  name: string;
  permissions: string[];
  description: string;
  created_at: string;
  user_count: number;
}

// API Functions
const fetchAuditLogs = async (params: {
  page?: number;
  per_page?: number;
  admin_id?: number;
  action?: string;
  resource_type?: string;
  resource_id?: number;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}): Promise<{ items: AuditLog[]; total: number; page: number; pages: number }> => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) searchParams.append(key, String(value));
  });
  const response = await api.get(`${API_URL}/audit-logs?${searchParams}`);
  return response.data;
};

const fetchNotifications = async (params?: {
  page?: number;
  per_page?: number;
  is_read?: boolean;
}): Promise<{ items: Notification[]; total: number; page: number; pages: number }> => {
  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, String(value));
    });
  }
  const response = await api.get(`${API_URL}/notifications?${searchParams}`);
  return response.data;
};

const fetchUnreadCount = async (): Promise<{ unread_count: number }> => {
  const response = await api.get(`${API_URL}/notifications/unread-count`);
  return response.data;
};

const markNotificationsRead = async (notificationIds?: number[]): Promise<{ success: boolean }> => {
  const response = await api.post(`${API_URL}/notifications/mark-read`, { notification_ids: notificationIds });
  return response.data;
};

const fetchRoles = async (): Promise<{ roles: Role[] }> => {
  const response = await api.get(`${API_URL}/roles`);
  return response.data;
};

const fetchRole = async (roleId: number): Promise<Role> => {
  const response = await api.get(`${API_URL}/roles/${roleId}`);
  return response.data;
};

const createRole = async (data: { name: string; permissions: string[]; description?: string }): Promise<Role> => {
  const response = await api.post(`${API_URL}/roles`, data);
  return response.data;
};

const updateRole = async (roleId: number, data: Partial<Role>): Promise<Role> => {
  const response = await api.put(`${API_URL}/roles/${roleId}`, data);
  return response.data;
};

const deleteRole = async (roleId: number): Promise<{ success: boolean }> => {
  const response = await api.delete(`${API_URL}/roles/${roleId}`);
  return response.data;
};

// Hooks
export const useAuditLogs = (params: {
  page?: number;
  per_page?: number;
  admin_id?: number;
  action?: string;
  resource_type?: string;
  resource_id?: number;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}) => {
  return useQuery({
    queryKey: ['auditLogs', params],
    queryFn: () => fetchAuditLogs(params),
  });
};

export const useNotifications = (params?: {
  page?: number;
  per_page?: number;
  is_read?: boolean;
}) => {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: () => fetchNotifications(params),
  });
};

export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: fetchUnreadCount,
    refetchInterval: 30000, // Poll every 30 seconds
  });
};

export const useMarkNotificationsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });
};

export const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
  });
};

export const useRole = (roleId: number) => {
  return useQuery({
    queryKey: ['role', roleId],
    queryFn: () => fetchRole(roleId),
    enabled: !!roleId,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ roleId, data }: { roleId: number; data: Partial<Role> }) => 
      updateRole(roleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

// Export hook
export const useExport = () => {
  return useMutation({
    mutationFn: async ({ resource, format, params }: { 
      resource: 'users' | 'reports' | 'payments'; 
      format: 'csv' | 'pdf';
      params?: Record<string, any>;
    }) => {
      const searchParams = new URLSearchParams({ format });
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) searchParams.append(key, String(value));
        });
      }
      const response = await api.get(`${API_URL}/export/${resource}?${searchParams}`);
      return response.data;
    },
  });
};