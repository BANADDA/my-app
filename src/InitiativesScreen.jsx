import { collection, onSnapshot, query } from 'firebase/firestore';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Loader2,
  Menu,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';

const InitiativesScreen = ({ onNavigate, pages }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState({});

  useEffect(() => {
    const q = query(collection(db, "blogs"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const blogsArray = [];
      querySnapshot.forEach((doc) => {
        blogsArray.push({ id: doc.id, ...doc.data() });
      });
      setBlogs(blogsArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
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
              onClick={() => setSelectedBlog(null)}
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
              onClick={() => onNavigate('partners')}
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
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-900 focus:ring-4 focus:ring-green-200">
              Contact Us
            </button>
          </div>

          <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );

  // Blog Detail View
  const BlogDetailView = ({ blog }) => (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button 
          onClick={() => setSelectedBlog(null)}
          className="flex items-center text-green-800 hover:text-green-900 mb-8 group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Initiatives
        </button>

        {/* Title & Date */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        <div className="flex items-center space-x-4 text-gray-500 mb-8">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            {formatDate(blog.createdAt)}
          </div>
        </div>

        {/* Main Image */}
        {blog.captionImageUrl && (
          <div className="relative h-[60vh] rounded-2xl overflow-hidden mb-8">
            <img 
              src={blog.captionImageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Caption */}
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          {blog.caption}
        </p>

        {/* Project Details */}
        {blog.projectDetails && blog.projectDetails.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
            <div className="space-y-6">
              {blog.projectDetails.map((detail, index) => (
                <p key={index} className="text-gray-600 leading-relaxed">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {blog.galleryImages && blog.galleryImages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blog.galleryImages.map((image, index) => (
                image && (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img 
                        src={image}
                        alt={blog.galleryCaptions?.[index] || `Gallery image ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {blog.galleryCaptions?.[index] && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 rounded-xl">
                        <p className="text-white text-sm">
                          {blog.galleryCaptions[index]}
                        </p>
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Initiatives List View
  const InitiativesListView = () => (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-r from-green-900 to-green-800 pt-20">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Initiatives
          </h1>
          <p className="text-xl text-green-50 max-w-2xl">
            Discover our impactful projects and programs aimed at sustainable development 
            and community empowerment across Uganda.
          </p>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <div 
                  key={blog.id} 
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image Carousel */}
                  <div className="relative h-[300px] bg-gray-100">
                    {blog.galleryImages && blog.galleryImages.filter(Boolean).length > 0 ? (
                      <>
                        <img 
                          src={blog.galleryImages.filter(Boolean)[activeImageIndex[blog.id] || 0]}
                          alt={blog.galleryCaptions?.[activeImageIndex[blog.id]] || blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {blog.galleryImages.filter(Boolean).length > 1 && (
                          <div className="absolute bottom-4 right-4 flex space-x-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveImageIndex(prev => ({
                                  ...prev,
                                  [blog.id]: prev[blog.id] === 0 ? 
                                    blog.galleryImages.filter(Boolean).length - 1 : 
                                    (prev[blog.id] || 0) - 1
                                }));
                              }}
                              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveImageIndex(prev => ({
                                  ...prev,
                                  [blog.id]: !prev[blog.id] || 
                                    prev[blog.id] === blog.galleryImages.filter(Boolean).length - 1 ? 
                                    0 : prev[blog.id] + 1
                                }));
                              }}
                              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </>
                    ) : blog.captionImageUrl ? (
                      <img 
                        src={blog.captionImageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {blog.caption}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-4">
                        {blog.galleryImages?.filter(Boolean).slice(0, 3).map((img, index) => (
                          <div 
                            key={index}
                            className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                          >
                            <img 
                              src={img} 
                              alt={`Gallery ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {blog.galleryImages?.filter(Boolean).length > 3 && (
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium">
                            +{blog.galleryImages.filter(Boolean).length - 3}
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => setSelectedBlog(blog)}
                        className="flex items-center text-green-600 hover:text-green-700 font-medium group"
                      >
                        <span>Read More</span>
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {selectedBlog ? (
        <BlogDetailView blog={selectedBlog} />
      ) : (
        <InitiativesListView />
      )}
    </div>
  );
};

export default InitiativesScreen;