import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const projectId = '1burh39i';

export const client = createClient({
  projectId: projectId,
  dataset: 'production',
  apiVersion: '2024-04-04',
  useCdn: true,
});

const builder = createImageUrlBuilder({ projectId, dataset: 'production' });

export function urlFor(source) {
  return builder.image(source);
}