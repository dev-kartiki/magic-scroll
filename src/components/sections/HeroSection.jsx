import React from 'react';
import roses from '../../assets/images/roses.jpg';
import { useWhiteBgObserver } from '../../hooks/useWhiteBgObserver';

export default function HeroSection({ onSectionClick }) {
  const firstWhiteRef = useWhiteBgObserver();

  return (
    <div
      className="bg-[#646464] w-full"
      onClick={() => onSectionClick('hero')}
    >
      {/* First Section - Image and Title */}
      <section className="flex flex-col items-center justify-center min-h-screen w-full">
        <div className="mt-2 w-full flex justify-center">
          {/* Polaroid-style Image Container */}
          <div
            ref={firstWhiteRef}
            className="bg-white p-3 pb-12 shadow-2xl max-w-md w-full mx-auto"
          >
            <img
              src={roses}
              alt="Steve Jobs"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="mt-4 max-w-2xl mx-auto text-center px-4 md:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 font-playfair leading-tight">
            Make Something Wonderful
          </h1>
          <h2 className="text-lg sm:text-xl md:text-3xl italic font-lora text-black">
            Lorem ipsum dolor sit amet.
          </h2>
        </div>
      </section>

      {/* Second Section - Quote */}
      <section className="flex flex-col justify-center min-h-screen w-full px-4 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-white text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>

          <p
            className="text-white text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero...
          </p>

          <p
            className="text-white text-sm sm:text-base md:text-xl lg:text-2xl mt-10"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            —Lorem, 2000
          </p>
        </div>
      </section>
    </div>
  );
}
