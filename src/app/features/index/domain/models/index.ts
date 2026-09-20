import { Level } from '@common/models';
import { LucideIconData } from 'lucide-angular';

export type AreaId = 'study' | 'practice' | 'games' | 'toefl';

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIconData;
  route?: string;
  available: boolean;
  levels?: readonly Level[];
}

export interface CatalogArea {
  id: AreaId;
  name: string;
  description: string;
  icon: LucideIconData;
  order: number;
  items: CatalogItem[];
}