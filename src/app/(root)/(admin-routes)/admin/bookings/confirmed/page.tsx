"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllVenues } from "@/redux/actions/admin/venuesAction";
import BookingList from "@/components/admin/bookingLIst";

const ConfirmedBookingsPage = () => {
  const dispatch = useAppDispatch();
  const { venues } = useAppSelector((state) => state.adminVenues);

  useEffect(() => {
    dispatch(fetchAllVenues({ page: 1, limit: 100, search: "" }));
  }, [dispatch]);

  const totalConfirmed = useMemo(() => {
    if (!venues) return 0;

    return venues.flatMap((v: any) => v.bookings || [])
      .filter((b: any) => b.status === "confirmed").length;
  }, [venues]);

  return (
    <div className="min-h-screen bg-white">
      <div className="ml-60 pt-20 px-8">

        <h1 className="text-2xl font-semibold text-[#00423D] mb-6">
          Confirmed Bookings
        </h1>

       <div className="inline-block bg-white rounded-md shadow-sm border mb-6  px-4 py-2">
          <p className="text-sm text-gray-500">Total Confirmed</p>
          <h3 className="text-2xl font-semibold mt-1">
            {totalConfirmed}
          </h3>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <BookingList statusFilter="confirmed" />
        </div>

      </div>
    </div>
  );
};

export default ConfirmedBookingsPage;