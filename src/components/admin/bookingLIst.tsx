"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllVenues } from "@/redux/actions/admin/venuesAction";

interface BookingListProps {
  statusFilter?: "confirmed" | "cancelled" | "";
}

const BookingList: React.FC<BookingListProps> = ({
  statusFilter = "",
}) => {
  const dispatch = useAppDispatch();
  const { venues } = useAppSelector((state) => state.adminVenues);

  useEffect(() => {
    dispatch(fetchAllVenues({ page: 1, limit: 100, search: "" }));
  }, [dispatch]);

  // 🔥 Flatten all bookings from venues
  const allBookings = useMemo(() => {
    if (!venues || venues.length === 0) return [];

    let bookings = venues.flatMap((venue: any) =>
      venue.bookings?.map((booking: any) => ({
        ...booking,
        venueName: venue.name,
      })) || []
    );

    // ✅ Apply filter if provided
    if (statusFilter) {
      bookings = bookings.filter(
        (b: any) => b.status === statusFilter
      );
    }

    return bookings;
  }, [venues, statusFilter]);

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr className="text-left text-sm text-gray-500">
            <th className="p-4">Venue</th>
            <th className="p-4">Date</th>
            <th className="p-4">Time</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Status</th>
            <th className="p-4">Payment</th>
          </tr>
        </thead>

        <tbody>
          {allBookings.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-8 text-gray-500">
                No bookings found
              </td>
            </tr>
          ) : (
            allBookings.map((booking: any) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{booking.venueName}</td>
                <td className="p-4">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="p-4">
                  {booking.startTime} - {booking.endTime}
                </td>
                <td className="p-4">₹{booking.amount}</td>
                <td className="p-4 capitalize">
                  {booking.status}
                </td>
                <td className="p-4 capitalize">
                  {booking.paymentStatus}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;