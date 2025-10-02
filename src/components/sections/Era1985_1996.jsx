import roses from '../../assets/images/roses.jpg';
import { useWhiteBgObserver } from '../../hooks/useWhiteBgObserver';

export default function Era1985_1996({ onSectionClick }) {
  const firstWhiteRef = useWhiteBgObserver();
  const secondWhiteRef = useWhiteBgObserver();

  return (
    <div className="flex flex-col w-full" onClick={() => onSectionClick('1985-1996')}>

      {/* Hero / Intro Section */}
      <section className="w-full bg-[#008cd6] flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[80vh] md:min-h-screen py-12 px-4">
        <div className="w-full max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl font-lora leading-relaxed">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 font-playfair">
            Part II, 1985–1996
          </h3>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl italic font-lora">
            “Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, distinctio vero!”
          </h2>
        </div>
      </section>

      {/* Body Text */}
      <section ref={firstWhiteRef} className="w-full bg-white flex flex-col justify-center min-h-[60vh] sm:min-h-[70vh] md:min-h-screen py-12 sm:py-16 px-6 sm:px-8 md:px-16 lg:px-32 xl:px-64">
        <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-lora text-black leading-relaxed">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
        </div>
      </section>

      {/* Dual Image Section */}
      <section className="w-full bg-black flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh] md:min-h-screen py-12 px-4">
        <div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-6 items-center text-center">
          <img src={roses} alt="roses" className="w-32 sm:w-48 md:w-60 lg:w-72 h-auto" />
          <img src={roses} alt="roses" className="w-32 sm:w-48 md:w-60 lg:w-72 h-auto" />
        </div>
        <p className="text-white italic text-base sm:text-lg md:text-xl lg:text-2xl mt-6 sm:mt-8 font-serif max-w-3xl text-center">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.
        </p>
      </section>

      {/* Repeated Image Sections */}
      {[1, 2, 3].map((i) => (
        <section
          key={i}
          className="w-full bg-black flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh] md:min-h-screen py-12 px-4"
        >
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
            <img src={roses} alt="roses" className="w-32 sm:w-48 md:w-60 lg:w-72 h-auto" />
            <p className="text-white italic text-base sm:text-lg md:text-xl lg:text-2xl mt-6 sm:mt-8 font-serif max-w-3xl">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.
            </p>
          </div>
        </section>
      ))}

      {/* Closing Text Block */}
      <section ref={secondWhiteRef} className="w-full bg-white py-12 sm:py-16 px-6 sm:px-8 md:px-16 lg:px-32 xl:px-64">
        <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl font-lora text-black leading-relaxed">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
        </div>
      </section>

    </div>
  );
}
