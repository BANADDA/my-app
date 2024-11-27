import {
  ArrowLeft,
  ArrowUpRight,
  Building,
  CheckCircle,
  Eye,
  Mail,
  Menu,
  Phone,
  Target,
  Users,
  X
} from 'lucide-react';
import React, { useState } from 'react';

const AboutScreen = ({ onNavigate, pages }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const objectives = [
    'Offer Business Development Services to various enterprises and organizations',
    'Support and promote entrepreneurship among informal and SMEs',
    'Provide microfinance support, including training and technical guidance',
    'Conduct research and development to bolster business objectives',
    'Develop strategic linkages and partnerships for sustainable livelihoods',
    'Promote advanced agricultural post-harvest techniques'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-green-50/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center px-6 py-4">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center space-x-3"
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-indigo-900">
                APSEDEC
              </span>
            </button>

            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => onNavigate('about')}
                className="text-gray-700 hover:text-green-800 font-medium"
              >
                About
              </button>
              <button 
                onClick={() => onNavigate('initiatives')}
                className="text-gray-700 hover:text-green-800 font-medium"
              >
                Initiatives
              </button>
              <button 
                onClick={() => onNavigate('impact')}
                className="text-gray-700 hover:text-green-800 font-medium"
              >
                Impact
              </button>
              <button 
                onClick={() => onNavigate('home')}
                className="text-gray-700 hover:text-green-800 font-medium"
              >
                Partners
              </button>

{/* Dynamically add page links */}
{pages.map((page) => (
  <button
    key={page.slug}
    onClick={() => onNavigate(`/${page.slug}`)}
    className="text-gray-600 hover:text-green-700 capitalize"
  >
    {page.title}
  </button>
))}
              <button className="px-5 py-2.5 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-900 focus:ring-4 focus:ring-green-200">
                Contact Us
              </button>
            </div>

            <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                onClick={() => onNavigate('about')}
                className="block text-lg font-medium text-gray-900 hover:text-green-800 w-full text-left"
              >
                About
              </button>
              <button 
                onClick={() => onNavigate('initiatives')}
                className="block text-lg font-medium text-gray-900 hover:text-green-800 w-full text-left"
              >
                Initiatives
              </button>
              <button 
                onClick={() => onNavigate('impact')}
                className="block text-lg font-medium text-gray-900 hover:text-green-800 w-full text-left"
              >
                Impact
              </button>
              <button 
                onClick={() => onNavigate('partners')}
                className="block text-lg font-medium text-gray-900 hover:text-green-800 w-full text-left"
              >
                Partners
              </button>
              <button className="w-full px-6 py-3 mt-4 text-white bg-green-800 rounded-lg hover:bg-green-900 transition">
                Contact Us
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <section className="relative h-[50vh] overflow-hidden bg-gradient-to-r from-green-900 to-green-800">
        <div className="absolute inset-0 bg-black/50" />
        <div
  className="absolute inset-0 bg-[url('/image/5.png')] bg-cover bg-center mix-blend-overlay"
/>
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center text-white hover:text-green-300 transition-colors mb-8 group"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-2 transition-transform" />
            Back to Home
          </button>
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              About APSEDEC
            </h1>
            <p className="text-xl text-green-50">
              In fulfilling our mission, APSEDEC partners with local, national and international 
              organisations to provide subsidised and sustainable services to vulnerable communities.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-xl mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                At APSEDEC, Our mission is to empower individuals and communities towards sustainable 
                livelihoods by providing tailored capacity building programs in entrepreneurship, 
                business development, and micro-finance. We conduct research to inform our interventions, 
                advocate for policy changes that support economic opportunity, and foster strong 
                alliances to maximize our collective impact.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-xl mb-6">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                We envision becoming a globally recognized center of Business Excellence, fostering 
                a culture of innovation and collaboration to empower businesses of all sizes. Through 
                this, we&apos;ll drive sustainable growth and development for the private sector, creating 
                a ripple effect of economic prosperity and social well-being, while establishing 
                ourselves as a leader in ethical and sustainable business practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Objectives</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-50 rounded-lg flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-gray-700">{objective}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Team</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                The APSEDEC team operates within a meticulously defined organizational structure, 
                ensuring each member&apos;s role optimally utilizes their unique skills and expertise. 
                From strategic leaders guiding direction to operational staff executing grassroots 
                initiatives, every individual contributes to a cohesive environment fostering 
                growth and development.
              </p>
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Central to APSEDEC&apos;s organizational principles is a dedication to inclusivity 
                  and sustainability. Regular engagement and feedback mechanisms cultivate a 
                  culture of openness and mutual respect, facilitating the exchange of ideas 
                  and informed decision-making.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 group"
                >
                  <span>Learn more about our team</span>
                  <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <img 
                src="https://www.apsedec.com/img/structure.png"
                alt="APSEDEC Organization Structure"
                className="w-full rounded-xl"
              />
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-sm font-medium">Organizational Structure</div>
                </div>
                <button className="text-green-600 hover:text-green-700 group">
                  <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Partner with APSEDEC to create sustainable impact and empower communities 
              across the Acholi Sub-region.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-green-900 px-8 py-4 rounded-lg hover:bg-green-50 transition-colors">
              Get Involved
            </button>
          </div>
        </div>
      </section>

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
                    onClick={() => onNavigate('about')}
                    className="text-gray-400 hover:text-white transition"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('home')}
                    className="text-gray-400 hover:text-white transition"
                  >
                    Our Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('home')}
                    className="text-gray-400 hover:text-white transition"
                  >
                    Impact Stories
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('home')}
                    className="text-gray-400 hover:text-white transition"
                  >
                    Partners
                  </button>
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

export default AboutScreen;