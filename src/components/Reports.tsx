import React from 'react';
import { BarChart, Calendar, Users, Shield } from 'lucide-react';

const stats = [
  { name: 'Total Users', value: '2,543', change: '+12.3%', icon: Users },
  { name: 'Active Roles', value: '8', change: '+2.1%', icon: Shield },
  { name: 'Login Events', value: '12,453', change: '+15.3%', icon: Calendar },
  { name: 'Permission Changes', value: '245', change: '+5.2%', icon: BarChart },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Analytics Dashboard</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const isPositive = stat.change.startsWith('+');

              return (
                <div
                  key={stat.name}
                  className="bg-white overflow-hidden rounded-lg border"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {stat.name}
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {stat.value}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <span
                        className={`font-medium ${
                          isPositive ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-gray-500"> from last month</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="bg-white overflow-hidden rounded-lg border">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                <div className="mt-6 flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {[
                      { user: 'John Doe', action: 'updated role permissions', time: '2 hours ago' },
                      { user: 'Jane Smith', action: 'created new user account', time: '4 hours ago' },
                      { user: 'Mike Johnson', action: 'modified security settings', time: '6 hours ago' },
                      { user: 'Sarah Wilson', action: 'deleted role', time: '8 hours ago' },
                    ].map((item, idx) => (
                      <li key={idx} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.user}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.action}
                            </p>
                          </div>
                          <div className="flex-shrink-0 text-sm text-gray-500">
                            {item.time}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden rounded-lg border">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Permission Distribution</h3>
                <div className="mt-6 space-y-4">
                  {[
                    { name: 'Admin', count: 3, percentage: 15 },
                    { name: 'Editor', count: 8, percentage: 40 },
                    { name: 'Viewer', count: 12, percentage: 45 },
                  ].map((role) => (
                    <div key={role.name}>
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-600">{role.name}</div>
                        <div className="text-gray-900">{role.count} users</div>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${role.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}