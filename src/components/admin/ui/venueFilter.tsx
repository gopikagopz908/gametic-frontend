

"use client";
import { useState, useEffect } from "react";
import { Search, X, ChevronDown, MapPin } from "lucide-react";

interface VenueFilterProps {
  onSearch: (search: string) => void;
  getLocation: (location: string) => void;
  getType: (type: string) => void;
}

const VenueFilter: React.FC<VenueFilterProps> = ({ onSearch, getLocation, getType }) => {
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState<boolean>(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState<boolean>(false);
  
  const locations = [
    { label: "Downtown", value: "downtown" },
    { label: "Uptown", value: "uptown" },
    { label: "Midtown", value: "midtown" },
    { label: "West End", value: "west_end" },
    { label: "East Side", value: "east_side" },
    { label: "North Area", value: "north_area" },
    { label: "South Area", value: "south_area" },
  ];

  // Add effect to handle clicking outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const locationDropdown = document.querySelector('.location-dropdown');
      const typeDropdown = document.querySelector('.type-dropdown');
      
      if (locationDropdown && !locationDropdown.contains(target) && 
          typeDropdown && !typeDropdown.contains(target)) {
        setIsLocationDropdownOpen(false);
        setIsTypeDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const types = [
    { label: "Football", value: "football" },
    { label: "Cricket", value: "cricket" },
    { label: "Swimming", value: "swimming" },
    { label: "Basketball", value: "basketball" },
    { label: "Badminton", value: "badminton" },
    { label: "Tennis", value: "tennis" },
    { label: "Volleyball", value: "volleyball" },
    { label: "Hockey", value: "hockey" },
    { label: "Other", value: "other" },
  ];

  return (
    <div className="p-6 border-b border-gray-200 flex flex-wrap items-center gap-4">
      {/* Location Filter */}
      <div className="relative w-48 location-dropdown">
        <div className="relative w-full bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-9 pr-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none rounded-lg"
            placeholder="Filter by Location"
            value={locationInput}
            onChange={(e) => {
              setLocationInput(e.target.value);
              setIsLocationDropdownOpen(true);
            }}
            onClick={() => {
              setIsLocationDropdownOpen(true);
              setIsTypeDropdownOpen(false);
            }}
          />
          {filterLocation && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <X
                size={16}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => {
                  setFilterLocation("");
                  setLocationInput("");
                  getLocation("");
                }}
              />
            </div>
          )}
        </div>

        {isLocationDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
            {locations
              .filter(loc => 
                loc.label.toLowerCase().includes(locationInput.toLowerCase()) || 
                locationInput === ""
              )
              .map((location) => (
                <div
                  key={location.value}
                  className="text-gray-700 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 text-sm"
                  onClick={() => {
                    setFilterLocation(location.label);
                    setLocationInput(location.label);
                    getLocation(location.value);
                    setIsLocationDropdownOpen(false);
                  }}
                >
                  {location.label}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Type Filter */}
      <div className="relative w-48 type-dropdown">
        <button
          onClick={() => {
            setIsTypeDropdownOpen(!isTypeDropdownOpen);
            setIsLocationDropdownOpen(false);
          }}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <div className="flex items-center justify-between">
            <span>{filterType || "Filter by Type"}</span>
            {filterType ? (
              <X
                size={16}
                className="text-gray-500 hover:text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setFilterType("");
                  getType("");
                }}
              />
            ) : (
              <ChevronDown size={16} className="text-gray-500" />
            )}
          </div>
        </button>

        {isTypeDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
            {types.map((type) => (
              <div
                key={type.value}
                className="text-gray-700 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 text-sm"
                onClick={() => {
                  setFilterType(type.label);
                  getType(type.value);
                  setIsTypeDropdownOpen(false);
                }}
              >
                {type.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search venues by name, type or anything..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default VenueFilter;