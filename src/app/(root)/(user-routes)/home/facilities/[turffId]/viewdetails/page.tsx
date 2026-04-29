"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoFootball } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { IoIosResize } from "react-icons/io";
import { IoTimeSharp } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchVenueById } from "@/redux/actions/user/venueAction";
import BookingModal from "@/components/user/venue/bookingModal";

interface VenueHighlight {
  id: number;
  text: string;
}


function Page() {
  const params = useParams();
  const turfId = params?.turffId as string;
  const dispatch = useAppDispatch();
  const { venue, loading } = useAppSelector((state) => state.userVeune);

  const [mainImage, setMainImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    dispatch(fetchVenueById({ turfId }));
  }, [turfId, dispatch]);

  const highlights: VenueHighlight[] = [
    {
      id: 1,
      text: "Professional quality turf with optimal playing conditions",
    },
    { id: 2, text: "Complete sports equipment and changing rooms" },
    { id: 3, text: "Floodlights for evening matches and training" },
    { id: 4, text: "Secure parking facility for all visitors" },
    { id: 5, text: "On-site refreshment counter and seating area" },
    { id: 6, text: "First aid facility and safety equipment available" },
    { id: 7, text: "Professional maintenance and regular cleaning" },
    { id: 8, text: "Easy booking system with flexible time slots" },
    { id: 9, text: "Strategic location with excellent connectivity" },
    { id: 10, text: "Suitable for tournaments and competitive matches" },
  ];

  if (loading)
    return <div className="p-10 text-center text-xl">Loading...</div>;
  if (!venue)
    return <div className="p-10 text-center text-red-600">Turf not found</div>;

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4 pt-20 mb-20">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{ color: "#00423D" }}
                >
                  {venue.name}
                </h1>
                <div
                  className="flex flex-wrap items-center gap-4 text-sm"
                  style={{ color: "#415C41" }}
                >
                  <div className="flex items-center gap-2">
                    <FaLocationDot className="text-green-700" />
                    <span>
                      {venue.city}, {venue.area}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoFootball className="text-green-700" />
                    <span>{venue.turfType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoIosResize className="text-green-700" />
                    <span>{venue.size}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className="flex items-center gap-2 text-2xl font-bold"
                  style={{ color: "#00423D" }}
                >
                  <FaRupeeSign />
                  <span>₹{venue.hourlyRate}</span>
                </div>
                <p className="text-sm" style={{ color: "#415C41" }}>
                  per hour
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Image Gallery */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#00423D" }}
                >
                  Venue Gallery
                </h2>
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={mainImage || venue.images[0]}
                      alt="Turf Main"
                      height={400}
                      width={800}
                      className="w-full h-[300px] sm:h-[400px] object-cover"
                    />
                  </div>
                  <div className="flex gap-3 overflow-x-auto">
                    {venue.images.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={`thumb-${idx}`}
                        onClick={() => setMainImage(img)}
                        width={112}
                        height={80}
                        className={`h-20 w-28 object-cover rounded-lg cursor-pointer border-2 transition-all duration-300 flex-shrink-0 ${
                          mainImage === img || (!mainImage && idx === 0)
                            ? "border-green-700"
                            : "border-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Venue Overview */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#00423D" }}
                >
                  Venue Overview
                </h2>
                <p className="leading-relaxed" style={{ color: "#415C41" }}>
                  Experience premium sports facilities at {venue.name}, located
                  in the heart of {venue.city}. Our {venue.turfType} offers the
                  perfect playing surface for competitive matches and training
                  sessions. With professional-grade equipment and excellent
                  maintenance standards, this venue provides an ideal
                  environment for athletes of all skill levels to showcase their
                  talents and enjoy the game.
                </p>
              </div>

              {/* Venue Features */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: "#00423D" }}
                >
                  Venue Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {highlights.map((highlight) => (
                    <div key={highlight.id} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: "#00423D" }}
                      ></div>
                      <span className="text-sm" style={{ color: "#415C41" }}>
                        {highlight.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Availability & Booking */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: "#00423D" }}
                >
                  Availability
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <IoTimeSharp className="text-green-700 text-lg" />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#00423D" }}
                      >
                        Operating Hours
                      </p>
                      <p className="text-xs" style={{ color: "#415C41" }}>
                        {venue.availability.startTime} -{" "}
                        {venue.availability.endTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CiCalendarDate className="text-green-700 text-lg" />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#00423D" }}
                      >
                        Available Days
                      </p>
                      <p className="text-xs" style={{ color: "#415C41" }}>
                        {venue.availability.days.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                {venue.availability.timeSlots && (
                  <div className="mt-6">
                    <h4
                      className="text-sm font-medium mb-3"
                      style={{ color: "#00423D" }}
                    >
                      Available Time Slots
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {venue.availability.timeSlots.map((slot, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded text-xs font-medium text-center"
                          style={{
                            backgroundColor: "#E5F3FD",
                            color: "#00423D",
                          }}
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  className="w-full mt-6 py-3 text-white font-semibold rounded-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: "#00423D" }}
                  onClick={() => setIsOpen(true)}
                >
                  Book Now
                </button>
              </div>

              {/* Venue Details Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: "#00423D" }}
                >
                  Venue Details
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#415C41" }}>Type:</span>
                    <span style={{ color: "#00423D" }}>{venue.turfType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#415C41" }}>Size:</span>
                    <span style={{ color: "#00423D" }}>{venue.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#415C41" }}>Location:</span>
                    <span style={{ color: "#00423D" }}>{venue.area}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#415C41" }}>Rate:</span>
                    <span style={{ color: "#00423D" }}>
                      ₹{venue.hourlyRate}/hr
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BookingModal isOpen={isOpen} onClose={handleOpen} venue={venue} />
      </div>
    </>
  );
}

export default Page;
