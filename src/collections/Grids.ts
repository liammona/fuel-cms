import type { CollectionConfig } from 'payload'

export const Grids: CollectionConfig = {
  slug: 'grids',
  admin: {
    useAsTitle: 'gridName',
    description: 'Manage a list of all pricing grids (e.g., 1A, 9c).',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'gridName',
      label: 'Grid Name',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
  ],
}