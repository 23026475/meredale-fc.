import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = '1burh39i';  // Your actual project ID from the error

export const client = createClient({
  projectId: projectId,
  dataset: 'production',
  apiVersion: '2024-04-04',
  useCdn: true,
  // Add these two lines to fix CORS:
  apiHost: 'https://api.sanity.io',
  token: undefined,  // No token needed for public reads
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}