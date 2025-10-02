import logo from '../../assets/react.svg';
import marigold from '../../assets/images/marigold.jpg';
import plant from '../../assets/images/plant.jpg';
import roses from '../../assets/images/roses.jpg';
import tulips from '../../assets/images/tulips.jpg';

export default function CreditsSection({ onSectionClick }) {
  const credits = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    "Cras ornare tristique elit. Vivamus vestibulum nulla nec ante.",
    "Fusce pellentesque suscipit nibh. Integer vitae libero ac risus egestas placerat.",
    "Vestibulum commodo felis quis tortor. Ut aliquam sollicitudin leo.",
    "Donec quis dui at dolor tempor interdum. Vivamus molestie gravida turpis.",
    "Nam convallis pellentesque nisl. Integer malesuada commodo nulla.",
    "Sed vel lacus. Mauris nibh felis, adipiscing varius, lacinia vel, tellus.",
    "Suspendisse ac urna. Etiam pellentesque mauris ut lectus.",
    "Ut ultricies imperdiet sodales. Aliquam fringilla aliquam ex sit amet elementum.",
    "Nulla facilisi. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.",
    "Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.",
    "Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.",
  ];

  const imageSets = [
    [roses, tulips, plant],
    [marigold, plant, tulips],
    [roses, plant, tulips],
  ];

  const captions = [
    <>Courtesy Lorem<br />Ipsum</>,
    <>Photo by John<br />Doe courtesy of<br />ABC, 1976</>,
    <>Photo by John<br />Doe courtesy of<br />ABC, 1976</>,
  ];

  return (
    <div
      className="min-h-screen bg-[#646464] flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-12 py-12 space-y-16"
      onClick={() => onSectionClick('credits')}
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <a href="/" className="flex items-center justify-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </a>
        <p className="text-xs sm:text-sm italic">
          Copyright © 2023 Lorem ipsum Archive. <br />
          All rights reserved.
        </p>
      </div>

      {/* Produced by / Design / Dev */}
      <div className="max-w-2xl text-center space-y-3 text-sm sm:text-base">
        <p><span className="font-semibold">Produced by:</span> Lorem ipsum Archive</p>
        <p><span className="font-semibold">Design:</span> LoveFrom</p>
        <p><span className="font-semibold">Development:</span> Masterful</p>
        <p>
          <span className="font-semibold">Special Thanks:</span> Lorem ipsum dolor sit amet,
          and the entire Lorem ipsum dolor team
        </p>
      </div>

      {/* Credits List */}
      <div className="max-w-3xl space-y-2 text-xs sm:text-sm md:text-base text-center leading-relaxed px-2">
        {credits.map((line, idx) => (
          <p key={idx} className="italic">{line}</p>
        ))}
      </div>

      {/* Image Grids */}
      <div className="w-full max-w-6xl space-y-12">
        {imageSets.map((set, rowIdx) => (
          <div
            key={rowIdx}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-black p-6"
          >
            {set.map((img, i) => (
              <div key={i} className="flex flex-col items-center space-y-3">
                <div className="bg-white p-2 shadow-lg w-32 sm:w-36 md:w-40 lg:w-48 h-32 sm:h-36 md:h-40 lg:h-48 overflow-hidden"  data-color="#000000">
                  <img
                    src={img}
                    alt={`Credit image ${rowIdx * 3 + i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs sm:text-sm italic text-center">{captions[i]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center space-y-3 text-xs sm:text-sm">
        <img src={logo} alt="Archive Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
        <p className="italic text-center">
          Copyright © 2023 Lorem ipsum Archive. <br />
          All rights reserved.
        </p>
      </div>
    </div>
  );
}
