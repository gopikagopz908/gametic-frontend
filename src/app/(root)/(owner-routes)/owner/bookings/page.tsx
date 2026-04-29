"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTurfs } from "@/redux/actions/turfActions";
import { format, parseISO } from "date-fns";
import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/owner/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/owner/ui/table";
import { BookingFilters } from "@/components/owner/bookings/BookingFilters";
import { BookingRow } from "@/components/owner/bookings/BookingRow";
import { Booking } from "@/types/turf";
import { updateBookingStatus } from "@/redux/actions/bookingActions";

const BookingsPage = () => {
  const dispatch = useAppDispatch();
  const { turfs, loading } = useAppSelector((state) => state.turf);
  // const { userInfo } = useAppSelector((state) => state.auth);
  const user = useAppSelector(state => state.auth.user);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Booking['status'] | "all">("all");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [turfFilter, setTurfFilter] = useState<string>("all");
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  // useEffect(() => {
  //   if (user?.id) {
  //     dispatch(fetchTurfs(user.id));
  //   }
  // }, [dispatch, user]);


    useEffect(() => {
    const loadTurfs = async () => {
      try {
        if (user?.id) {
          await dispatch(fetchTurfs({ ownerId: user.id }));
        }
      } catch (error) {
        console.error("Failed to fetch turfs:", error);//toast 
      }
    };
    loadTurfs();
  }, [dispatch, user?.id]);
  
  
  // Extract all bookings from all turfs
  const allBookings = turfs.flatMap((turf) => 
    turf.bookings?.map(booking => ({
      ...booking,
      turfName: turf.name,
      turfId: turf._id
    })) || []
  );

  // Filter bookings based on search and filters
  const filteredBookings = allBookings.filter((booking) => {
    const matchesSearch =
  (booking.userId?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false) ||
  booking.turfName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  (booking.userId?.phone?.includes(searchTerm) ?? false);

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesDate = !dateFilter || 
      format(parseISO(booking.date.toString()), "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd");
    const matchesTurf = turfFilter === "all" || booking.turfId === turfFilter;
    
    return matchesSearch && matchesStatus && matchesDate && matchesTurf;
  });

  // Sort bookings by date (newest first)
  const sortedBookings = [...filteredBookings].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

 const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
  try {
    await dispatch(updateBookingStatus({ bookingId, status: newStatus }));
    if (user?.id) {
      console.log(user.id,"user?.id......")
      dispatch(fetchTurfs({ ownerId: user.id }));
    }
    console.log(`Updating booking ${bookingId} to status ${newStatus}`);
  } catch (error) {
    console.error("Failed to update booking status:", error);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
     <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and track all your turf bookings in one place
            </p>
          </div>
          <div className="bg-primary/10 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-primary">
              {sortedBookings.length} {sortedBookings.length === 1 ? "booking" : "bookings"} found
            </span>
          </div>
        </div>


        <BookingFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          dateFilter={dateFilter}
          turfFilter={turfFilter}
          turfs={turfs}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          onDateChange={setDateFilter}
          onTurfChange={setTurfFilter}
        />

        <Card className="border shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg font-semibold text-gray-800">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {sortedBookings.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto flex flex-col items-center justify-center">
                  <svg
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="min-w-full divide-y divide-gray-200">
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Turf
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </TableHead>
                      <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white divide-y divide-gray-200">
                    {sortedBookings.map((booking) => (
                      <BookingRow
                        key={booking._id}
                        booking={booking}
                        expanded={expandedBooking === booking._id}
                        onToggleExpand={() => 
                          setExpandedBooking(expandedBooking === booking._id ? null : booking._id)
                        }
                        onStatusChange={(status) => handleStatusChange(booking._id, status)}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default BookingsPage;

