import React from "react";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import { Turf } from "@/app/(root)/(user-routes)/home/facilities/page";

interface VenueCardProp {
  turf: Turf;
}

const VenueCard: React.FC<VenueCardProp> = ({ turf }) => {
  return (
    <div className="w-[350px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-1">
      {/* Image Container */}
      <div className="relative rounded-2xl">
        <Image
          src={turf.images[0]}
          alt={turf.name}
          width={200}
          height={200}
          className="w-full h-64 object-cover rounded-lg  "
        />
      </div>

      {/* Content Container */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center text-[#98916d] text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{turf.city},{turf.area}</span>
        </div>

        {/* Rating and Duration */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-medium text-gray-700">
              {5.00} ({100})
            </span>
          </div>
          <span className="text-sm text-gray-500">{turf.availability.startTime}-{turf.availability.endTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4 leading-tight flex justify-between">
          {turf.name}
          <span className="text-sm font-medium">{turf.turfType}</span>
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">From:</span>
          <div className="flex items-baseline mr-5">
            <span className="text-2xl font-bold text-[#98916d]">
              {"₹"}
              {turf.hourlyRate}.00
            </span>
            <span className="text-sm text-gray-500 ml-1">/ Per Hour</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
