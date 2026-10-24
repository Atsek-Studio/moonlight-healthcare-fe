import type { SiteContent } from '../types';
import { upgradeContactContent } from './contact';
import * as collections from '../data/clinic';
import pageContent from './pageDefaults.json';
export const defaultContent: SiteContent = upgradeContactContent({
  schemaVersion: 1,
  collections: Object.fromEntries(Object.entries(collections).map(([key, items]) => [key, items.map(item => ({
    ...item,
    published: true
  }))])),
  pageContent
});
export const cloneContent = <T,>(value: T): T => JSON.parse(JSON.stringify(value));
