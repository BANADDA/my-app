import {
    ArrowRight,
    Building,
    ExternalLink,
    Globe,
    Handshake,
    Users
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

const partners = [
  {
    id: 1,
    name: 'Ministry of Agriculture, Animal Industry and Fisheries',
    logo: 'https://www.apsedec.com/img/maaif.png',
    category: 'Government',
    description: 'Implementing agricultural development programs and policies.',
    website: '#'
  },
  {
    id: 2,
    name: 'African Development Bank',
    logo: 'https://www.apsedec.com/img/afdb.png',
    category: 'International',
    description: 'Supporting financial inclusion and development initiatives.',
    website: '#'
  },
  {
    id: 3,
    name: 'Government of Uganda',
    logo: 'https://www.apsedec.com/img/gov.png',
    category: 'Government',
    description: 'Collaborating on national development programs.',
    website: '#'
  },
  {
    id: 4,
    name: 'International Institute of Rural Reconstruction',
    logo: 'https://www.apsedec.com/img/iirr.png',
    category: 'International',
    description: 'Partnering on rural development initiatives.',
    website: '#'
  },
  {
    id: 5,
    name: 'International Fund for Agricultural Development',
    logo: 'https://www.apsedec.com/img/ifad.png',
    category: 'International',
    description: 'Supporting agricultural and rural development.',
    website: '#'
  }
];

const categories = [
  {
    id: 'all',
    name: 'All Partners',
    icon: Handshake
  },
  {
    id: 'government',
    name: 'Government',
    icon: Building
  },
  {
    id: 'international',
    name: 'International',
    icon: Globe
  },
  {
    id: 'civil-society',
    name: 'Civil Society',
    icon: Users
  }
];

const PartnersScreen = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPartners, setFilteredPartners] = useState(partners);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPartners(partners);
    } else {
      setFilteredPartners(partners.filter(partner => 
        partner.category.toLowerCase() === selectedCategory
      ));
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <button 
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-green-800"
            >
              APSEDEC
            </button>

            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => onNavigate('about')}
                className="text-gray-600 hover:text-green-700"
              >
                About
              </button>
              <button 
                onClick={() => onNavigate('initiatives')}
                className="text-gray-600 hover:text-green-700"
              >
                Initiatives
              </button>
              <button 
                onClick={() => onNavigate('impact')}
                className="text-gray-600 hover:text-green-700"
              >
                Impact
              </button>
              <span className="text-green-800 font-medium">Partners</span>
              <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-700">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20">
        <div className="relative h-[30vh] bg-gradient-to-r from-green-900 to-green-800 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-[url('https://www.apsedec.com/img/aps.png')] bg-cover bg-center opacity-30" />
          <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl">
              Our Trusted Partners
            </h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              In fulfilling our mission, APSEDEC partners with local, national and 
              international organisations to provide subsidised and sustainable services 
              to vulnerable communities in the region.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center px-6 py-3 rounded-lg transition-all
                    ${selectedCategory === category.id 
                      ? 'bg-green-800 text-white shadow-lg' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
                  `}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Logo Container */}
                <div className="h-48 flex items-center justify-center p-8 bg-white border-b">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {partner.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {partner.description}
                  </p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-700 hover:text-green-800 font-medium group"
                  >
                    Visit Website
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-green-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Become Our Partner
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join us in our mission to create sustainable development and empower 
            communities across the Acholi Sub-region.
          </p>
          <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center px-8 py-4 bg-white text-green-800 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            Contact Us About Partnership
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default PartnersScreen;