// src/components/cms/components/PageBuilder.jsx
import { FileText, LayoutGrid, Pencil, Plus, Settings, Trash } from 'lucide-react';
import React from 'react';
import useContentStore from '../store/contentStore';
import SectionEditor from './SectionEditor';

export default function PageBuilder() {
  const { 
    sections,
    editingSection,
    addSection,
    updateSection,
    deleteSection,
    setEditingSection
  } = useContentStore();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex-shrink-0">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">Apsedec CMS</h1>
        </div>
        <nav className="p-4 space-y-2">
          <button className="flex items-center space-x-3 w-full p-2 text-gray-600 hover:bg-gray-50 rounded">
            <FileText size={20} />
            <span>Pages</span>
          </button>
          <button className="flex items-center space-x-3 w-full p-2 bg-blue-50 text-blue-600 rounded">
            <LayoutGrid size={20} />
            <span>Section Templates</span>
          </button>
          <button className="flex items-center space-x-3 w-full p-2 text-gray-600 hover:bg-gray-50 rounded">
            <Settings size={20} />
            <span>Themes</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Content Management</h2>
            <button
              onClick={() => setEditingSection({})}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add New Section</span>
            </button>
          </div>

          {/* Section Positions Guide */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Available Section Positions</h3>
            <div className="grid grid-cols-3 gap-6">
              <SectionPositionCard
                title="Top"
                description="Header and hero sections"
                allowedSections={['Hero Section']}
              />
              <SectionPositionCard
                title="Middle"
                description="Main content sections"
                allowedSections={['Content Section', 'Features Grid', 'Testimonials']}
              />
              <SectionPositionCard
                title="Bottom"
                description="Footer and CTA sections"
                allowedSections={['Content Section', 'Call to Action', 'Testimonials', 'Contact Form']}
              />
            </div>
          </div>

          {/* Section Lists */}
          <div className="space-y-6">
            <SectionGroup title="Top Sections" sections={sections.filter(s => s.position === 'top')} />
            <SectionGroup title="Middle Sections" sections={sections.filter(s => s.position === 'middle')} />
            <SectionGroup title="Bottom Sections" sections={sections.filter(s => s.position === 'bottom')} />
          </div>
        </div>
      </div>

      {/* Section Editor Modal */}
      {editingSection && (
        <SectionEditor
          section={editingSection}
          onSave={(updatedSection) => {
            if (editingSection.id) {
              updateSection(editingSection.id, updatedSection);
            } else {
              addSection(updatedSection);
            }
            setEditingSection(null);
          }}
          onClose={() => setEditingSection(null)}
        />
      )}
    </div>
  );
}

// Position Card Component
function SectionPositionCard({ title, description, allowedSections }) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h4 className="text-blue-600 font-medium mb-1">{title}</h4>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <div className="text-sm">
        Allowed sections:
        <div className="mt-2 flex flex-wrap gap-2">
          {allowedSections.map(section => (
            <span
              key={section}
              className="inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs"
            >
              {section}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Section Group Component
function SectionGroup({ title, sections }) {
  const { setEditingSection, deleteSection } = useContentStore();

  return (
    <div>
      <h3 className="font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {sections.map(section => (
          <div key={section.id} className="bg-white rounded-lg p-4 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <LayoutGrid className="text-gray-400" size={20} />
                <div>
                  <h4 className="font-medium">{section.type}</h4>
                  <p className="text-sm text-gray-500">{section.description}</p>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2">
                <button
                  onClick={() => setEditingSection(section)}
                  className="p-2 text-gray-600 hover:text-blue-600"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => deleteSection(section.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}