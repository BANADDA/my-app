import React, { useState } from 'react';

const partners = [
  {
    id: 1,
    name: 'Ministry of Agriculture, Animal Industry and Fisheries',
    logo: 'https://www.apsedec.com/img/maaif.png',
    alt: 'MAAIF Logo'
  },
  {
    id: 2,
    name: 'African Development Bank',
    logo: 'https://www.apsedec.com/img/afdb.png',
    alt: 'AfDB Logo'
  },
  {
    id: 3,
    name: 'Government of Uganda',
    logo: 'https://www.apsedec.com/img/gov.png',
    alt: 'Government of Uganda Logo'
  },
  {
    id: 4,
    name: 'International Institute of Rural Reconstruction',
    logo: 'https://www.apsedec.com/img/iirr.png',
    alt: 'IIRR Logo'
  },
  {
    id: 5,
    name: 'International Fund for Agricultural Development',
    logo: 'https://www.apsedec.com/img/ifad.png',
    alt: 'IFAD Logo'
  }
];

// Double the partners array to create seamless loop
const doubledPartners = [...partners, ...partners];

const PartnersSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 border-y border-gray-100 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Our Partners</h3>
          <p className="text-gray-600">Working together to create sustainable impact</p>
        </div>
        
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className={`flex space-x-16 animate-scroll ${isHovered ? 'pause-animation' : ''}`}
            style={{
              '--tw-animate-duration': '30s',
              '--tw-animate-timing': 'linear',
              '--tw-animate-iteration': 'infinite',
            }}
          >
            {doubledPartners.map((partner) => (
              <div 
                key={`${partner.id}-1`}
                className="flex-none w-56 group relative flex items-center justify-center p-8 bg-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              >
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  className="h-20 w-auto object-contain transition-all duration-300"
                />
                <div className="opacity-0 group-hover:opacity-100 absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap transition-opacity duration-200 z-20 shadow-lg">
                  {partner.name}
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth transition */}
          <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll var(--tw-animate-duration) var(--tw-animate-timing) var(--tw-animate-iteration);
        }

        .pause-animation {
          animation-play-state: paused;
        }

        /* Enhanced hover effect */
        .group:hover {
          z-index: 30;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        /* Smooth animation for size increase */
        .group {
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;