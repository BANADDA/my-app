// src/components/cms/components/EmptyState.js
import { Layout, Plus } from 'lucide-react';
import React from 'react';

export default function EmptyState({ onAdd }) {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <Layout size={48} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No Sections Added Yet
      </h3>
      <p className="text-gray-500 mb-4">
        Get started by adding your first section to the page
      </p>
      <button
        onClick={onAdd}
        className="inline-flex items-center px-4 py-2 border border-transparent 
                   shadow-sm text-sm font-medium rounded-md text-white 
                   bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus size={20} className="mr-2" />
        Add First Section
      </button>
    </div>
  );
}