import React from 'react';
import roses from '../../assets/images/roses.jpg';
import { useWhiteBgObserver } from '../../hooks/useWhiteBgObserver';

export default function IntroSection({ onSectionClick }) {
  const whiteSectionRef = useWhiteBgObserver(); // ✅ use the hook

  return (
    <div className="flex flex-col w-full" onClick={() => onSectionClick('intro')}>

      {/* Main Intro Content */}
      <section
        ref={whiteSectionRef}
        className="w-full flex flex-col justify-center min-h-screen bg-white"
        data-color="#000000" // ✅ white bg + black text
      >
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40">
          <div className="w-full">
            {/* Headings */}
            <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl italic font-bold font-playfair text-[#008cd6]">
              Introduction
            </h2>
            <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl italic font-bold font-playfair text-[#008cd6] mb-4">
              by Lorem ipsum dolor.
            </h2>

            {/* Paragraphs */}
            <div className="space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl font-lora text-black leading-relaxed mb-8">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...</p>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...</p>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...</p>
              <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Edited / Published Notice */}
      <section className="w-full bg-[#008cd6] flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-3xl mx-auto px-4 py-12 text-center space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl font-lora leading-relaxed text-white">
          <p className="italic">Edited by Lorem, ipsum</p>
          <p>Published by the Lorem, ipsum Archive</p>
          <p>Contents have been edited and excerpted for clarity and privacy.</p>
          <p className="italic">✂ indicates that several sentences or paragraphs have been removed from the original.</p>
        </div>
      </section>

      {/* Image Section with Black Background */}
      <section className="w-full bg-black flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-center text-center">
          <img src={roses} alt="roses" className="w-48 sm:w-60 md:w-72 h-auto max-w-full" />
          <p className="text-white italic text-base sm:text-lg md:text-xl lg:text-2xl mt-6 md:mt-8 font-serif max-w-full">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.
          </p>
        </div>
      </section>

    </div>
  );
}
