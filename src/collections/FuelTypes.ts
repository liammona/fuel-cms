import type { CollectionConfig, Access } from 'payload';
import type { User } from '../payload-types';

// Public read access for everyone
const everyoneRead: Access = () => true;

// Only allow admins to update
const adminsOnly: Access = ({ req: { user } }) => {
  if (!user) return false;
  const userRole = (user as unknown as User)?.role;
  return userRole === 'admin';
};

export const FuelTypes: CollectionConfig = {
  slug: 'fuel-types',
  admin: {
    useAsTitle: 'name',
    description: 'Manage fuel types (e.g., Petrol, Diesel)',
  },
  access: {
    read: everyoneRead,
    create: everyoneRead,
    update: everyoneRead,
    delete: everyoneRead,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Fuel Type Name',
      admin: {
        description: 'e.g., Petrol, Diesel',
      },
    },
    {
      name: 'grid',
      type: 'relationship',
      relationTo: 'grids' as any,
      required: true,
      admin: {
        description: 'The grid this fuel type belongs to',
      },
    },
    {
      name: 'fuelProducts',
      type: 'relationship',
      relationTo: 'fuel-products' as any,
      hasMany: true,
      admin: {
        description: 'The products that belong to this fuel type',
      },
    },
  ],
};

export default FuelTypes;
