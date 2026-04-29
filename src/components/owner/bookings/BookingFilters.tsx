"use client";

import { Input } from "@/components/owner/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/owner/ui/select";
import { Calendar as CalendarIcon, Filter, Search } from "lucide-react";
import { DatePicker } from "@/components/owner/ui/date-picker";
import { Card, CardContent } from "@/components/owner/ui/card";
import { format } from "date-fns";
import { Booking, TurfData } from "@/types/turf";

interface BookingFiltersProps {
  searchTerm: string;
  statusFilter: string;
  dateFilter: Date | null;
  turfFilter: string;
//   turfs: any[];
turfs: TurfData[];
  onSearchChange: (value: string) => void;
//   onStatusChange: (value: string) => void;
onStatusChange: (value: Booking["status"] | "all") => void;

  onDateChange: (date: Date | null) => void;
  onTurfChange: (value: string) => void;
}

export const BookingFilters = ({
  searchTerm,
  statusFilter,
  dateFilter,
  turfFilter,
  turfs,
  onSearchChange,
  onStatusChange,
  onDateChange,
  onTurfChange,
}: BookingFiltersProps) => {
  const handleDateChange = (date: Date | null) => {
    onDateChange(date);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bookings..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={onStatusChange}>
            {/* <SelectTrigger className="w-full"> */}
            <SelectTrigger className="w-full bg-white border border-gray-300 shadow-sm rounded-md">

              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Filter */}
                    <div className="relative">
            <DatePicker
              selected={dateFilter || undefined}
              onChange={handleDateChange}
              placeholderText="Filter by date"
              customInput={
                <div className="relative w-full">
                  <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-9 bg-white border-gray-300 cursor-pointer focus:ring-primary focus:ring-2"
                    value={dateFilter ? format(dateFilter, "PPP") : ""}
                    placeholder="Filter by date"
                    readOnly
                  />
                </div>
              }
            />
          </div>


          {/* Turf Filter */}
          <Select value={turfFilter} onValueChange={onTurfChange}>
            {/* <SelectTrigger className="w-full"> */}
            <SelectTrigger className="w-full bg-white border border-gray-300 shadow-sm rounded-md">

              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Filter by turf" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Turfs</SelectItem>
              {turfs.map((turf) => (
                <SelectItem key={turf._id} value={turf._id}>
                  {turf.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};