
"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import localFont from "next/font/local";
import {
  TurfIcon,
  BookingIcon,
  ProfileIcon,
} from "./ui/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Load custom font
const racesport = localFont({
  src: "../../fonts/RaceSport.ttf",
  variable: "--font-RaceSport",
});

// Interfaces
interface NavItemType {
  label: string;
  icon: React.ReactNode;
  path: string;
  hasSubmenu?: boolean;
}

interface NavSectionType {
  title?: string;
  items: NavItemType[];
}

// SectionHeader component
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="px-4 py-2 mt-4 mb-1">
    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
      {title}
    </span>
  </div>
);

// NavItem component
const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  hasSubmenu?: boolean;
  isActive?: boolean;
}> = ({ icon, label, hasSubmenu = false, isActive = false }) => (
  <div
    className={`flex items-center px-4 py-3 rounded-lg cursor-pointer ${
      isActive ? "bg-blue-50" : "hover:bg-gray-100"
    }`}
  >
    <div className="mr-3">{icon}</div>
    <span
      className={`flex-grow font-semibold ${
        isActive ? "text-blue-600 font-medium" : "text-gray-600"
      }`}
    >
      {label}
    </span>
    {hasSubmenu && <ChevronRight size={16} className="text-gray-400" />}
  </div>
);

// Navigation sections with titles
const navSections: NavSectionType[] = [
  {
    title: "Management",
    items: [
      {
        label: "Manage Turfs",
        icon: <TurfIcon />,
        path: "/owner",
        hasSubmenu: true,
      },
    ],
  },
  {
    title: "Bookings",
    items: [
      {
        label: "All Bookings",
        icon: <BookingIcon />,
        path: "/owner/bookings",
        hasSubmenu: true,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        label: "My Profile",
        icon: <ProfileIcon />,
        path: "/owner/profile",
        hasSubmenu: true,
      },
    ],
  },
];

// Sidebar component
const SideBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 w-[300px] h-screen bg-white border-r border-gray-200 flex flex-col overflow-y-auto z-10">
      <div
        className={`${racesport.className} px-4 py-10 flex items-center text-gray-600 text-2xl`}
      >
        GAMETIC
      </div>

      {navSections.map((section, index) => (
        <div key={index}>
          {section.title && <SectionHeader title={section.title} />}
          <div className="px-2 space-y-1">
            {section.items.map(({ label, icon, path, hasSubmenu }) => (
              <Link key={label} href={path}>
                <NavItem
                  icon={icon}
                  label={label}
                  hasSubmenu={hasSubmenu}
                  isActive={pathname.startsWith(path)}
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
