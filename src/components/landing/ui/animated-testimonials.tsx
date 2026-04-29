"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ChevronLeft = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15,18 9,12 15,6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
);



type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  },[testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay && !isHovered) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext, isHovered]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div
      className="relative w-full min-h-screen py-20 px-20 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background elements */}

      <div className="max-w-7xl">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-16">
          What our <br />
          players says?
        </h1>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative h-96 w-full max-w-md">
              {/* Decorative background */}
              <div
                className="absolute inset-0 rounded-3xl opacity-20 blur-3xl"
                style={{ backgroundColor: "#998869" }}
              />

              <AnimatePresence mode="wait">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.src}-${index}`}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.6,
                      scale: isActive(index) ? 1 : 0.85,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index)
                        ? 40
                        : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -20, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <div className="relative h-full w-full">
                      {/* Glowing border effect */}
                      <div
                        className="absolute inset-0 rounded-3xl opacity-40 blur-sm"
                        style={{
                          background: `linear-gradient(45deg, #998869, #415C41, #98916D)`,
                          padding: "3px",
                        }}
                      />
                      <Image
                        src={testimonial.src}
                        alt={testimonial.name}
                        fill
                        className="relative rounded-3xl object-cover object-center shadow-2xl"
                        draggable={false}
                      />
                      {/* Overlay gradient */}
                      <div
                        className="absolute inset-0 rounded-3xl opacity-20"
                        style={{
                          background: `linear-gradient(45deg, 
                            rgba(153, 136, 105, 0.3), 
                            rgba(65, 92, 65, 0.3))`,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative pt-10">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <motion.blockquote
                className="text-2xl lg:text-3xl text-black leading-relaxed mb-8 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                      delay: 0.03 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.blockquote>

              {/* Author info */}
              <motion.div
                className="flex flex-col space-y-2 items-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-[#698866]">
                  {testimonials[active].name}
                </h3>
                <p className="text-lg font-medium" style={{ color: "#98916D" }}>
                  {testimonials[active].designation}
                </p>
              </motion.div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              className="flex items-center gap-4 mt-12 justify-endq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={handlePrev}
                className="group relative p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <ChevronLeft />
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundColor: "#998869" }}
                />
              </button>

              <button
                onClick={handleNext}
                className="group relative p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <ChevronRight />
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundColor: "#998869" }}
                />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
