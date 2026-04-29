import React from 'react';
import { useRouter } from 'next/navigation';

interface BreadcrumbNavProps {
  username?: string;
  turfName: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ username, turfName }) => {
  const router = useRouter();

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <button 
            onClick={() => router.push('/owner')}
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            {username}
          </button>
        </li>
        <li>
          <div className="flex items-center">
            <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <button 
              onClick={() => router.push('/owner')}
              className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
            >
              My Turfs
            </button>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{turfName}</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;