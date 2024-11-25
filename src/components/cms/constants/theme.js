// src/components/cms/constants/theme.js
export const colorPresets = {
    text: [
      '#000000', '#FFFFFF', '#1F2937', '#2563EB', '#1D4ED8',
      '#DC2626', '#057857', '#6D28D9', '#374151', '#4B5563'
    ],
    background: [
      '#FFFFFF', '#F3F4F6', '#E5E7EB', '#DBEAFE', '#EDE9FE',
      '#FEF2F2', '#ECFDF5', '#F3E8FF', '#1F2937', '#111827'
    ]
  };
  
  export const blockTypes = [
    {
      id: 'heading',
      label: 'Heading',
      icon: 'Type',
      defaultStyles: {
        fontSize: 'text-3xl',
        fontWeight: 'font-bold',
        margin: 'mb-6'
      }
    },
    {
      id: 'paragraph',
      label: 'Paragraph',
      icon: 'AlignLeft',
      defaultStyles: {
        fontSize: 'text-base',
        fontWeight: 'font-normal',
        margin: 'mb-4'
      }
    },
    {
      id: 'image',
      label: 'Image',
      icon: 'Image',
      defaultStyles: {
        margin: 'mb-6'
      }
    },
    {
      id: 'cta',
      label: 'Call to Action',
      icon: 'Plus',
      defaultStyles: {
        fontSize: 'text-lg',
        fontWeight: 'font-semibold',
        margin: 'mb-6',
        textAlign: 'text-center'
      }
    }
  ];
  
  export const defaultTheme = {
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    padding: 'py-12 px-4',
    maxWidth: 'max-w-6xl',
    containerClasses: 'mx-auto'
  }