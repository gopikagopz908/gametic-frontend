"use client";
import { useEffect, useState } from "react";
import { blockUser, fetchAllUser } from "@/redux/actions/admin/userActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { User } from "@/redux/slices/admin/userSlice";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Ban,
  Pencil,
  Trash2,
  ArrowUpDown,
  Eye
} from "lucide-react";

interface UserListProps {
  search: string;
  role: string;
}

const UserList: React.FC<UserListProps> = ({ search, role }) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { users, totalUsers, loading } = useAppSelector(
    (state) => state.adminUsers
  );

  // Total pages calculation
  const totalPages = Math.ceil(totalUsers / 5);

  useEffect(() => {
    dispatch(fetchAllUser({ page: currentPage, limit: 5, search, role }));
  }, [dispatch, currentPage, search, role]);

  const blockUserById = async (id: string): Promise<User | undefined> => {
    try {
      await dispatch(blockUser({ id })).unwrap();
      dispatch(fetchAllUser({ page: currentPage, limit: 5, search, role }));
      return undefined;
    } catch (error: unknown) {
      console.error("Failed to block user:", error);
      return undefined;
    }
  };

  // Skeleton for loading state
  const LoadingSkeleton = () => (
    <tbody>
      {[...Array(5)].map((_, index) => (
        <tr key={index}>
          {[...Array(6)].map((_, cellIndex) => (
            <td key={cellIndex} className="px-6 py-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer">
                  Name
                  <ArrowUpDown size={14} />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {user.username.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    +91 0000000000
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isBlocked
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.isBlocked ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative inline-block text-left group">
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <MoreHorizontal size={16} className="text-gray-500" />
                      </button>
                      <div className="hidden group-hover:block absolute right-0 z-10 mt-1 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <button 
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {}}
                          >
                            <Eye size={16} className="mr-2 text-gray-500" />
                            View Details
                          </button>
                          <button 
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {}}
                          >
                            <Pencil size={16} className="mr-2 text-gray-500" />
                            Edit
                          </button>
                          <button 
                            className={`flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100`}
                            onClick={() => blockUserById(user._id)}
                          >
                            <Ban size={16} className="mr-2" />
                            {user.isBlocked ? "Unban" : "Ban"}
                          </button>
                          <button 
                            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => {}}
                          >
                            <Trash2 size={16} className="mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      
      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{users.length > 0 ? (currentPage - 1) * 5 + 1 : 0}</span> to{" "}
              <span className="font-medium">{Math.min(currentPage * 5, totalUsers)}</span> of{" "}
              <span className="font-medium">{totalUsers}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                  currentPage === 1 
                    ? 'border-gray-300 bg-white text-gray-300 cursor-not-allowed' 
                    : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              
              {/* Dynamic page numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    currentPage === index + 1
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage >= totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                  currentPage >= totalPages 
                    ? 'border-gray-300 bg-white text-gray-300 cursor-not-allowed' 
                    : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;