import roses from '../../assets/images/roses.jpg';
import { useWhiteBgObserver } from '../../hooks/useWhiteBgObserver';

export default function Era1976_1985({ onSectionClick }) {
  const firstWhiteRef = useWhiteBgObserver();

  return (
    <div className="flex flex-col w-full" onClick={() => onSectionClick('1976-1985')}>

      {/* Header Block */}
      <section className="w-full bg-[#008cd6] flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[80vh] md:min-h-screen py-12 px-4">
        <div className="w-full max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 text-base sm:text-lg md:text-2xl lg:text-3xl font-lora leading-relaxed">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 font-playfair">
            Part I, 1976–1985
          </h3>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl italic font-lora">
            “Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam sequi repudiandae reprehenderit!”
          </h2>
        </div>
      </section>

      {/* Text Section */}
      <section ref={firstWhiteRef} className="w-full flex flex-col bg-white justify-center min-h-screen py-12 sm:py-16 px-6 sm:px-8 md:px-16 lg:px-32 xl:px-64">
        <div className="w-full max-w-5xl mx-auto">
          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-lora text-black leading-relaxed mb-8">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.</p>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
          </div>
        </div>
      </section>

      {/* Image Section with Black Background */}
      <section className="w-full bg-black flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh] md:min-h-screen py-12 px-4">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          <img
            src={roses}
            alt="roses"
            className="w-40 sm:w-56 md:w-72 lg:w-80 h-auto"
          />
          <p className="text-white italic text-base sm:text-lg md:text-xl lg:text-2xl mt-6 sm:mt-8 font-serif">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.
          </p>
        </div>
      </section>

    </div>
  );
}
