import type { CollectionConfig } from 'payload'

export const ProductPrices: CollectionConfig = {
  slug: 'product-prices',
  admin: {
    useAsTitle: 'product',
    description: 'Link products to grids and manage their price history.',
    listSearchableFields: ['product', 'grid'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'grid',
      type: 'relationship',
      relationTo: 'grids',
      required: true,
    },
    {
      name: 'priceHistory',
      label: 'Price History',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'effectiveDate',
          label: 'Effective Date',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'd MMM yyyy',
            },
          },
        },
      ],
    },
  ],
  // This index ensures that you cannot create a duplicate entry
  // for the same product and grid combination.
  indexes: [
    {
      // --- THIS IS THE CORRECTED PART ---
      // 'fields' should be an array of field name strings.
      fields: ['product', 'grid'],
      unique: true,
    },
  ],
}