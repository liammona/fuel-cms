import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'productName',
    description: 'Manage a list of all products (e.g., ULP95, Diesel).',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'productName',
      label: 'Product Name',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
  ],
}