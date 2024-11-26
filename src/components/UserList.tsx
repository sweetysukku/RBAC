import React from 'react';
import { User, Role } from '../types';
import { mockUsers, mockRoles } from '../data/mock';
import { Edit2, Trash2 } from 'lucide-react';
import UserModal from './UserModal';
import UserActions from './UserActions';
import DeleteConfirmation from './DeleteConfirmation';

export default function UserList() {
  const [users, setUsers] = React.useState<User[]>(mockUsers);
  const [roles] = React.useState<Role[]>(mockRoles);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<User | undefined>();
  const [deleteUser, setDeleteUser] = React.useState<User | undefined>();

  const getRoleName = (roleId: string) => {
    return roles.find(role => role.id === roleId)?.name || 'Unknown';
  };

  const handleAddUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: userData.name!,
      email: userData.email!,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces`,
      roleId: userData.roleId!,
      status: userData.status as 'active' | 'inactive',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
  };

  const handleEditUser = (userData: Partial<User>) => {
    setUsers(users.map(user => 
      user.id === editingUser?.id 
        ? { ...user, ...userData }
        : user
    ));
    setEditingUser(undefined);
  };

  const handleDeleteUser = () => {
    if (deleteUser) {
      setUsers(users.filter(user => user.id !== deleteUser.id));
      setDeleteUser(undefined);
    }
  };

  const handleUserAction = (action: string, user: User) => {
    switch (action) {
      case 'resetPassword':
        alert(`Password reset email sent to ${user.email}`);
        break;
      case 'suspend':
        setUsers(users.map(u => 
          u.id === user.id 
            ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
            : u
        ));
        break;
      case 'audit':
        alert(`Viewing audit log for ${user.name}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Users</h2>
          <button 
            onClick={() => {
              setEditingUser(undefined);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add User
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {getRoleName(user.roleId)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.lastLogin).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      onClick={() => {
                        setEditingUser(user);
                        setIsModalOpen(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => setDeleteUser(user)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <UserActions onAction={(action) => handleUserAction(action, user)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(undefined);
        }}
        onSubmit={editingUser ? handleEditUser : handleAddUser}
        roles={roles}
        editUser={editingUser}
      />

      <DeleteConfirmation
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(undefined)}
        onConfirm={handleDeleteUser}
        userName={deleteUser?.name || ''}
      />
    </div>
  );
}