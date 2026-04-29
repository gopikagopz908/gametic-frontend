"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/utils/utils";
import { Button } from "./Button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerProps {
  className?: string;
  selected?: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  placeholderText?: string;
  customInput?: React.ReactNode;
  inline?: boolean; 
   initialFocus?: boolean;
}


export function DatePicker({
  className,
  selected,
  onChange,
  placeholder = "Pick a date",
  customInput,
   inline = false,
   initialFocus = true,
  ...props
}: DatePickerProps) {
    if (inline) {
    return (
      <Calendar
        mode="single"
        selected={selected || undefined}
        onSelect={(date: Date | undefined) => onChange(date || null)}
        className={cn("rounded-md border", className)}
        {...props}
      />
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {customInput ? (
          customInput
        ) : (
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selected && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? format(selected, "PPP") : <span>{placeholder}</span>}
          </Button>
        )}
      </PopoverTrigger>
      {/* <PopoverContent className="w-auto p-0" align="start"> */}
      <PopoverContent className="w-auto p-0 bg-white shadow-md border border-gray-200 rounded-md z-50" align="start">

        <Calendar
          mode="single"
          selected={selected || undefined}
          onSelect={(date: Date | undefined) => onChange(date || null)}
          // initialFocus
            initialFocus={initialFocus}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
