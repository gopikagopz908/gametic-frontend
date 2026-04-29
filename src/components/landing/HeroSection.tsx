import Image from "next/image";

const HeroSection = () => {

  return (
    <div className="w-full pr-4 md:pr-20 flex items-center justify-between min-h-[600px] lg:min-h-[700px] xl:min-h-[750px]">
      <div className="relative flex-1">
        {/* Subtle background enhancement */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#00423d]/5 pointer-events-none"></div>

        <div className="pl-4 md:pl-20 flex flex-col justify-center mb-16 relative">
          <div>
            {/* Enhanced headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-[110px] font-bold tracking-wide mb-5">
              <span className="bg-gradient-to-r from-gray-900 to-[#00423d] bg-clip-text text-transparent">
                Blaze to
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#00423d] to-[#98916d] bg-clip-text text-transparent">
                the victory
              </span>
            </h1>

            <p className="text-base md:text-[17px] pl-0 md:pl-3 max-w-full md:max-w-[850px] mb-5 text-gray-700 leading-relaxed">
              This isn&apos;t just a platform — it&apos;s where{" "}
              <span className="font-semibold text-[#00423d]">
                passion meets purpose
              </span>
              . A space built for players who live for the thrill of the game,
              the spirit of teamwork, and the rush of competition - it&apos;s a
              movement, a community, and your home for all things sport.
            </p>

            {/* Enhanced CTA button */}
            <div className="pl-0 md:pl-3">
              <button className="px-6 py-3 bg-gradient-to-r from-[#00423d] to-[#00524a] w-[150px] flex justify-center items-center text-white rounded-3xl font-medium cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00423d]/50 focus:ring-offset-2">
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div className="absolute w-full md:w-[80vw] -bottom-8 md:-bottom-18">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#98916d]/25 via-[#98916d]/20 to-[#98916d]/15 backdrop-blur-sm shadow-lg">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

            <div className="relative px-4 py-4 md:px-6 md:py-5">
              {/* Stats number with animated counter effect */}
              <div className="flex items-baseline gap-2 mb-2 ml-16">
                <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-[#98916d] to-[#7a7455] bg-clip-text text-transparent">
                  300+
                </h1>
                <span className="text-lg md:text-xl font-medium text-[#98916d]/80 italic tracking-wide">
                  Active Users
                </span>
              </div>

              <p className="text-sm md:text-[17px] text-gray-700 md:ml-16">
                Join our vibrant community of over 300+ users who trust us for
                insightful, high-quality sports content
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center pt-16 z-10 flex-shrink-0">
        <div className="h-[500px] lg:h-[600px] w-[350px] lg:w-[450px] overflow-hidden rounded-3xl shadow-2xl relative">
          <Image
            src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1747632813/photo-1628779238951-be2c9f2a59f4_sidiuw.jpg"
            alt="Sports action hero image"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
