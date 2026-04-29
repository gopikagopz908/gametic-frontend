"use client";

import { Badge } from "@/components/owner/ui/badge";
import { Booking } from "@/types/turf";

interface BookingStatusBadgeProps {
  status: Booking['status'];
}

export const BookingStatusBadge = ({ status }: BookingStatusBadgeProps) => {
  switch (status) {
    case "confirmed":
      return <Badge variant="success">Confirmed</Badge>;
    case "pending":
      return <Badge variant="warning">Pending</Badge>;
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    case "completed":
      return <Badge variant="default">Completed</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};