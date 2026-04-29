"use client";

import { Badge } from "@/components/owner/ui/badge";
import { Booking } from "@/types/turf";

interface BookingPaymentBadgeProps {
  status: Booking['paymentStatus'];
}

export const BookingPaymentBadge = ({ status }: BookingPaymentBadgeProps) => {
  switch (status) {
    case "paid":
      return <Badge variant="success">Paid</Badge>;
    case "pending":
      return <Badge variant="warning">Pending</Badge>;
    case "refunded":
      return <Badge variant="info">Refunded</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};