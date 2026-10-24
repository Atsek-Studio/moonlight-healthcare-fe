import type { ReactNode } from 'react';
export interface ContentFields {
  title?: string; description?: string; image?: string; alt?: string; tag?: string;
  detail?: string; name?: string; quote?: string; note?: string; number?: string;
  icon?: string; titleEn?: string; descriptionEn?: string; value?: string;
  label?: string; labelEn?: string; price?: string; videoUrl?: string;
  orientation?: string; phone?: string; email?: string; zaloUrl?: string;
  openingHours?: string; address?: string; mapQuery?: string; vi?: string; en?: string;
}
export interface ContentItem extends ContentFields { id: string; published?: boolean; section?: string; kind?: 'text' | 'image'; }
export type CollectionKey = 'contactInfo' | 'locations' | 'serviceCards' | 'doctorCards' | 'productCards' | 'articleCards' | 'videoCards' | 'testimonialCards' | 'processSteps' | 'carePillars' | 'statistics';
export type SectionKey = CollectionKey | 'pageContent';
export interface SiteContent { schemaVersion: 1; collections: Record<CollectionKey,ContentItem[]>; pageContent: ContentItem[]; }
export interface DraftRecord { content: SiteContent; version: number; updated_at: string | null; }
export interface FieldDefinition { key: keyof ContentFields; label: string; type: 'text' | 'textarea' | 'url' | 'tel' | 'email' | 'link' | 'video' | 'select'; required: boolean; options?: {value:string;label:string}[]; }
export interface ContentSection { key: SectionKey; label: string; short: string; description: string; singleton?: boolean; fields: FieldDefinition[]; }
export interface VideoMedia { provider: 'Facebook'; kind: 'video' | 'reel'; sourceUrl: string; embedUrl: string | null; shortLink: boolean; }
export type DialogVideo = Partial<ContentItem> & { media: VideoMedia };
export interface ClinicDialog { title?: string; text?: string; video?: DialogVideo; }
export interface Confirmation { title: string; description: string; label?: string; action: () => void | Promise<unknown>; }
export interface EditTarget { key: SectionKey; id?: string; }
export type ChildrenProps = { children: ReactNode };
export type PhotoBusy = (delta:number) => void;
