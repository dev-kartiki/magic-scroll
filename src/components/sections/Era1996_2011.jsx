import roses from '../../assets/images/roses.jpg';
import { useWhiteBgObserver } from '../../hooks/useWhiteBgObserver';

export default function Era1996_2011({ onSectionClick }) {
  const firstWhiteRef = useWhiteBgObserver();
  const secondWhiteRef = useWhiteBgObserver();

  return (
    <div className="flex flex-col w-full" onClick={() => onSectionClick('1996-2011')}>

      {/* Hero / Intro Section */}
      <section className="w-full bg-[#008cd6] text-white flex flex-col items-center justify-center min-h-[100vh] py-12 px-4">
        <div className="w-full max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4 font-playfair">
            Part III, 1996–2011
          </h3>
          <h2 className="text-2xl sm:text-3xl md:text-4xl italic font-lora leading-snug">
            “Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo mollitia ut consequuntur iusto.”
          </h2>
        </div>
      </section>

      {/* Body Text */}
      <section className="w-full flex flex-col justify-center min-h-[70vh] sm:min-h-[80vh] md:min-h-screen py-12 sm:py-16 px-6 sm:px-10 md:px-16 lg:px-32 xl:px-64">
        <div ref={firstWhiteRef} className="w-full bg-white max-w-5xl mx-auto space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl font-lora text-black leading-relaxed">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.</p>
          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
        </div>
      </section>

      {/* Image Block with Caption */}
      <section className="w-full bg-black flex flex-col items-center justify-center min-h-[70vh] py-12 px-4">
        <div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 items-center text-center">
          <img src={roses} alt="roses" className="w-40 sm:w-56 md:w-64 lg:w-72 h-auto rounded-lg object-cover" />
          <img src={roses} alt="roses" className="w-40 sm:w-56 md:w-64 lg:w-72 h-auto rounded-lg object-cover" />
        </div>
        <p className="text-white italic text-base sm:text-lg md:text-xl lg:text-2xl mt-8 font-serif text-center px-4 sm:px-8">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.
        </p>
      </section>

      {/* Repeated Image Sections */}
      {[1, 2, 3].map((i) => (
        <section
          key={i}
          className="w-full bg-black flex flex-col items-center justify-center min-h-[70vh] py-12 px-4"
        >
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
            <img src={roses} alt="roses" className="w-40 sm:w-56 md:w-64 lg:w-72 h-auto rounded-lg object-cover" />
            <p className="text-white italic text-base sm:text-lg md:text-xl lg:text-2xl mt-8 font-serif text-center px-4">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.
            </p>
          </div>
        </section>
      ))}

      {/* Closing Body Text */}
      <section ref={secondWhiteRef} className="w-full bg-white flex flex-col justify-center min-h-[70vh] sm:min-h-[80vh] md:min-h-screen py-12 sm:py-16 px-6 sm:px-10 md:px-16 lg:px-32 xl:px-64">
        <div className="w-full max-w-5xl mx-auto space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl font-lora text-black leading-relaxed">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.</p>
          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
        </div>
      </section>

    </div>
  );
}
