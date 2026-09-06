import { LucideIconData } from 'lucide-angular';

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIconData;
  route?: string;
  available: boolean;
}