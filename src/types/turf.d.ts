import { Availability } from './turf.d';
export interface Booking {
  _id: string;
  // userId: User;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone?: string; 
  };
  turfId: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod?: 'cash' | 'card' | 'online';
  amount: number;
  notes?: string;
  createdAt: Date;
}
export interface Rating {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  rating: number;
  review?: string;
  createdAt: Date;
}


export interface TurfData {
  _id: string;
  ownerId?: string;
  name: string;
  city: string;
  area: string;
  location: string;
  address: string;
  coordinates?: {    // For map integration
    lat: number;
    lng: number;
  };
  turfType: string;
  size: string;
  images: string[];
  amenities?: string[]; 
  hourlyRate: number;
  status: 'active' | 'inactive' | 'maintenance'; 
  bookings?: Booking[];
  ratings?: Rating[];
  averageRating?: number;
  description?:string;
  bookings: Booking[];
 
  rules?: string[];
  cancellationPolicy?: string;

  availability:Availability
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TurfFormValues {
  name: string;
  city: string;
  area: string;
  location: string;
  address: string;
  turfType: string;
  size: string;
  hourlyRate: number;
  images: FileList;
}

export type Availability = {
  days: string[];
  startTime: string;
  endTime: string;
  timeSlots?: string[];
  unavailableSlots?: string[];

  // unavailableSlots?: {
  //   date: Date;
  //   slots: string[];
  // }[];

  isAvailable?: boolean;

  // exceptions?: {    // For special days/holidays
  //   date: Date;
  //   available: boolean;
  //   slots?: string[];
  // }[];

};


// export interface TurfFormInputs extends TurfFormValues {
//   ownerId: string;
//   amenities?: string[];
//   description?: string;
//   rules?: string[];
//   cancellationPolicy?: string;
//   availability: Availability;
//   _id?: string;
//   images: File[] | string[] | null;
// }
export type TurfFormInputs = {
  ownerId: string;
  name: string;
  city: string;
  area: string;
  location: string;
  address: string;

  // address: {
  //   city: string;
  //   area: string;
  //   street?: string;
  //   landmark?: string;
  //   postalCode?: string;
  // };
  // coordinates?: {
  //   lat: number;
  //   lng: number;
  // };

  turfType: string;
  size: string;
  hourlyRate: number;
  images: File[] | string[] | null;
// images: (File | string)[];

   amenities?: string[];
   description?: string;
   rules?: string[];
  cancellationPolicy?: string;
  availability: Availability;
  _id?: string;
};

export interface AddTurfFormProps {
  onClose: () => void;
  turfToEdit?: TurfFormInputs;
}

export type TimeSlot = {
  start: string;
  end: string;
  available: boolean;
  price?: number;
};

export type DayAvailability = {
  [day: string]: TimeSlot[];
};
// export type DayAvailability = {
//   [day: string]: {
//     available: boolean;
//     slots: TimeSlot[];
//   };
// };

export type BookingSearchParams = {
  date?: Date;
  turfId?: string;
  status?: Booking['status'];
  paymentStatus?: Booking['paymentStatus'];
  userId?: string;
};

export type TurfSearchParams = {
  city?: string;
  area?: string;
  turfType?: string;
  date?: Date;
  timeSlot?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
};