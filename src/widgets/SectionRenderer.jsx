// SectionRenderer.js
import React from 'react';

const SectionRenderer = ({ section }) => {
  switch (section.type) {
    case 'hero':
      return (
        <section className="relative min-h-64 bg-gray-800 rounded-lg overflow-hidden mb-12">
          {section.content.backgroundImage && (
            <img
              src={section.content.backgroundImage}
              alt="Hero background"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
          )}
          <div className="relative z-10 p-8 flex flex-col items-center justify-center min-h-64 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              {section.content.title}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {section.content.subtitle}
            </p>
            {section.content.buttonText && (
              <a
                href={section.content.buttonLink || '#'}
                className="px-6 py-3 bg-green-600 text-white rounded-lg"
              >
                {section.content.buttonText}
              </a>
            )}
          </div>
        </section>
      );

    case 'imageText':
      return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div
            className={`${
              section.content.layout === 'imageRight' ? 'order-2' : 'order-1'
            }`}
          >
            <img
              src={
                section.content.image ||
                'https://via.placeholder.com/400x300.png?text=Image'
              }
              alt=""
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div
            className={`${
              section.content.layout === 'imageRight' ? 'order-1' : 'order-2'
            }`}
          >
            <h3 className="text-3xl font-bold mb-4">{section.content.title}</h3>
            <p className="text-lg text-gray-700">{section.content.text}</p>
          </div>
        </section>
      );

    case 'imageGallery':
      return (
        <section className="mb-12">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${
              section.content.layout === 'masonry'
                ? 'auto-rows-auto'
                : 'auto-rows-fr'
            }`}
          >
            {section.content.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </section>
      );

    case 'textContent':
      return (
        <section className="prose max-w-none mb-12">
          <p>{section.content.content}</p>
        </section>
      );

    case 'twoColumns':
      return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="prose">
            <p>{section.content.leftContent}</p>
          </div>
          <div className="prose">
            <p>{section.content.rightContent}</p>
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default SectionRenderer;
