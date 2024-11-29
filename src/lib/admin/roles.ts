import { User } from 'firebase/auth';

export type Role = 'admin' | 'moderator' | 'user';

export interface AdminUser extends User {
  role: Role;
  permissions: string[];
}

// Define permission constants
export const PERMISSIONS = {
  MANAGE_USERS: 'manage_users',
  MANAGE_PRODUCTS: 'manage_products',
  APPROVE_PRODUCTS: 'approve_products',
  DELETE_PRODUCTS: 'delete_products',
  MANAGE_CATEGORIES: 'manage_categories',
  VIEW_ANALYTICS: 'view_analytics',
} as const;

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  admin: Object.values(PERMISSIONS),
  moderator: [
    PERMISSIONS.APPROVE_PRODUCTS,
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
  user: [],
};

// Utility functions for role management
export function hasPermission(user: AdminUser, permission: string): boolean {
  return user.permissions.includes(permission);
}

export function canManageProducts(user: AdminUser): boolean {
  return hasPermission(user, PERMISSIONS.MANAGE_PRODUCTS);
}

export function canApproveProducts(user: AdminUser): boolean {
  return hasPermission(user, PERMISSIONS.APPROVE_PRODUCTS);
}