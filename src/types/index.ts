export type Permission = 'read' | 'write' | 'delete' | 'manage';

export type Resource = 'users' | 'roles' | 'settings' | 'reports';

export interface PermissionSet {
  [key: string]: Permission[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: PermissionSet;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleId: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}