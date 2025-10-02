import { useWhiteBgObserver } from "../../hooks/useWhiteBgObserver";

export default function EventsSection({ onSectionClick }) {
  const firstWhiteRef = useWhiteBgObserver();

  const events = [
    {
      date: "January 1975",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      isItalic: true,
    },
    {
      date: "April 1976",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      isItalic: false,
    },
    {
      date: "January 1977",
      text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
      isItalic: false,
    },
    {
      date: "April 1977",
      text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
      isItalic: false,
    },
  ];

  return (
    <section
      className="w-full bg-white py-16 sm:py-20"
      ref={firstWhiteRef}
      data-color="#000000"
      onClick={() => onSectionClick('events')}
    >
      {/* Container for consistent padding */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-blue-500">
            Key Events
          </h2>
        </div>

        {/* Events List */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 text-gray-800"
            >
              {/* Date */}
              <span className="text-sm sm:text-base md:text-lg font-serif italic text-blue-500 shrink-0 w-full sm:w-40 md:w-48">
                {event.date}
              </span>

              {/* Text */}
              <p
                className={`text-sm sm:text-base md:text-lg leading-relaxed flex-1 ${event.isItalic ? 'italic' : ''}`}
              >
                {event.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
