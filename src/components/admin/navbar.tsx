"use client"
import { Search, Bell, Settings } from "lucide-react";
import StaggeredDropDown from "./ui/staggeredDropDown";

export default function Navbar() {
  const notificationCount = 4;

  return (
    <div className="w-full bg-white border-b border-[#998869]/20 py-5 px-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="hidden md:block"></div>

        {/* Right Section */}
        <div className="flex items-center space-x-8">
          {/* Search Button */}
          <button className="p-1.5 hover:bg-[#998869]/10 rounded-lg transition-colors duration-200">
            <Search className="w-5 h-5 text-[#998869]" />
          </button>

          {/* Notifications */}
          <button className="relative p-1.5 hover:bg-[#998869]/10 rounded-lg transition-colors duration-200">
            <Bell className="w-5 h-5 text-[#998869]" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-r from-[#415C41] to-[#00423D] text-white text-xs flex items-center justify-center rounded-full">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button className="p-1.5 hover:bg-[#998869]/10 rounded-lg transition-colors duration-200">
            <Settings className="w-5 h-5 text-[#998869]" />
          </button>

          {/* User Avatar */}
          {/* <button className="flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-[#415C41] to-[#00423D] rounded-full flex items-center justify-center">
              <StaggeredDropDown/>
            </div>
          </button> */}
          <div className="flex items-center justify-center">
  <div className="w-8 h-8 bg-gradient-to-r from-[#415C41] to-[#00423D] rounded-full flex items-center justify-center">
    <StaggeredDropDown />
  </div>
</div>
        </div>
      </div>
    </div>
  );
}