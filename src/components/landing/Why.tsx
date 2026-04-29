import React from 'react';
import { TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function WhyChooseUs() {
  return (
    <div className="w-full max-w-8xl mx-auto px-4 md:px-20 py-16 min-h-screen">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Why choose us?
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          We offer seamless venue booking, easy game joining, and access to
          competitive tournaments — all in one powerful platform built for
          sports enthusiasts.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Book Venues Card */}
        <div className="bg-[#98916D] text-white rounded-3xl p-8 lg:col-span-1 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 leading-tight">
            Book Venues, <br />
            Play Anywhere
          </h2>
          <p className="text-white/90 text-sm leading-relaxed">
            Quickly find and reserve high-quality sports venues that suit your
            schedule and sport. Hassle-free booking tailored for players and
            organizers.
          </p>
        </div>

        {/* Tennis Player Image Card */}
        <div className="bg-[#98916D] rounded-3xl overflow-hidden relative h-64 lg:h-auto shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-[#98916D] to-[#847a5a] flex items-center justify-center">
            <Image
            src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1747648380/photo-1599586120429-48281b6f0ece_oahke7.jpg"
            alt="Sports venue with players"
            fill
            className="object-cover"
          />
          </div>
        </div>

        {/* Create Tournaments Card */}
        <div className="bg-[#00423D] text-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 leading-tight">
            Create Tournaments,
            <br /> Chase Glory
          </h2>
          <p className="text-white/90 text-sm leading-relaxed">
            Build and manage your own tournaments or join existing ones. From
            casual competitions to serious showdowns — it all happens here.
          </p>
        </div>

        {/* Soccer Ball Image Card */}
        <div className="bg-[#00423D] rounded-3xl overflow-hidden relative h-64 lg:h-auto shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00423D] to-[#002e29] flex items-center justify-center">
              {/* Soccer ball pattern */}
              <Image
            src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1747648482/photo-1486286701208-1d58e9338013_dnomkf.jpg"
            alt="Sports competition"
            fill
            className="object-cover"
          />
          </div>
        </div>

        {/* Host Games Card - spans 2 columns */}
        <div className="md:col-span-2 bg-[#415C41] text-white rounded-3xl p-8 flex flex-col lg:flex-row items-center gap-8 shadow-lg">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 leading-tight">
              Host Games, Join the Action
            </h2>
            <p className="text-white/90 text-sm leading-relaxed max-w-xl">
              Take control of your game day by hosting your own matches — set the time, location, and format. Or jump into games organized by others to meet new players, challenge your skills, and stay active in the community. Whether it&apos;s a quick pickup game or a planned showdown, you&apos;re always just a few clicks away from the action.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <TrendingUp size={100} className="text-white/80" />
          </div>
        </div>

      </div>
    </div>
  );
}