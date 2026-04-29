import Image from "next/image";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

// CategoryCard Component
const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  subtitle,
  imageUrl,
}) => {
  return (
    <div className="group w-[220px] h-[280px] cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 flex-shrink-0">
      {/* Main card container with gradient background */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden transition-shadow duration-300">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className=" object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00423D]/90 via-[#415C41]/40 to-transparent"></div>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#98916D]/20 to-[#00423D]/20 group-hover:from-[#98916D]/30 group-hover:to-[#00423D]/30 transition-all duration-300"></div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          {/* Top section with category label */}
          <div className="flex justify-end">
            
          </div>

          {/* Bottom section with title and details */}
          <div className="space-y-3">
            {/* Main title */}
            <h3 className="text-white text-2xl font-bold tracking-tight group-hover:text-[#98916D] transition-colors duration-300">
              {title}
            </h3>

            {/* Subtitle */}
            <p className="text-white/80 text-sm leading-relaxed">{subtitle}</p>

            {/* Action indicator */}
            <div className="flex items-center space-x-2 text-white/70 group-hover:text-[#98916D] transition-colors duration-300">
              <span className="text-xs font-medium">Explore</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
    

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </div>
    </div>
  );
};
export default CategoryCard;
