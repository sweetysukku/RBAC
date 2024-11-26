import React from 'react';
import { Role } from '../types';
import { mockRoles } from '../data/mock';
import { Shield, Edit2, Trash2 } from 'lucide-react';
import RoleModal from './RoleModal';
import RoleActions from './RoleActions';
import RoleDeleteConfirmation from './RoleDeleteConfirmation';

export default function RoleList() {
  const [roles, setRoles] = React.useState<Role[]>(mockRoles);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingRole, setEditingRole] = React.useState<Role | undefined>();
  const [deleteRole, setDeleteRole] = React.useState<Role | undefined>();

  const handleAddRole = (roleData: Partial<Role>) => {
    const newRole: Role = {
      id: (roles.length + 1).toString(),
      name: roleData.name!,
      description: roleData.description!,
      permissions: roleData.permissions!,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRoles([...roles, newRole]);
  };

  const handleEditRole = (roleData: Partial<Role>) => {
    setRoles(roles.map(role => 
      role.id === editingRole?.id 
        ? { 
            ...role, 
            ...roleData, 
            updatedAt: new Date().toISOString() 
          }
        : role
    ));
    setEditingRole(undefined);
  };

  const handleDeleteRole = () => {
    if (deleteRole) {
      setRoles(roles.filter(role => role.id !== deleteRole.id));
      setDeleteRole(undefined);
    }
  };

  const handleRoleAction = (action: string, role: Role) => {
    switch (action) {
      case 'duplicate':
        const duplicatedRole: Role = {
          ...role,
          id: (roles.length + 1).toString(),
          name: `${role.name} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setRoles([...roles, duplicatedRole]);
        break;
      case 'audit':
        alert(`Viewing audit log for role: ${role.name}`);
        break;
      case 'export':
        const exportData = JSON.stringify(role.permissions, null, 2);
        alert(`Exporting permissions:\n${exportData}`);
        break;
      default:
        break;
    }
  };

  const getPermissionCount = (role: Role) => {
    return Object.values(role.permissions).flat().length;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Roles</h2>
          <button 
            onClick={() => {
              setEditingRole(undefined);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Role
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    setEditingRole(role);
                    setIsModalOpen(true);
                  }}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setDeleteRole(role)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <RoleActions onAction={(action) => handleRoleAction(action, role)} />
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(role.permissions).map(([resource, permissions]) => (
                  <div key={resource} className="bg-gray-100 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-700 mb-1 capitalize">{resource}</div>
                    <div className="flex flex-wrap gap-1">
                      {permissions.map((permission) => (
                        <span
                          key={permission}
                          className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-500">
              <div>Created {new Date(role.createdAt).toLocaleDateString()}</div>
              <div>{getPermissionCount(role)} total permissions</div>
            </div>
          </div>
        ))}
      </div>

      <RoleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRole(undefined);
        }}
        onSubmit={editingRole ? handleEditRole : handleAddRole}
        editRole={editingRole}
      />

      <RoleDeleteConfirmation
        isOpen={!!deleteRole}
        onClose={() => setDeleteRole(undefined)}
        onConfirm={handleDeleteRole}
        roleName={deleteRole?.name || ''}
      />
    </div>
  );
}