import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'users',
  title: 'Users',
  type: 'document',
  fields: [
    defineField({
      name: 'userName',
      title: 'User Name',
      type: 'string',
    }),
    defineField({
      name: 'walletAddress',
      title: 'Wallet Address',
      type: 'string',
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
    defineField({
      name: 'twitterHandle',
      title: 'Twitter Handle',
      type: 'string',
    }),
    defineField({
      name: 'igHandle',
      title: 'Instagram Handle',
      type: 'string',
    }),
  ],
})
