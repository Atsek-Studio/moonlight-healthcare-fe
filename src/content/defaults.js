import * as collections from '../data/clinic';
import pageContent from './pageDefaults.json';
export const defaultContent = {
  schemaVersion: 1,
  collections: Object.fromEntries(Object.entries(collections).map(([key, items]) => [key, items.map(item => ({
    ...item,
    published: true
  }))])),
  pageContent
};
export const cloneContent = value => JSON.parse(JSON.stringify(value));
