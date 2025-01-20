// utils/sanity.js
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Create a URL builder
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source); // Function to get image URL
