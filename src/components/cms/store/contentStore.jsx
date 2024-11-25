// src/components/cms/store/ContentStore.js
import { create } from 'zustand';

// Sample section types with their constraints
const sectionTypes = {
  hero: {
    name: 'Hero Section',
    allowedPositions: ['top'],
    hasImage: true,
    description: 'With image and text overlay'
  },
  content: {
    name: 'Content Section',
    allowedPositions: ['middle', 'bottom'],
    hasImage: true,
    description: 'Regular content block'
  },
  features: {
    name: 'Features Grid',
    allowedPositions: ['middle'],
    hasImage: true,
    description: 'Grid layout for features'
  },
  testimonials: {
    name: 'Testimonials',
    allowedPositions: ['middle', 'bottom'],
    hasImage: true,
    description: 'Customer testimonials'
  },
  cta: {
    name: 'Call to Action',
    allowedPositions: ['bottom'],
    hasImage: false,
    description: 'Conversion section'
  },
  contact: {
    name: 'Contact Form',
    allowedPositions: ['bottom'],
    hasImage: false,
    description: 'Contact form section'
  }
};

const useContentStore = create((set, get) => ({
  // State
  sections: [],
  editingSection: null,
  templates: Object.entries(sectionTypes).map(([id, type]) => ({
    id,
    ...type
  })),

  // Getters
  getSectionsByPosition: (position) => {
    return get().sections.filter(section => section.position === position);
  },

  // Actions
  addSection: (sectionData) => {
    const newSection = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...sectionData
    };

    set(state => ({
      sections: [...state.sections, newSection]
    }));

    return newSection;
  },

  updateSection: (sectionId, updateData) => {
    set(state => ({
      sections: state.sections.map(section =>
        section.id === sectionId
          ? { ...section, ...updateData, updatedAt: new Date().toISOString() }
          : section
      )
    }));
  },

  deleteSection: (sectionId) => {
    set(state => ({
      sections: state.sections.filter(section => section.id !== sectionId)
    }));
  },

  moveSection: (sectionId, direction) => {
    set(state => {
      const sections = [...state.sections];
      const index = sections.findIndex(s => s.id === sectionId);
      if (index === -1) return state;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= sections.length) return state;

      const section = sections[index];
      sections.splice(index, 1);
      sections.splice(newIndex, 0, section);

      return { sections };
    });
  },

  setEditingSection: (section) => {
    set({ editingSection: section });
  },

  // Template Management
  getAvailableTemplates: (position) => {
    const { templates } = get();
    return templates.filter(template => 
      template.allowedPositions.includes(position)
    );
  },

  // Section Validation
  validateSection: (section) => {
    const type = sectionTypes[section.type];
    if (!type) return false;
    return type.allowedPositions.includes(section.position);
  },

  // Default Section Creator
  createDefaultSection: (type, position) => {
    const sectionType = sectionTypes[type];
    if (!sectionType || !sectionType.allowedPositions.includes(position)) {
      throw new Error('Invalid section type or position');
    }

    return {
      type,
      position,
      content: [],
      theme: {
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        padding: 'py-12 px-4',
        maxWidth: 'max-w-6xl',
        containerClasses: 'mx-auto'
      }
    };
  }
}));

export default useContentStore