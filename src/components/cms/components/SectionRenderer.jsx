// src/components/cms/components/SectionRenderer.jsx
import { Pencil, Trash } from 'lucide-react';
import React from 'react';

export default function SectionRenderer({ section, onEdit, onDelete }) {
  return (
    <div className="relative group bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Editor Controls */}
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2">
        <button
          onClick={onEdit}
          className="p-2 bg-white rounded-lg shadow hover:bg-gray-50"
        >
          <Pencil size={20} className="text-blue-600" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 bg-white rounded-lg shadow hover:bg-gray-50"
        >
          <Trash size={20} className="text-red-600" />
        </button>
      </div>

      {/* Section Content */}
      <div
        className="w-full"
        style={{ backgroundColor: section.theme?.backgroundColor || '#FFFFFF' }}
      >
        <div className={`${section.theme?.padding || 'p-6'} ${section.theme?.maxWidth || 'max-w-6xl'} ${section.theme?.containerClasses || 'mx-auto'}`}>
          {section.content?.map(block => (
            <div
              key={block.id}
              className={`${block.styles?.margin || 'mb-4'}`}
            >
              {block.type === 'image' ? (
                <img
                  src={block.content}
                  alt="Content"
                  className="max-w-full h-auto rounded"
                />
              ) : (
                <div
                  className={`
                    ${block.styles?.textAlign || 'text-left'}
                    ${block.styles?.fontSize || 'text-base'}
                    ${block.styles?.fontWeight || 'font-normal'}
                  `}
                  style={{ color: block.styles?.textColor || '#000000' }}
                >
                  {block.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}