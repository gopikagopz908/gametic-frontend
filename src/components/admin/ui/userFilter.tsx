"use client";
import { useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";

interface UserFilterProps {
  onSearch: (search: string) => void;
  getRole: (role: string) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ onSearch, getRole }) => {
  const [filterRole, setFilterRole] = useState<string>("");
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState<boolean>(false);
  
  const roles = [
    { label: "Users", value: "user" },
    { label: "Owners", value: "owner" },
  ];

  return (
    <div className="p-6 border-b border-gray-200 flex items-center gap-4">
      {/* Role Dropdown */}
      <div className="relative w-48">
        <button
          onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <div className="flex items-center justify-between">
            <span>{filterRole || "Filter by Role"}</span>
            {filterRole ? (
              <X
                size={16}
                className="text-gray-500 hover:text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setFilterRole("");
                  getRole("");
                }}
              />
            ) : (
              <ChevronDown size={16} className="text-gray-500" />
            )}
          </div>
        </button>

        {/* Dropdown Menu */}
        {isRoleDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
            {roles.map((role) => (
              <div
                key={role.value}
                className="text-gray-700 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 text-sm"
                onClick={() => {
                  setFilterRole(role.label);
                  getRole(role.value);
                  setIsRoleDropdownOpen(false);
                }}
              >
                {role.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search users by name, email or any other information..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* We could add more filter options here */}
    </div>
  );
};

export default UserFilter;