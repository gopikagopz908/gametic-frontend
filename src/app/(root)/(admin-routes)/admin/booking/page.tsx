"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllBookings, updateBookingStatus } from "@/redux/actions/bookingActions";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/owner/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/owner/ui/table";

const AdminBookingsPage = () => {
  const dispatch = useAppDispatch();
  const { bookings, loading } = useAppSelector(
    (state) => state.adminBookings
  );

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const handleStatusChange = async (
    bookingId: string,
    status: string
  ) => {
    await dispatch(updateBookingStatus({ bookingId, status }));
    dispatch(fetchAllBookings());
  };

  const sortedBookings = [...bookings].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>All Platform Bookings</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Turf</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedBookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <td className="px-4 py-3">
                      {booking.userId?.username}
                    </td>

                    <td className="px-4 py-3">
                      {booking.ownerId?.username}
                    </td>

                    <td className="px-4 py-3">
                      {booking.turfId?.name}
                    </td>

                    <td className="px-4 py-3">
                      {new Date(
                        booking.date
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3">
                      {booking.startTime} - {booking.endTime}
                    </td>

                    <td className="px-4 py-3">
                      ₹{booking.amount}
                    </td>

                    <td className="px-4 py-3">
                      {booking.status}
                    </td>

                    <td className="px-4 py-3">
                      {booking.paymentStatus}
                    </td>

                    <td className="px-4 py-3">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusChange(
                            booking._id,
                            e.target.value
                          )
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="pending">
                          Pending
                        </option>
                        <option value="confirmed">
                          Confirmed
                        </option>
                        <option value="cancelled">
                          Cancelled
                        </option>
                        <option value="completed">
                          Completed
                        </option>
                      </select>
                    </td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBookingsPage;