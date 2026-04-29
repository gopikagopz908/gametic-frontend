'use client';
import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

interface TurfImagesSliderProps {
  images: string[];
}

const TurfImagesSlider: React.FC<TurfImagesSliderProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    loop: true,
    mode: 'free-snap',
    slides: { perView: 1 },
  });

  return (
    <div className="lg:w-1/2">
      <div className="relative group">
        <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden shadow-lg">
          {images.length > 0 ? (
            images.map((img, idx) => (
              <div key={idx} className="keen-slider__slide">
                {/* <img
                  src={img}
                  alt={`Turf Image ${idx + 1}`}
                  className="w-full h-96 sm:h-[500px] object-cover"
                  loading="lazy"
                /> */}
                <Image
                  src={img}
                  alt={`Turf Image ${idx + 1}`}
                  width={800}
                  height={500}
                  className="w-full h-96 sm:h-[500px] object-cover"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />


              </div>
            ))
          ) : (
            <div className="keen-slider__slide bg-gray-200 flex items-center justify-center h-96 sm:h-[500px]">
              <span className="text-gray-500 text-lg">No images available</span>
            </div>
          )}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={() => slider.current?.prev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition opacity-0 group-hover:opacity-100"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => slider.current?.next()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition opacity-0 group-hover:opacity-100"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto py-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => slider.current?.moveToIdx(idx)}
              className={`w-16 h-16 rounded-md overflow-hidden border-2 ${currentSlide === idx ? 'border-blue-500' : 'border-transparent'}`}
            >
              {/* <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              /> */}
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />

            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TurfImagesSlider;