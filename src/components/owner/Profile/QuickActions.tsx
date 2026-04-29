"use client";

import React from 'react';
import { Plus, Calendar, BarChart3, Settings, MapPin, Users } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Add New Turf',
      description: 'Create a new turf facility',
      icon: <Plus size={24} className="text-blue-600" />,
      href: '/owner',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'View Bookings',
      description: 'Check all bookings',
      icon: <Calendar size={24} className="text-green-600" />,
      href: '/owner/bookings',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Analytics',
      description: 'View detailed reports',
      icon: <BarChart3 size={24} className="text-purple-600" />,
      href: '/owner/analytics',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Manage Turfs',
      description: 'Edit existing turfs',
      icon: <MapPin size={24} className="text-orange-600" />,
      href: '/owner',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      title: 'Customer Management',
      description: 'View customer details',
      icon: <Users size={24} className="text-indigo-600" />,
      href: '/owner/customers',
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      title: 'Settings',
      description: 'Configure your account',
      icon: <Settings size={24} className="text-gray-600" />,
      href: '/owner/profile',
      color: 'bg-gray-50 border-gray-200'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className={`p-4 rounded-lg border-2 ${action.color} hover:shadow-md transition-all duration-200 group`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                {action.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {action.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
