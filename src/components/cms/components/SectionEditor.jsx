// src/components/cms/components/SectionEditor.jsx
import { Eye, Plus, Save, X } from 'lucide-react';
import React, { useState } from 'react';
import { defaultTheme } from '../constants/theme';

// ThemeEditor Component with null checks
function ThemeEditor({ theme = defaultTheme, onChange }) {
  const [showColorPicker, setShowColorPicker] = useState(null);

  const colorPresets = {
    background: ['#FFFFFF', '#F3F4F6', '#E5E7EB', '#DBEAFE', '#EDE9FE'],
    text: ['#000000', '#1F2937', '#374151', '#2563EB', '#1D4ED8']
  };

  return (
    <div className="mb-6 p-4 border rounded-lg">
      <h3 className="font-medium mb-4">Theme Settings</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Color
          </label>
          <div className="relative">
            <button
              onClick={() => setShowColorPicker('background')}
              className="w-full flex items-center space-x-2 p-2 border rounded-lg"
            >
              <div 
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: theme.backgroundColor }}
              />
              <span>{theme.backgroundColor}</span>
            </button>
            {showColorPicker === 'background' && (
              <div className="absolute top-full left-0 mt-2 p-2 bg-white rounded-lg shadow-lg border z-10">
                <div className="grid grid-cols-5 gap-2">
                  {colorPresets.background.map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        onChange({ ...theme, backgroundColor: color });
                        setShowColorPicker(null);
                      }}
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Color
          </label>
          <div className="relative">
            <button
              onClick={() => setShowColorPicker('text')}
              className="w-full flex items-center space-x-2 p-2 border rounded-lg"
            >
              <div 
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: theme.textColor }}
              />
              <span>{theme.textColor}</span>
            </button>
            {showColorPicker === 'text' && (
              <div className="absolute top-full left-0 mt-2 p-2 bg-white rounded-lg shadow-lg border z-10">
                <div className="grid grid-cols-5 gap-2">
                  {colorPresets.text.map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        onChange({ ...theme, textColor: color });
                        setShowColorPicker(null);
                      }}
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ContentEditor Component with null checks
function ContentEditor({ content = [], onChange }) {
  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: '',
      styles: {
        fontSize: type === 'heading' ? 'text-3xl' : 'text-base',
        fontWeight: type === 'heading' ? 'font-bold' : 'font-normal',
        textAlign: 'text-left',
        margin: 'mb-4'
      }
    };
    onChange([...content, newBlock]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Content Blocks</h3>
        <button
          onClick={() => addBlock('paragraph')}
          className="flex items-center space-x-2 text-blue-600"
        >
          <Plus size={20} />
          <span>Add Block</span>
        </button>
      </div>

      {content.map(block => (
        <div key={block.id} className="border rounded-lg p-4">
          <textarea
            value={block.content}
            onChange={(e) => {
              const updatedContent = content.map(b =>
                b.id === block.id ? { ...b, content: e.target.value } : b
              );
              onChange(updatedContent);
            }}
            className={`w-full resize-none border-0 focus:ring-0 ${
              block.styles.fontSize
            } ${block.styles.fontWeight}`}
            rows={3}
            placeholder={`Enter ${block.type}...`}
          />
        </div>
      ))}
    </div>
  );
}

// SectionPreview Component with null checks
function SectionPreview({ section = { theme: defaultTheme, content: [] } }) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Preview</h3>
        <Eye size={20} className="text-gray-400" />
      </div>

      <div
        className="rounded-lg overflow-hidden p-4"
        style={{ backgroundColor: section.theme.backgroundColor }}
      >
        {section.content.map(block => (
          <div
            key={block.id}
            className={`${block.styles?.margin} ${block.styles?.textAlign} ${
              block.styles?.fontSize
            } ${block.styles?.fontWeight}`}
            style={{ color: section.theme.textColor }}
          >
            {block.content || `[${block.type}]`}
          </div>
        ))}
      </div>
    </div>
  );
}

// Main SectionEditor Component
export default function SectionEditor({ section, onSave, onClose }) {
  const [currentSection, setCurrentSection] = useState({
    type: 'content',
    position: 'middle',
    content: [],
    theme: { ...defaultTheme },
    ...section
  });

  const handleSave = () => {
    onSave(currentSection);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Editor header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Section</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Save size={20} />
              <span>Save Changes</span>
            </button>
            <button onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Editor content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Content editor */}
          <div className="flex-1 overflow-auto p-6">
            <ThemeEditor
              theme={currentSection.theme}
              onChange={(theme) => setCurrentSection(prev => ({ ...prev, theme }))}
            />
            <ContentEditor
              content={currentSection.content}
              onChange={(content) => setCurrentSection(prev => ({ ...prev, content }))}
            />
          </div>

          {/* Preview panel */}
          <div className="w-1/3 border-l overflow-auto">
            <SectionPreview section={currentSection} />
          </div>
        </div>
      </div>
    </div>
  );
}