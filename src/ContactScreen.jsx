import emailjs from '@emailjs/browser';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import {
    ArrowRight,
    Building,
    Clock,
    Facebook,
    Instagram,
    Linkedin,
    Loader2,
    Mail,
    MapPin,
    Phone,
    Send,
    Twitter
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// Fix for Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const ContactScreen = ({ onNavigate }) => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  
  const position = [3.2783, 32.8867]; // Kitgum coordinates

  const mapIcon = new L.Icon({
    iconUrl: 'https://www.apsedec.com/img/marker.png', 
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -45]
  });

  const contactInfo = [
    {
      icon: Building,
      title: "Visit Our Office",
      details: [
        "Plot 374, Janani Luwum Street",
        "Kitgum Municipality, Uganda"
      ],
      color: "blue"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "info@apsedec.org",
        "apsedec2006@gmail.com"
      ],
      color: "green"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+256 774 505904",
      ],
      color: "yellow"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        "Monday - Friday: 8:00 AM - 5:00 PM",
        "Saturday: 9:00 AM - 1:00 PM"
      ],
      color: "red"
    }
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      first_name: form.current.first_name.value,
      last_name: form.current.last_name.value,
      from_email: form.current.from_email.value,
      message: form.current.message.value,
      reply_to: form.current.from_email.value,
    };

    emailjs.send('service_7ws7y7w', 'template_ngqw9z8', templateParams, 'xB7sD8gidHosWTIRO')
      .then((result) => {
        setLoading(false);
        toast.success("Message sent successfully! We'll get back to you soon.");
        form.current.reset();
      }, (error) => {
        setLoading(false);
        toast.error("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
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
              
              <button 
                onClick={() => onNavigate('partners')}
                className="text-gray-600 hover:text-green-700"
              >
                Partners
              </button>
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
      <section className="relative h-[50vh] bg-gradient-to-br from-green-900 via-green-800 to-green-900 pt-20">
        <div className="absolute inset-0 bg-[url('https://www.apsedec.com/img/aps.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Let's Connect
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Whether you're interested in partnering with us, have questions about 
              our programs, or want to learn more about our impact, we're here to help. 
              Reach out to us today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative -mt-16 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`p-3 bg-green-50 rounded-lg w-fit mb-4`}>
                    <Icon className="w-6 h-6 text-green-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map & Contact Form */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-green-700" />
              Our Location
            </h2>
            <div className="h-[500px] rounded-xl overflow-hidden">
              <MapContainer 
                center={position} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={mapIcon}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">APSEDEC Office</h3>
                      <p className="text-sm">Plot 25, Janani Luwum Street</p>
                      <p className="text-sm">Kitgum Municipality, Uganda</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Mail className="w-6 h-6 mr-2 text-green-700" />
              Send us a Message
            </h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="from_email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Social Links & CTA */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Connect With Us
            </h2>
            <div className="flex justify-center space-x-6">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-6 h-6 text-white" />
                </a>
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Interested in partnering with us? Let's discuss how we can work together 
              to create sustainable impact in Uganda.
            </p>
            <button
                onClick={() => onNavigate('partners')}
                className="inline-flex items-center px-8 py-4 bg-white text-green-800 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1">
              Learn About Partnerships
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactScreen;