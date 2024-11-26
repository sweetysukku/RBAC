import { Role, User } from '../types';

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: {
      users: ['read', 'write', 'delete', 'manage'],
      roles: ['read', 'write', 'delete', 'manage'],
      settings: ['read', 'write', 'manage'],
      reports: ['read', 'write', 'manage'],
    },
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:00:00Z',
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Content management access',
    permissions: {
      users: ['read'],
      roles: ['read'],
      settings: ['read'],
      reports: ['read', 'write'],
    },
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:00:00Z',
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    roleId: '1',
    status: 'active',
    lastLogin: '2024-03-10T12:00:00Z',
    createdAt: '2024-03-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    roleId: '2',
    status: 'active',
    lastLogin: '2024-03-10T11:30:00Z',
    createdAt: '2024-03-02T10:00:00Z',
  },
];