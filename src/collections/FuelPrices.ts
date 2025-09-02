import type {CollectionConfig}  from 'payload/';

export const FuelPrices: CollectionConfig = {
  slug: 'fuelProducts',
  admin: {
    useAsTitle: 'name',
    description: 'Manage individual fuel products and their price history.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Display Name',
      admin: {
        description: 'e.g., Petrol 95 Unleaded (Reef)',
      },
    },
    {
      name: 'fuelType',
      type: 'select',
      options: [
        { label: 'Petrol', value: 'petrol' },
        { label: 'Diesel', value: 'diesel' },
      ],
      required: true,
    },
    {
      name: 'location',
      type: 'select',
      options: ['Reef', 'Coast'],
      required: true,
    },
    // --- Conditional Fields for Petrol ---
    {
      name: 'petrolDetails',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.fuelType === 'petrol',
      },
      fields: [
        {
          name: 'octane',
          type: 'select',
          options: ['93', '95'],
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          options: ['Unleaded', 'LRP'],
          required: true,
        },
      ],
    },
    // --- Conditional Fields for Diesel ---
    {
      name: 'dieselDetails',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.fuelType === 'diesel',
      },
      fields: [
        {
          name: 'ppm',
          type: 'select',
          label: 'PPM (Parts Per Million)',
          options: ['50', '500'],
          required: true,
        },
      ],
    },
    // --- Array for Price History ---
    {
      name: 'priceHistory',
      type: 'array',
      label: 'Price History',
      minRows: 1,
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'MMMM yyyy',
            },
          },
        },
        {
          name: 'value',
          type: 'number',
          required: true,
          label: 'Price (in cents)',
        },
      ],
    },
  ],
};