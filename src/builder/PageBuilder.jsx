// Import statements
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore functions
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'; // Import Firebase Storage functions
import {
  AlignLeft,
  ArrowUpFromDotIcon,
  ArrowUpLeftFromSquare,
  ChevronDown,
  Columns,
  Grid,
  Image as ImageIcon,
  Layout,
  MoveDown,
  MoveUp,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import React, { memo, useCallback, useState } from 'react';
import { db, storage } from '../firebase-config'; // Import your Firebase configuration
import ApsedecWebsite from '../sections'; // Import your website component if needed

// Section Editor Component
const SectionEditor = memo(({ section, onChange }) => {
  const handleChange = useCallback(
    (field, value) => {
      onChange(section.id, field, value);
    },
    [onChange, section.id]
  );

  // Upload a single image to Firebase Storage
  const handleImageUpload = async (file) => {
    const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Handle single image change (for fields like 'backgroundImage', 'image')
  const handleSingleImageChange = async (field, e) => {
    const file = e.target.files[0];
    if (file) {
      // Upload image to Firebase Storage
      const imageUrl = await handleImageUpload(file);
      handleChange(field, imageUrl);
    }
  };

  // Handle multiple image uploads (for 'imageGallery')
  const handleMultipleImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadPromises = files.map((file) => handleImageUpload(file));
    const imageUrls = await Promise.all(uploadPromises);
    handleChange('images', [
      ...(section.content.images || []),
      ...imageUrls,
    ]);
  };

  switch (section.type) {
    case 'hero':
      return (
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={section.content.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={section.content.subtitle || ''}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          {/* Background Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleSingleImageChange('backgroundImage', e)}
              className="w-full"
            />
          </div>
          {section.content.backgroundImage && (
            <div className="mt-2">
              <img
                src={section.content.backgroundImage}
                alt="Background"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
          {/* Button Text and Link */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={section.content.buttonText || ''}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Link
              </label>
              <input
                type="text"
                value={section.content.buttonLink || ''}
                onChange={(e) => handleChange('buttonLink', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
      );

    case 'imageText':
      return (
        <div className="space-y-4">
          {/* Layout Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Layout
            </label>
            <select
              value={section.content.layout || 'imageLeft'}
              onChange={(e) => handleChange('layout', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="imageLeft">Image Left</option>
              <option value="imageRight">Image Right</option>
            </select>
          </div>
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleSingleImageChange('image', e)}
              className="w-full"
            />
          </div>
          {section.content.image && (
            <div className="mt-2">
              <img
                src={section.content.image}
                alt="Selected"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={section.content.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          {/* Content Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={section.content.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
      );

    case 'imageGallery':
      return (
        <div className="space-y-4">
          {/* Layout Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Layout
            </label>
            <select
              value={section.content.layout || 'grid'}
              onChange={(e) => handleChange('layout', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="grid">Grid</option>
              <option value="masonry">Masonry</option>
              <option value="carousel">Carousel</option>
            </select>
          </div>
          {/* Images Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultipleImagesChange}
              className="w-full"
            />
          </div>
          {/* Thumbnails with Delete Option */}
          <div className="grid grid-cols-3 gap-4">
            {section.content.images?.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img}
                  alt=""
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => {
                    const newImages = section.content.images.filter(
                      (_, i) => i !== index
                    );
                    handleChange('images', newImages);
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      );

    case 'textContent':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            value={section.content.content || ''}
            onChange={(e) => handleChange('content', e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      );

    case 'twoColumns':
      return (
        <div className="space-y-4">
          {/* Left Column Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Left Column
            </label>
            <textarea
              value={section.content.leftContent || ''}
              onChange={(e) => handleChange('leftContent', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          {/* Right Column Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Right Column
            </label>
            <textarea
              value={section.content.rightContent || ''}
              onChange={(e) => handleChange('rightContent', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
});

// Section Preview Component
const SectionPreview = memo(({ section }) => {
  switch (section.type) {
    case 'hero':
      return (
        <div className="relative min-h-64 bg-gray-800 rounded-lg overflow-hidden">
          {section.content.backgroundImage && (
            <img
              src={section.content.backgroundImage}
              alt="Hero background"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
          )}
          <div className="relative z-10 p-8 flex flex-col items-center justify-center min-h-64 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              {section.content.title}
            </h2>
            <p className="text-lg text-white/80 mb-8">
              {section.content.subtitle}
            </p>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg">
              {section.content.buttonText}
            </button>
          </div>
        </div>
      );

    case 'imageText':
      return (
        <div className="grid grid-cols-12 gap-8 p-6">
          <div
            className={`${
              section.content.layout === 'imageRight' ? 'order-2' : 'order-1'
            } col-span-4 bg-gray-100 rounded-lg overflow-hidden`}
          >
            <img
              src={
                section.content.image ||
                'https://via.placeholder.com/400x300.png?text=Image'
              }
              alt=""
              className="w-full h-auto object-cover"
            />
          </div>
          <div
            className={`${
              section.content.layout === 'imageRight' ? 'order-1' : 'order-2'
            } col-span-8 flex flex-col justify-start`}
          >
            <h3 className="text-xl font-bold mb-4">{section.content.title}</h3>
            <p>{section.content.text}</p>
          </div>
        </div>
      );

    case 'imageGallery':
      return (
        <div className="p-6">
          <div
            className={`grid grid-cols-3 gap-4 ${
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
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      );

    case 'textContent':
      return (
        <div className="prose max-w-none p-4">
          <p>{section.content.content}</p>
        </div>
      );

    case 'twoColumns':
      return (
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="prose">
            <p>{section.content.leftContent}</p>
          </div>
          <div className="prose">
            <p>{section.content.rightContent}</p>
          </div>
        </div>
      );

    default:
      return null;
  }
});

// Main PageBuilder Component
const PageBuilder = () => {
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [previewPosition, setPreviewPosition] = useState('right');
  const [page, setPage] = useState({
    title: '',
    slug: '',
    sections: [],
  });
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [showSectionPicker, setShowSectionPicker] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('admin');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sectionTypes = [
    {
      id: 'hero',
      name: 'Hero Section',
      icon: Layout,
      description: 'Large banner with background image',
      defaultContent: {
        title: 'Hero Title',
        subtitle: 'Hero Subtitle',
        backgroundImage: null,
        buttonText: 'Learn More',
        buttonLink: '#',
      },
    },
    {
      id: 'imageText',
      name: 'Image + Text',
      icon: ImageIcon,
      description: 'Image with accompanying text',
      defaultContent: {
        layout: 'imageLeft',
        image: null,
        title: 'Section Title',
        text: 'Enter your content here...',
      },
    },
    {
      id: 'imageGallery',
      name: 'Image Gallery',
      icon: Grid,
      description: 'Grid or carousel of images',
      defaultContent: {
        layout: 'grid',
        images: [],
      },
    },
    {
      id: 'textContent',
      name: 'Text Content',
      icon: AlignLeft,
      description: 'Rich text content area',
      defaultContent: {
        content: 'Enter your content here...',
      },
    },
    {
      id: 'twoColumns',
      name: 'Two Columns',
      icon: Columns,
      description: 'Two column layout',
      defaultContent: {
        leftContent: 'Left column content',
        rightContent: 'Right column content',
      },
    },
  ];

  // Handlers
  const toggleWidth = () => setIsFullWidth(!isFullWidth);
  const cyclePreviewPosition = () => {
    const positions = ['right', 'bottom', 'hidden'];
    const currentIndex = positions.indexOf(previewPosition);
    setPreviewPosition(positions[(currentIndex + 1) % positions.length]);
  };

  const addSection = useCallback((sectionType) => {
    const newSection = {
      type: sectionType.id,
      id: Date.now().toString(),
      content: { ...sectionType.defaultContent },
    };

    setPage((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
    setShowSectionPicker(false);
    setActiveSectionId(newSection.id);
  }, []);

  const moveSection = useCallback((index, direction) => {
    setPage((prev) => {
      const newSections = [...prev.sections];
      [newSections[index], newSections[index + direction]] = [
        newSections[index + direction],
        newSections[index],
      ];
      return { ...prev, sections: newSections };
    });
  }, []);

  const deleteSection = useCallback((id) => {
    setPage((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== id),
    }));
    setActiveSectionId(null);
  }, []);

  const handleSectionChange = useCallback((sectionId, field, value) => {
    setPage((prev) => {
      const sectionIndex = prev.sections.findIndex((s) => s.id === sectionId);
      if (sectionIndex === -1) return prev;

      const updatedSections = [...prev.sections];
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        content: {
          ...updatedSections[sectionIndex].content,
          [field]: value,
        },
      };

      return {
        ...prev,
        sections: updatedSections,
      };
    });
  }, []);

  // Save Page Handler
  const savePage = async () => {
    try {
      // Save the page data to Firebase Firestore
      const docRef = await addDoc(collection(db, 'pages'), page);
      console.log('Document written with ID: ', docRef.id);

      // Clear the form fields by resetting the state
      setPage({
        title: '',
        slug: '',
        sections: [],
      });
      setActiveSectionId(null);

      alert('Page saved successfully!');
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('Failed to save the page. Please try again.');
    }
  };

  // Layout class computation
  const getLayoutClasses = () => {
    const baseClasses = 'transition-all duration-300 ease-in-out ';
    if (isFullWidth) {
      return baseClasses + 'container-fluid px-4';
    }
    return baseClasses + 'max-w-7xl mx-auto px-4';
  };

  const getGridClasses = () => {
    switch (previewPosition) {
      case 'right':
        return 'grid grid-cols-12 gap-8';
      case 'bottom':
        return 'flex flex-col gap-8';
      case 'hidden':
        return 'block';
      default:
        return 'grid grid-cols-12 gap-8';
    }
  };

  const getEditorClasses = () => {
    switch (previewPosition) {
      case 'right':
        return 'col-span-8';
      case 'bottom':
      case 'hidden':
        return 'w-full';
      default:
        return 'col-span-8';
    }
  };

  const getPreviewClasses = () => {
    switch (previewPosition) {
      case 'right':
        return 'col-span-4';
      case 'bottom':
        return 'w-full';
      case 'hidden':
        return 'hidden';
      default:
        return 'col-span-4';
    }
  };

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Conditionally render different screens
  if (currentScreen === 'home') {
    return <ApsedecWebsite />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className={getLayoutClasses()}>
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">APSEDEC CMS</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleNavigation('home')}
                className="text-gray-700 hover:text-green-800 font-medium"
              >
                Home
              </button>
              <button
                onClick={toggleWidth}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                title={
                  isFullWidth ? 'Switch to contained width' : 'Switch to full width'
                }
              >
                {isFullWidth ? (
                  <ArrowUpFromDotIcon className="w-5 h-5" />
                ) : (
                  <ArrowUpLeftFromSquare className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={cyclePreviewPosition}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                {previewPosition === 'hidden'
                  ? 'Show Preview'
                  : `Preview: ${previewPosition}`}
              </button>
              <button
                onClick={savePage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Page</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={getLayoutClasses() + ' py-8'}>
        <div className={getGridClasses()}>
          {/* Editor */}
          <div className={getEditorClasses()}>
            {/* Page Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-2 gap-6">
                {/* Page Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title
                  </label>
                  <input
                    type="text"
                    value={page.title}
                    onChange={(e) =>
                      setPage((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter page title"
                  />
                </div>
                {/* Page Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page URL Slug
                  </label>
                  <input
                    type="text"
                    value={page.slug}
                    onChange={(e) =>
                      setPage((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="page-url-slug"
                  />
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {page.sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`bg-white rounded-lg shadow-sm ${
                    activeSectionId === section.id ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {/* Section Header */}
                  <div className="px-6 py-4 border-b flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() =>
                          setActiveSectionId(
                            activeSectionId === section.id ? null : section.id
                          )
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transform transition-transform ${
                            activeSectionId === section.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <span className="font-medium">
                        {sectionTypes.find((type) => type.id === section.type)?.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => index > 0 && moveSection(index, -1)}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <MoveUp className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          index < page.sections.length - 1 && moveSection(index, 1)
                        }
                        disabled={index === page.sections.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <MoveDown className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteSection(section.id)}
                        className="p-1 text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Section Editor */}
                  {activeSectionId === section.id && (
                    <div className="p-6">
                      <SectionEditor
                        section={section}
                        onChange={handleSectionChange}
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Add Section Button */}
              <button
                onClick={() => setShowSectionPicker(true)}
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-green-500 hover:text-green-500 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Section</span>
              </button>
            </div>
          </div>

          {/* Preview */}
          {previewPosition !== 'hidden' && (
            <div className={getPreviewClasses()}>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="font-medium text-gray-900 mb-4">Preview</h3>
                <div className="space-y-4">
                  {page.sections.map((section) => (
                    <div key={section.id} className="transform scale-90 origin-top">
                      <SectionPreview section={section} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Section Picker Modal */}
      {showSectionPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add New Section</h2>
                <button
                  onClick={() => setShowSectionPicker(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {sectionTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => addSection(type)}
                      className="p-4 border rounded-lg text-left hover:border-green-500 hover:bg-green-50 transition-colors group"
                    >
                      <Icon className="w-6 h-6 text-gray-400 group-hover:text-green-500 mb-2" />
                      <h3 className="font-medium text-gray-900 mb-1">
                        {type.name}
                      </h3>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageBuilder;
