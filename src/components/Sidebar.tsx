import React from 'react';
import { Users, Shield, Settings, BarChart3, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Users', href: '/', icon: Users },
  { name: 'Roles', href: '/roles', icon: Shield },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
];

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-gray-900 min-h-screen p-4`}>
      <div className="flex items-center justify-between mb-8">
        <h1 className={`text-white font-bold ${isOpen ? 'block' : 'hidden'}`}>RBAC Dashboard</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-gray-800">
          <Menu className="text-white" />
        </button>
      </div>
      
      <nav className="space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="h-5 w-5" />
              {isOpen && <span className="ml-3">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}