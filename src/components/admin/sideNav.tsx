"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, Menu } from "lucide-react";
import localFont from "next/font/local";
import {
  AnalyticsIcon,
  AppIcon,
  BookingIcon,
  InvoiceIcon,
  OrderIcon,
  ProductIcon,
  UserIcon,
} from "./ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const racesport = localFont({
  src: "../../fonts/RaceSport.ttf",
  variable: "--font-RaceSport",
});

interface NavItemType {
  label: string;
  icon: React.ReactNode;
  path: string;
  hasSubmenu?: boolean;
  subItems?: Array<{ label: string; path: string }>;
}

interface NavSectionType {
  title: string;
  items: NavItemType[];
}

// Enhanced SectionHeader with gradient accent
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="px-4 py-3 mt-4 mb-1 relative">
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-[#415C41] to-[#00423D] rounded-r"></div>
    <span className="text-xs font-semibold text-[#998869] uppercase tracking-wider pl-2">
      {title}
    </span>
  </div>
);

// Enhanced NavItem with animations and better visual design
const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  hasSubmenu?: boolean;
  isActive?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
}> = ({
  icon,
  label,
  hasSubmenu = false,
  isActive = false,
  isExpanded = false,
  onClick,
}) => (
  <div
    className={`flex items-center px-4 py-3 my-1 rounded-lg cursor-pointer transition-all duration-200 
      ${
        isActive
          ? "bg-gradient-to-r from-[#415C41]/10 to-[#00423D]/10 border-l-4 border-[#415C41]"
          : "hover:bg-[#998869]/5 hover:translate-x-1"
      }`}
    onClick={onClick}
  >
    <div
      className={`mr-3 transition-colors duration-200 ${
        isActive ? "text-[#415C41]" : "text-[#998869]"
      }`}
    >
      {icon}
    </div>
    <span
      className={`flex-grow font-medium transition-colors duration-200 ${
        isActive ? "text-[#415C41]" : "text-[#00423D]"
      }`}
    >
      {label}
    </span>
    {hasSubmenu &&
      (isExpanded ? (
        <ChevronDown
          size={16}
          className={`transform transition-transform duration-200 ${
            isActive ? "text-[#415C41]" : "text-[#998869]"
          }`}
        />
      ) : (
        <ChevronRight
          size={16}
          className={`transform transition-transform duration-200 ${
            isActive ? "text-[#415C41]" : "text-[#998869]"
          }`}
        />
      ))}
  </div>
);

// Sub-menu item component
const SubMenuItem: React.FC<{ label: string; isActive: boolean }> = ({
  label,
  isActive,
}) => (
  <div
    className={`flex items-center px-4 py-2 pl-12 rounded-lg cursor-pointer transition-all duration-200 text-sm
    ${
      isActive
        ? "bg-[#415C41]/10 text-[#415C41] font-medium"
        : "text-[#998869] hover:bg-[#998869]/5 hover:text-[#00423D]"
    }`}
  >
    {label}
  </div>
);

const navSections: NavSectionType[] = [
  {
    title: "OVERVIEW",
    items: [
      { label: "App", icon: <AppIcon />, path: "/admin/app" },
      { label: "Analytics", icon: <AnalyticsIcon />, path: "/admin/analytics" },
      { label: "Booking", icon: <BookingIcon />, path: "/admin/booking" },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      {
        label: "Users",
        icon: <UserIcon />,
        path: "/admin/users",
        hasSubmenu: true,
        subItems: [
          { label: "All Users", path: "/admin/users" },
        ],
      },
      {
        label: "Venues",
        icon: <ProductIcon />,
        path: "/admin/venues",
        hasSubmenu: true,
        subItems: [
          { label: "All Venues", path: "/admin/venues" },
        ],
      },
      {
        label: "Bookings",
        icon: <OrderIcon />,
        path: "/admin/bookings",
        hasSubmenu: true,
        subItems: [
          { label: "All Bookings", path: "/admin/bookings" },
          { label: "Pending", path: "/admin/bookings/pending" },
          { label: "Completed", path: "/admin/bookings/completed" },
        ],
      },
      {
        label: "Invoice",
        icon: <InvoiceIcon />,
        path: "/admin/invoice",
        hasSubmenu: true,
        subItems: [
          { label: "All Invoices", path: "/admin/invoice" },
          { label: "Create New", path: "/admin/invoice/new" },
          { label: "Settings", path: "/admin/invoice/settings" },
        ],
      },
    ],
  },
];

const SideNav: React.FC = () => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [collapsed, setCollapsed] = useState(false);

  const toggleSubmenu = (path: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  return (
    <div
      className={`h-screen bg-white border-r border-[#998869]/20 flex flex-col overflow-y-auto shadow-sm transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header with toggle button */}
      <div className="sticky top-0 bg-white z-10 border-b border-[#998869]/10">
        <div
          className={`px-4 py-5 flex items-center justify-between ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {!collapsed && (
            <div
              className={`${racesport.className} text-xl bg-gradient-to-r from-[#415C41] to-[#00423D] text-transparent bg-clip-text font-bold`}
            >
              GAMETIC!
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-[#998869]/10 transition-colors duration-200"
          >
            <Menu size={20} className="text-[#998869]" />
          </button>
        </div>
      </div>

      {/* Navigation sections */}
      <div className="flex-grow">
        {navSections.map((section) => (
          <div key={section.title} className={collapsed ? "px-2" : ""}>
            {!collapsed && <SectionHeader title={section.title} />}
            {collapsed && <div className="h-px bg-[#998869]/20 mx-2 my-4"></div>}
            <div className={`${collapsed ? "px-0" : "px-2"} space-y-1`}>
              {section.items.map(
                ({ label, icon, path, hasSubmenu, subItems }) => {
                  const isActive = pathname.startsWith(path);
                  const isExpanded = expandedItems[path];

                  return (
                    <div key={label}>
                      {hasSubmenu ? (
                        <>
                          <div
                            onClick={() => !collapsed && toggleSubmenu(path)}
                          >
                            {collapsed ? (
                              <div className="flex justify-center py-3 hover:bg-[#998869]/5 rounded-lg cursor-pointer relative group">
                                <div className="text-[#998869] group-hover:text-[#415C41] transition-colors">
                                  {icon}
                                </div>
                                <div className="absolute left-full ml-3 px-2 py-1 bg-[#00423D] text-white text-xs rounded hidden group-hover:block whitespace-nowrap z-50">
                                  {label}
                                </div>
                              </div>
                            ) : (
                              <NavItem
                                icon={icon}
                                label={label}
                                hasSubmenu={hasSubmenu}
                                isActive={isActive}
                                isExpanded={isExpanded}
                              />
                            )}
                          </div>
                          {!collapsed && isExpanded && subItems && (
                            <div className="ml-2 pl-2 border-l border-[#998869]/20 mt-1 mb-2 space-y-1 animate-fadeIn">
                              {subItems.map((subItem) => (
                                <Link key={subItem.path} href={subItem.path}>
                                  <SubMenuItem
                                    label={subItem.label}
                                    isActive={pathname === subItem.path}
                                  />
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link key={path} href={path}>
                          {collapsed ? (
                            <div className="flex justify-center py-3 hover:bg-[#998869]/5 rounded-lg cursor-pointer relative group">
                              <div
                                className={`${
                                  isActive ? "text-[#415C41]" : "text-[#998869]"
                                } group-hover:text-[#415C41] transition-colors`}
                              >
                                {icon}
                              </div>
                              <div className="absolute left-full ml-3 px-2 py-1 bg-[#00423D] text-white text-xs rounded hidden group-hover:block whitespace-nowrap z-50">
                                {label}
                              </div>
                            </div>
                          ) : (
                            <NavItem
                              icon={icon}
                              label={label}
                              isActive={isActive}
                            />
                          )}
                        </Link>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>

      {/* User profile section at bottom */}
      <div
        className={`mt-auto border-t border-[#998869]/20 p-4 ${
          collapsed ? "py-4 px-2" : ""
        }`}
      >
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#415C41] to-[#00423D] flex items-center justify-center text-white font-medium">
              AG
            </div>
            <div className="flex-grow">
              <div className="text-sm font-medium text-[#00423D]">
                Admin User
              </div>
              <div className="text-xs text-[#998869]">admin@gametic.com</div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#415C41] to-[#00423D] flex items-center justify-center text-white font-medium cursor-pointer">
              AG
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNav;