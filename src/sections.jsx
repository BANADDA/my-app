// ApsedecWebsite.js

import { collection, getDocs } from 'firebase/firestore';
import {
  ArrowUpRight,
  Building,
  ChartArea,
  Check,
  HandHeart,
  Mail,
  Menu,
  Phone,
  Target,
  Users,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AboutScreen from './AboutScreen';
import PageBuilder from './builder/PageBuilder';
import ContactScreen from './ContactScreen';
import DynamicPage from './DynamicPage'; // Component to render dynamic pages
import { db } from './firebase-config'; // Adjust the path as needed
import ImpactScreen from './ImpactScreen';
import InitiativesScreen from './InitiativesScreen';
import PartnersScreen from './partners';
import PartnersSection from './PartnersSection';

const ApsedecWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  // Fetch pages from Firestore
  useEffect(() => {
    const fetchPages = async () => {
      const pagesCollection = collection(db, 'pages');
      const pagesSnapshot = await getDocs(pagesCollection);
      const pagesList = pagesSnapshot.docs.map((doc) => doc.data());
      setPages(pagesList);
    };

    fetchPages();
  }, []);

  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  
    // Ensure the path starts with '/'
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
    navigate(normalizedPath);
  };  

  const impactStats = [
    {
      number: '26+',
      label: 'Member Organizations',
      icon: <Building className="w-6 h-6" />,
    },
    {
      number: '23+',
      label: 'Years of Impact',
      icon: <ChartArea className="w-6 h-6" />,
    },
    {
      number: '1000+',
      label: 'Projects Completed',
      icon: <Target className="w-6 h-6" />,
    },
    {
      number: '50k+',
      label: 'Lives Impacted',
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const initiatives = [
    {
      title: 'Financial Inclusion',
      description:
        'Expanding access to financial services and opportunities in rural communities',
      image: 'https://www.apsedec.com/img/5.png',
      category: 'Development',
    },
    {
      title: 'Agricultural Innovation',
      description:
        'Modernizing farming practices and improving agricultural productivity',
      image:
        'https://firebasestorage.googleapis.com/v0/b/apsedec-blogs.appspot.com/o/blogs%2FFJE7xuwZ7TVkpy1ovmvEGJRL1412%2F1723617936518_galleryImage_0?alt=media&token=1d03f5a0-e8e8-47b9-8ba6-460510876676',
      category: 'Agriculture',
    },
    {
      title: 'Youth Empowerment',
      description:
        'Creating opportunities through skills development and training programs',
      image: 'https://www.apsedec.com/img/6.png',
      category: 'Education',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full bg-green-50/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center px-6 py-4">
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-3"
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-indigo-900">
                APSEDEC
              </span>
            </button>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleNavigation('/about')}
                className="text-gray-700 hover:text-green-800 font-medium"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation('/initiatives')}
                className="text-gray-700 hover:text-green-800 font-medium"
              >
                Initiatives
              </button>

              <button
                onClick={() => handleNavigation('/impact')}
                className="text-gray-700 hover:text-green-800 font-medium"
              >
                Impact
              </button>

              <button
                onClick={() => handleNavigation('/partners')}
                className="text-gray-700 hover:text-green-800 font-medium"
              >
                Partners
              </button>

              {/* Dynamically add page links */}
              {pages.map((page) => (
                <button
                  key={page.slug}
                  onClick={() => handleNavigation(`/${page.slug}`)}
                  className="text-gray-700 hover:text-green-800 font-medium capitalize"
                >
                  {page.title}
                </button>
              ))}

<button
  onClick={() => handleNavigation('/admin')}
  className="text-gray-700 hover:text-green-800 font-medium"
>
  Admin
</button>

              <button
                onClick={() => handleNavigation('/contact')}
                className="px-5 py-2.5 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-900 focus:ring-4 focus:ring-green-200"
              >
                Contact Us
              </button>
            </div>

            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold text-green-800">APSEDEC</span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            <nav className="space-y-6">
              <button
                onClick={() => handleNavigation('/about')}
                className="block text-lg font-medium text-gray-900 hover:text-green-800 w-full text-left"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation('/initiatives')}
                className="block text-lg font-medium text-gray-900 hover:text-green-800 w-full text-left"
              >
                Initiatives
              </button>
              <button
                onClick={() => handleNavigation('/impact')}
                className="block text-lg font-medium text-gray-900 hover:text-green-800 w-full text-left"
              >
                Impact
              </button>
              <button
                onClick={() => handleNavigation('/partners')}
                className="block text-lg font-medium text-gray-900 hover:text-green-800 w-full text-left"
              >
                Partners
              </button>
              {/* Dynamically add page links */}
              {pages.map((page) => (
                <button
                  key={page.slug}
                  onClick={() => handleNavigation(`/${page.slug}`)}
                  className="block text-lg font-medium text-gray-900 hover:text-green-800 w-full text-left capitalize"
                >
                  {page.title}
                </button>
              ))}
              <button
                onClick={() => handleNavigation('/contact')}
                className="w-full px-6 py-3 mt-4 text-white bg-green-800 rounded-lg hover:bg-green-900 transition"
              >
                Contact Us
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Routes */}
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              {/* Hero Section */}
              <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="inline-block px-4 py-2 bg-green-50 rounded-full text-green-800 text-sm font-medium mb-6">
                        Empowering Communities Since 1999
                      </div>
                      <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        Sustainable Development Through
                        <span className="block text-green-800"> Private Sector Growth</span>
                      </h1>
                      <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        APSEDEC is dedicated to fostering business excellence and supporting sustainable development
                        across the Acholi Sub-region and beyond.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => handleNavigation('/initiatives')}
                          className="px-8 py-4 bg-green-800 text-white rounded-lg hover:bg-green-900 transition flex items-center justify-center space-x-2"
                        >
                          <span>Our Programs</span>
                          <ArrowUpRight size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden">
                        <img
                          src="https://www.apsedec.com/img/aps.png"
                          alt="Community Development"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <Target className="w-8 h-8 text-green-800" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Projects Completed</div>
                            <div className="text-2xl font-bold text-gray-900">1000+</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Partners Section */}
              <PartnersSection />

              {/* CEO Message Section */}
              <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                      <div className="mb-8">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                          Message from Our CEO
                        </h2>
                        <div className="space-y-4 text-gray-600 text-lg">
                          <p>
                            &quot;As the Chief Executive Officer of APSEDEC, I am pleased to share our
                            ongoing commitment to poverty reduction and sustainable development in Uganda.&quot;
                          </p>
                          <p>
                            &quot;Our efforts focus on financial inclusion, youth empowerment, and
                            agricultural development, fostering resilience and community cohesion.&quot;
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://www.apsedec.com/img/ceo.png"
                          alt="Nelson Tasenga"
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <div className="font-bold text-gray-900">Nelson Tasenga</div>
                          <div className="text-gray-500">Chief Executive Officer</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {impactStats.map((stat, index) => (
                        <div key={index} className="p-6 bg-white rounded-xl border border-gray-100 hover:border-green-100 transition">
                          <div className="p-3 bg-green-50 rounded-lg inline-block mb-4">
                            {stat.icon}
                          </div>
                          <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                          <div className="text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Initiatives Section */}
              <section id="initiatives" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      Our Key Initiatives
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Driving sustainable development through targeted programs and partnerships
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {initiatives.map((initiative, index) => (
                      <div key={index} className="group p-5 rounded-lg">
                        <div className="relative overflow-hidden rounded-xl mb-6">
                          <img
                            src={initiative.image}
                            alt={initiative.title}
                            className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                              {initiative.category}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-800 transition">
                          {initiative.title}
                        </h3>
                        <p className="text-gray-600">
                          {initiative.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Impact Section */}
              <section id="impact" className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                        Creating Lasting Impact Across Uganda
                      </h2>
                      <p className="text-xl text-gray-600 mb-8">
                        Our comprehensive approach focuses on sustainable development,
                        combining financial inclusion, agricultural innovation, and
                        community empowerment.
                      </p>
                      <div className="space-y-6">
                        {[
                          'Supporting local businesses and entrepreneurs',
                          'Improving agricultural productivity and practices',
                          'Providing access to financial services',
                          'Empowering youth through skills development'
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="p-1 bg-green-50 rounded-full">
                              <Check className="w-5 h-5 text-green-800" />
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="grid grid-cols-2 gap-4">
                        <img src="/image/goats.png" alt="Impact 1" className="rounded-xl" />
                        <img src="/image/goats2.png" alt="Impact 2" className="rounded-xl mt-8" />
                      </div>
                      <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <HandHeart className="w-8 h-8 text-green-800" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Communities Served</div>
                            <div className="text-2xl font-bold text-gray-900">50,000+</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <section className="py-20 bg-green-900 text-white">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                      Partner With Us in Creating Sustainable Change
                    </h2>
                    <p className="text-xl text-green-100 mb-8">
                      Join our mission to empower communities and drive sustainable development
                      across the Acholi Sub-region
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button className="px-8 py-4 bg-white text-green-900 rounded-lg hover:bg-gray-100 transition">
                        Become a Partner
                      </button>
                      <button
                        onClick={() => handleNavigation('/contact')}
                        className="px-8 py-4 border border-white/30 rounded-lg hover:bg-white/10 transition">
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          }
        />
        {/* Home Route */}
        <Route
          path="/home"
          element={<ApsedecWebsite pages={pages} onNavigate={handleNavigation} />}
        />
        <Route
          path="/admin"
          element={<PageBuilder pages={pages} onNavigate={handleNavigation} />}
        />

        {/* About Route */}
        <Route
          path="/about"
          element={<AboutScreen onNavigate={handleNavigation} pages={pages} />}
        />

        {/* Initiatives Route */}
        <Route
          path="/initiatives"
          element={<InitiativesScreen onNavigate={handleNavigation} pages={pages} />}
        />

        {/* Impact Route */}
        <Route
          path="/impact"
          element={<ImpactScreen onNavigate={handleNavigation} pages={pages} />}
        />

        {/* Partners Route */}
        <Route
          path="/partners"
          element={<PartnersScreen onNavigate={handleNavigation} pages={pages} />}
        />

        {/* Contact Route */}
        <Route
          path="/contact"
          element={<ContactScreen onNavigate={handleNavigation} pages={pages} />}
        />

        {/* Dynamic Pages */}
        {pages.map((page) => (
          <Route
            key={page.slug}
            path={`/${page.slug}`}
            element={
              <DynamicPage
                page={page}
                onNavigate={handleNavigation}
                pages={pages}
              />
            }
          />
        ))}
      </Routes>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="text-2xl font-bold mb-6">APSEDEC</div>
              <p className="text-gray-400 mb-6">
                Empowering local communities through sustainable private sector
                development since 1999.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'linkedin', 'facebook'].map((social) => (
                  <a key={social} href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                    <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => handleNavigation('/about')}
                    className="text-gray-400 hover:text-white transition"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-white transition">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#impact" className="text-gray-400 hover:text-white transition">
                    Impact Stories
                  </a>
                </li>
                <li>
                  <a href="#partners" className="text-gray-400 hover:text-white transition">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Programs</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Financial Inclusion
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Agricultural Development
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Youth Empowerment
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Community Projects
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 text-gray-400">
                  <Building className="w-5 h-5" />
                  <span>Acholi Region, Uganda</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:info@apsedec.org" className="hover:text-white transition">
                    info@apsedec.org
                  </a>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Phone className="w-5 h-5" />
                  <a href="tel:+256123456789" className="hover:text-white transition">
                    +256 123 456 789
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="text-gray-400 text-sm">
                © 2024 APSEDEC. All rights reserved.
              </div>
              <div className="flex space-x-6 md:justify-end">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApsedecWebsite;
