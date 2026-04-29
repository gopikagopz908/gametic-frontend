"use client";

import React, { useEffect, useState, useRef } from "react";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import VenueCard from "@/components/user/venue/venueCard";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllVenues } from "@/redux/actions/user/venueAction";

export type Turf = {
  _id: string;
  name: string;
  city: string;
  area: string;
  turfType: string;
  size: string;
  hourlyRate: number;
  images: string[];
  bookedSlot: {
    date: string;
    slots: { start: string; end: string }[];
  }[];
  availability: {
    days: string[];
    startTime: string;
    endTime: string;
    timeSlots: string[] | false;
  };
};

const categories = ["football", "cricket", "tennis", "basketball"];

const TurfList = () => {
  const dispatch = useAppDispatch();
  const { venues, loading } = useAppSelector((state) => state.userVeune);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchAllVenues({ page: 1, limit: 12, search: searchTerm }));
  }, [dispatch, searchTerm]);

  const debouncedSearch = useRef(
    debounce((val: string) => {
      setSearchTerm(val);
    }, 500)
  ).current;

  useEffect(() => {
    debouncedSearch(searchInput);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput, debouncedSearch]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="max-w-8xl mx-auto pt-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-5 p-6 bg-white">
        <select
          className="border border-[#00423d] text-[#00423d] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00423d]/50"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Sports</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="capitalize">
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search turfs by name..."
          value={searchInput}
          onChange={handleSearchChange}
          className="border border-[#00423d] text-[#00423d] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00423d]/50 flex-grow max-w-xs"
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-xl text-[#00524a] font-semibold">
          Loading turfs...
        </div>
      ) : venues.length === 0 ? (
        <p className="text-center text-[#7a7455] col-span-full italic">
          No turfs found matching your criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {venues.map((turf) => (
            <div
              key={turf._id}
              onClick={() => router.push(`facilities/${turf._id}/viewdetails/`)}
            >
              <VenueCard turf={turf} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TurfList;