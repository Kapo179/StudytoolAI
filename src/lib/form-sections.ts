export const FORM_SECTIONS = ['basics', 'media', 'details', 'preview'] as const;
export type FormSection = typeof FORM_SECTIONS[number];

export interface SectionConfig {
  title: string;
  fields: string[];
  fieldLabels: Record<string, string>;
}

export const SECTION_CONFIG: Record<FormSection, SectionConfig> = {
  basics: {
    title: 'Basic Information',
    fields: ['name', 'tagline', 'description', 'contactName', 'contactEmail'],
    fieldLabels: {
      name: 'Product Name',
      tagline: 'Tagline',
      description: 'Description',
      contactName: 'Contact Name',
      contactEmail: 'Contact Email',
    },
  },
  media: {
    title: 'Media Assets',
    fields: ['logo', 'images'],
    fieldLabels: {
      logo: 'Product Logo',
      images: 'Product Screenshots',
    },
  },
  details: {
    title: 'Product Details',
    fields: ['websiteUrl', 'pricing.type'],
    fieldLabels: {
      websiteUrl: 'Website URL',
      'pricing.type': 'Pricing Type',
    },
  },
  preview: {
    title: 'Preview',
    fields: [],
    fieldLabels: {},
  },
};