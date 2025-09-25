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
  slug: 'fuel-products',
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'fuelType', 'price', 'updatedAt'],
    description: 'Manage individual fuel products and their pricing',
  },
  access: {
    read: everyoneRead,
    create: everyoneRead,
    update: everyoneRead,
    delete: everyoneRead,
  },
  fields: [
    {
      name: 'displayName',
      type: 'text',
      required: true,
      label: 'Display Name',
      admin: {
        description: 'e.g., "Unleaded 93" or "Diesel 50ppm"',
      },
    },
    {
      name: 'fuelType',
      type: 'relationship',
      relationTo: 'fuel-types' as any,
      required: true,
      admin: {
        description: 'The type of fuel this product belongs to',
      },
    },
    {
      name: 'grid',
      type: 'relationship',
      relationTo: 'grids' as any,
      required: true,
      admin: {
        description: 'The grid this product belongs to',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        step: 0.01,
        description: 'Price in ZAR',
      },
    },
    {
      name: 'specifications',
      type: 'group',
      label: 'Product Specifications',
      fields: [
        {
          name: 'octane',
          type: 'select',
          label: 'Octane Rating',
          options: ['93', '95'],
          admin: {
            condition: (_, siblingData) => {
              if (!siblingData?.fuelType) return false;
              // This will be checked against the related fuel type
              return true; // Will be filtered in the frontend
            },
          },
        },
        {
          name: 'sulfurContent',
          type: 'select',
          label: 'Sulfur Content (PPM)',
          options: ['50', '500'],
          admin: {
            condition: (_, siblingData) => {
              if (!siblingData?.fuelType) return false;
              // This will be checked against the related fuel type
              return true; // Will be filtered in the frontend
            },
          },
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        description: 'Whether this product is currently available',
      },
    },
  ],
};

export default FuelPrices;