"use client";
import Image from "next/image";
import { useState } from "react";

const HeroSection = () => {
  const [location, setLocation] = useState("");

  return (
    <div className="w-full flex items-center justify-center min-h-[600px] px-4 md:px-20 md:pt-30">
      <div className="absolute w-full h-full  pointer-events-none">
        <Image
          src={
            "https://images.unsplash.com/photo-1633715151359-6fe04c8a0af5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          fill
          alt="hero"
          className="object-cover"
        />
      </div>
      <div className="absolute w-full h-full bg-black/30"></div>
      <div className="relative flex-1 max-w-4xl mx-auto">
        {/* Subtle background enhancement */}

        <div className="flex flex-col justify-center items-center text-center mb-16 relative">
          <div>
            {/* Enhanced headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-[110px] font-bold tracking-wide mb-5">
              <span className="bg-gradient-to-r from-gray-900 to-[#415C41] bg-clip-text text-transparent">
                Find Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#415C41] to-[#98916D] bg-clip-text text-transparent">
                Game Partner
              </span>
            </h1>

            <p className="text-base md:text-[17px] max-w-full md:max-w-[850px] mb-8 text-gray-700 leading-relaxed mx-auto">
              Connect with athletes in your area for{" "}
              <span className="font-semibold text-[#415C41]">
                football, basketball, tennis
              </span>{" "}
              and more. Join local tournaments, discover amazing venues, and
              build your sports community - all in one place.
            </p>

            {/* Location Selection Input */}
            <div className="mb-8 max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-[#998869]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location (e.g., Tirur, Kerala)"
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#998869]/30 rounded-3xl text-gray-700 placeholder-gray-500 focus:outline-none focus:border-[#415C41] focus:ring-2 focus:ring-[#415C41]/20 transition-all duration-300 text-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
