import { LucideIconData } from 'lucide-angular';

export interface AdminPanelCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIconData;
  route: string;
}
