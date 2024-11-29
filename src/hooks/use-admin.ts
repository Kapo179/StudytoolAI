import { useEffect, useState } from 'react';
import { useAuth } from './use-auth';
import { AdminUser, Role, ROLE_PERMISSIONS } from '@/lib/admin/roles';

export function useAdmin() {
  const { user } = useAuth();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!user) {
        setAdminUser(null);
        setLoading(false);
        return;
      }

      try {
        // This will be replaced with actual database lookup
        const mockRole: Role = 'user';
        const adminUser: AdminUser = {
          ...user,
          role: mockRole,
          permissions: ROLE_PERMISSIONS[mockRole],
        };

        setAdminUser(adminUser);
      } catch (error) {
        console.error('Error fetching admin status:', error);
        setAdminUser(null);
      }

      setLoading(false);
    };

    fetchAdminStatus();
  }, [user]);

  return {
    adminUser,
    loading,
    isAdmin: adminUser?.role === 'admin',
    isModerator: adminUser?.role === 'moderator',
  };
}