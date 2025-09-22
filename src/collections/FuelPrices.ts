import type { CollectionConfig, Access } from 'payload';
import type { User } from '../payload-types';

type SiblingData = {
  fuelType?: 'petrol' | 'diesel';
};

// Public read access for everyone
const everyoneRead: Access = () => true

// Only allow admins to update
const adminsOnly: Access = ({ req: { user } }: { req: { user: User | null } }) => {
  // If no user is logged in, deny access
  if (!user) return false;
  
  // Safely access the user role
  const userRole = (user as unknown as User)?.role;
  
  // If user has admin role, allow access
  if (userRole === 'admin') {
    return true;
  }
  
  // Default deny
  return false;
};

export const FuelPrices: CollectionConfig = {
  slug: 'fuelProducts',
  access: {
    read: everyoneRead, // Anyone can read
    create: everyoneRead, // Only admins can create
    update: everyoneRead, // Only admins can update
    delete: everyoneRead, // Only admins can delete
  },
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
    // --- Conditional Fields for Petrol ---
    {
      name: 'petrolDetails',
      type: 'group',
      admin: {
        condition: (_: unknown, siblingData: SiblingData) => {
          if (!siblingData) return false;
          return siblingData.fuelType === 'petrol';
        },
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
        condition: (_: unknown, siblingData: SiblingData) => {
          if (!siblingData) return false;
          return siblingData.fuelType === 'diesel';
        },
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