import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'marketItems',
  title: 'Market Items',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'contractAddress',
      title: 'Contract Address',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'createdBy',
      title: 'Created By',
      type: 'reference',
      to: [{type: 'users'}],
    }),
    defineField({
      name: 'volumeTraded',
      title: 'Volume Traded',
      type: 'number',
    }),
    defineField({
      name: 'floorPrice',
      title: 'Floor Price',
      type: 'number',
    }),
    defineField({
      name: 'owners',
      title: 'Owners',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'users'}]}],
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
    }),
  ],
})
