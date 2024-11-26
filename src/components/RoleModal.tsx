import React from 'react';
import { X } from 'lucide-react';
import { Role, Resource, Permission } from '../types';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (role: Partial<Role>) => void;
  editRole?: Role;
}

const resources: Resource[] = ['users', 'roles', 'settings', 'reports'];
const permissions: Permission[] = ['read', 'write', 'delete', 'manage'];

export default function RoleModal({ isOpen, onClose, onSubmit, editRole }: RoleModalProps) {
  const [formData, setFormData] = React.useState<Partial<Role>>({
    name: '',
    description: '',
    permissions: {},
    ...editRole,
  });

  React.useEffect(() => {
    if (editRole) {
      setFormData(editRole);
    } else {
      setFormData({
        name: '',
        description: '',
        permissions: {},
      });
    }
  }, [editRole]);

  const handlePermissionChange = (resource: Resource, permission: Permission) => {
    const currentPermissions = formData.permissions?.[resource] || [];
    const newPermissions = currentPermissions.includes(permission)
      ? currentPermissions.filter(p => p !== permission)
      : [...currentPermissions, permission];

    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [resource]: newPermissions,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editRole ? 'Edit Role' : 'Add New Role'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
                required
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Permissions</h3>
            <div className="space-y-4">
              {resources.map((resource) => (
                <div key={resource} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2 capitalize">{resource}</h4>
                  <div className="flex flex-wrap gap-2">
                    {permissions.map((permission) => (
                      <label
                        key={permission}
                        className="inline-flex items-center"
                      >
                        <input
                          type="checkbox"
                          checked={formData.permissions?.[resource]?.includes(permission) || false}
                          onChange={() => handlePermissionChange(resource, permission)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-600 capitalize">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              {editRole ? 'Update Role' : 'Add Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}