// src/components/cms/components/ContentBlock.js
import { AlignCenter, AlignLeft, AlignRight, Bold, Upload, X } from 'lucide-react';
import React from 'react';

// AlignmentButtons Component
function AlignmentButtons({ block, onUpdate }) {
  const alignments = [
    { value: 'text-left', icon: AlignLeft },
    { value: 'text-center', icon: AlignCenter },
    { value: 'text-right', icon: AlignRight },
  ];

  return (
    <div className="flex items-center space-x-1">
      {alignments.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => onUpdate('styles', {
            ...block.styles,
            textAlign: value
          })}
          className={`p-1 rounded ${
            block.styles.textAlign === value ? 'bg-gray-100' : ''
          }`}
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
}

// ImageUploader Component
function ImageUploader({ block, onUpdate }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate('content', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      {block.content ? (
        <div className="relative">
          <img
            src={block.content}
            alt="Uploaded content"
            className="max-w-full h-auto rounded"
          />
          <button
            onClick={() => onUpdate('content', '')}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
              <span>Upload a file</span>
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      )}
    </div>
  );
}

// Main ContentBlock Component
export default function ContentBlock({ block, isEditing, onUpdate }) {
  if (!isEditing) {
    return (
      <div className={block.styles.margin}>
        {block.type === 'image' ? (
          <img src={block.content} alt="Content" className="max-w-full h-auto" />
        ) : (
          <div
            className={`${block.styles.textAlign} ${block.styles.fontSize} ${block.styles.fontWeight}`}
            style={{ color: block.styles.textColor }}
          >
            {block.content}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg">
      <div className="mb-2 flex items-center space-x-2 pb-2 border-b">
        {block.type !== 'image' && (
          <>
            <button
              onClick={() => onUpdate('styles', {
                ...block.styles,
                fontWeight: block.styles.fontWeight === 'font-bold' ? 'font-normal' : 'font-bold'
              })}
              className={`p-1 rounded ${
                block.styles.fontWeight === 'font-bold' ? 'bg-gray-100' : ''
              }`}
            >
              <Bold size={20} />
            </button>
            <AlignmentButtons block={block} onUpdate={onUpdate} />
          </>
        )}
      </div>
      
      {block.type === 'image' ? (
        <ImageUploader block={block} onUpdate={onUpdate} />
      ) : (
        <textarea
          value={block.content}
          onChange={(e) => onUpdate('content', e.target.value)}
          className={`w-full resize-none border-0 focus:ring-0 ${block.styles.fontSize} ${block.styles.fontWeight}`}
          style={{ color: block.styles.textColor }}
          rows={block.type === 'heading' ? 1 : 3}
          placeholder={`Enter ${block.type}...`}
        />
      )}
    </div>
  );
}