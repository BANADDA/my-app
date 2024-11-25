import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import {
    Camera,
    ChevronLeft,
    ChevronRight,
    Grid,
    Image as ImageIcon,
    Layout,
    Loader2,
    X,
    ZoomIn
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ImpactScreen = ({ onNavigate }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryImages, setCategoryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewStyle, setViewStyle] = useState('grid'); // 'grid' or 'masonry'

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const storage = getStorage();
      const galleryRef = ref(storage, 'gallery/');
      
      try {
        const result = await listAll(galleryRef);
        const fetchedCategories = result.prefixes.map(prefix => ({
          id: prefix.name,
          name: formatCategoryTitle(prefix.name),
          path: prefix.fullPath
        }));
        
        setCategories(fetchedCategories);
        if (fetchedCategories.length > 0) {
          setSelectedCategory(fetchedCategories[0]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  // Fetch images when category changes
  useEffect(() => {
    const fetchImages = async () => {
      if (!selectedCategory) return;
      
      setLoading(true);
      const storage = getStorage();
      const categoryRef = ref(storage, `gallery/${selectedCategory.id}`);
      
      try {
        const result = await listAll(categoryRef);
        const urls = await Promise.all(
          result.items
            .filter(item => item.name.match(/\.(jpg|jpeg|png|gif)$/i))
            .map(async (item) => {
              const url = await getDownloadURL(item);
              return {
                id: item.name,
                url,
                title: formatImageName(item.name),
                type: 'image',
                date: new Date(item.timeCreated).toLocaleDateString()
              };
            })
        );
        setCategoryImages(urls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
      setLoading(false);
    };

    fetchImages();
  }, [selectedCategory]);

  const formatCategoryTitle = (name) => {
    return name
      .replace(/[-_]/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim();
  };

  const formatImageName = (name) => {
    return name
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = categoryImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex === categoryImages.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? categoryImages.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(categoryImages[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  const truncateText = (text, maxLength = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => onNavigate('home')}
              className="text-xl font-bold text-green-800 hover:text-green-700 transition-colors"
            >
              APSEDEC
            </button>

            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => onNavigate('about')}
                className="text-gray-600 hover:text-green-700 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => onNavigate('initiatives')}
                className="text-gray-600 hover:text-green-700 transition-colors"
              >
                Initiatives
              </button>
              <span className="text-green-800 font-medium">Impact</span>
              <button 
                onClick={() => onNavigate('partners')}
                className="text-gray-600 hover:text-green-700 transition-colors"
              >
                Partners
              </button>
              <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="h-[30vh] relative overflow-hidden">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-800" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: 'url(https://www.apsedec.com/img/aps.png)' }}
          />
          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Impact Gallery
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Witness the transformation and positive change we&apos;re bringing to 
              communities across Uganda through our various initiatives and programs.
            </p>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="sticky top-16 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Gallery Categories</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewStyle('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewStyle === 'grid' 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewStyle('masonry')}
                className={`p-2 rounded-lg transition-colors ${
                  viewStyle === 'masonry' 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Layout size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex overflow-x-auto space-x-2 pb-2 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className={`
                  flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-all
                  ${selectedCategory?.id === category.id 
                    ? 'bg-green-800 text-white shadow-md' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
                `}
              >
                <Camera className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">
                  {truncateText(category.name)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          </div>
        ) : categoryImages.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No images found</h3>
            <p className="text-gray-500">This category doesn&apos;t have any images yet.</p>
          </div>
        ) : (
          <div className={viewStyle === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "columns-1 sm:columns-2 lg:columns-3 gap-6"
          }>
            {categoryImages.map((image, index) => (
              <div 
                key={image.id}
                className={`
                  group relative overflow-hidden rounded-xl bg-gray-100
                  ${viewStyle === 'grid' ? 'aspect-square' : 'mb-6'}
                  cursor-pointer hover:shadow-lg transition-shadow
                `}
                onClick={() => {
                  setSelectedImage(image);
                  setCurrentImageIndex(index);
                }}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className={`
                    w-full h-full object-cover
                    ${viewStyle === 'grid' ? 'absolute inset-0' : ''}
                    transition-transform duration-500 group-hover:scale-105
                  `}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium mb-1">{image.title}</p>
                    <button className="text-white/80 text-sm flex items-center">
                      <ZoomIn className="w-4 h-4 mr-1" />
                      View larger
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 py-8 flex flex-col">
            {/* Close button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
            >
              <X size={24} />
            </button>
            
            {/* Image container */}
            <div className="flex-1 flex items-center justify-center relative">
              {/* Navigation buttons */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 p-2 text-white/80 hover:text-white bg-black/20 rounded-full"
              >
                <ChevronLeft size={24} />
              </button>
              
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-full max-w-full object-contain"
              />
              
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 p-2 text-white/80 hover:text-white bg-black/20 rounded-full"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Image info */}
            <div className="mt-4 text-center">
              <h3 className="text-white text-lg font-medium">{selectedImage.title}</h3>
              <p className="text-white/60 text-sm mt-1">
                {currentImageIndex + 1} of {categoryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImpactScreen;