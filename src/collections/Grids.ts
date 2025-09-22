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

export const Grids: CollectionConfig = {
  slug: 'grids',
  admin: {
    useAsTitle: 'label',
    description: 'Manage fuel pricing grids',
  },
  access: {
    read: everyoneRead,
    create: everyoneRead,
    update: everyoneRead,
    delete: everyoneRead,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Grid Label',
      admin: {
        description: 'Display name for the grid (e.g., "Zone 1A")',
      },
    },
    {
      name: 'value',
      type: 'text',
      required: true,
      label: 'Grid Value',
      admin: {
        description: 'Unique identifier for the grid (e.g., "1A")',
      },
    },
    {
      name: 'fuelProducts',
      type: 'relationship',
      relationTo: 'fuelProducts',
      hasMany: true,
      admin: {
        description: 'Fuel products that belong to this grid',
      },
    },
  ],
};

export default Grids;
