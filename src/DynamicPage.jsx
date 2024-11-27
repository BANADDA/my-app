// DynamicPage.js
import React from 'react';
import SectionRenderer from './widgets/SectionRenderer';

const DynamicPage = ({ page }) => {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{page.title}</h1>
        <div className="space-y-8">
          {page.sections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicPage;
