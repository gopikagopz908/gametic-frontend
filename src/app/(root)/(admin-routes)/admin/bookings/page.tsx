"use client";

import { useEffect, useMemo} from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllBookings } from "@/redux/actions/bookingActions";
import BookingList from "@/components/admin/bookingLIst";
import { fetchAllVenues } from "@/redux/actions/admin/venuesAction";

const Page = () => {
  const dispatch = useAppDispatch();
 const { venues } = useAppSelector((state) => state.adminVenues);

  useEffect(() => {
    dispatch(fetchAllVenues({ page: 1, limit: 100, search: "" }));
  }, [dispatch]);

  // 🔥 Flatten all bookings from venues
type Booking = {
  status: string;
[key: string]: unknown;};

type VenueWithBookings = {
  name: string;
  ownerId: string;
  bookings?: Booking[];
};

const allBookings = useMemo(() => {
  if (!venues || venues.length === 0) return [];

  return (venues as VenueWithBookings[]).flatMap((venue) =>
    (venue.bookings ?? []).map((booking) => ({
      ...booking,
      venueName: venue.name,
      ownerId: venue.ownerId,
    }))
  );
}, [venues]);

  // 📊 Stats
  const totalBookings = allBookings.length;
  const totalConfirmed = allBookings.filter(
    (b) => b.status === "confirmed"
  ).length;
  const totalCancelled = allBookings.filter(
    (b) => b.status === "cancelled"
  ).length;

 
  useEffect(() => {
    // ✅ If your action doesn't accept params, use this:
    dispatch(fetchAllBookings());

    // ❗ If it DOES accept params, use this instead:
    // dispatch(fetchAllBookings({ search: searchTerm, status }));

  }, [dispatch]);

  // Stats
 

  return (
    <div className="min-h-screen bg-white">
      <div className="ml-60 pt-20 px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#00423D]">
            Booking Management
          </h1>
          <div className="flex items-center text-sm text-[#998869] mt-1">
            <span>Dashboard</span>
            <svg
              className="h-4 w-4 mx-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-[#415C41] font-medium">Bookings</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-[#998869]/20">
            <p className="text-sm text-[#998869]">Total Bookings</p>
            <h3 className="text-2xl font-semibold text-[#00423D] mt-1">
              {totalBookings}
            </h3>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-[#998869]/20">
            <p className="text-sm text-[#998869]">Confirmed</p>
            <h3 className="text-2xl font-semibold text-[#00423D] mt-1">
              {totalConfirmed}
            </h3>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-[#998869]/20">
            <p className="text-sm text-[#998869]">Cancelled</p>
            <h3 className="text-2xl font-semibold text-[#00423D] mt-1">
              {totalCancelled}
            </h3>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm border border-[#998869]/20">
          <div className="flex border-b border-[#998869]/20">
            <button className="px-6 py-4 text-sm font-medium text-[#415C41] border-b-2 border-[#415C41]">
              All Bookings
              <span className="ml-2 px-2 py-0.5 text-xs bg-[#998869]/10 text-[#00423D] rounded-full">
                {totalBookings}
              </span>
            </button>
          </div>

          {/* Booking Table */}
          <BookingList  />
        </div>
      </div>
    </div>
  );
};

export default Page;