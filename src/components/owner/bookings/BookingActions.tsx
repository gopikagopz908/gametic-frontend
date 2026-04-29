"use client";

import { Button } from "@/components/owner/ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/owner/ui/dropdown-menu";
import { CheckCircle2, ChevronDown, ChevronUp, MoreVertical, XCircle } from "lucide-react";
import { Booking } from "@/types/turf";

interface BookingActionsProps {
  booking: Booking;
  expanded: boolean;
  onStatusChange: (status: Booking['status']) => void;
  onToggleExpand: (e: React.MouseEvent) => void;
}

export const BookingActions = ({
  booking,
  expanded,
  onStatusChange,
  onToggleExpand,
}: BookingActionsProps) => (
  <div className="flex items-center space-x-2">
    {expanded ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    )}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" onClick={onToggleExpand}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white shadow-md border border-gray-200 rounded-md z-50">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange("confirmed");
          }}
          disabled={booking.status === "confirmed"}
        >
          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
          Confirm
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange("cancelled");
          }}
          disabled={booking.status === "cancelled"}
        >
          <XCircle className="h-4 w-4 mr-2 text-red-500" />
          Cancel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);