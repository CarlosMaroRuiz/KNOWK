import { InjectionToken } from '@angular/core';
import { ResourceCategory, ResourceItem } from '../models/resource.model';

export abstract class ResourcesRepository {
  abstract getResources(category?: ResourceCategory): Promise<ResourceItem[]>;
  abstract getResourceById(id: string): Promise<ResourceItem | null>;
}

export const RESOURCES_REPOSITORY_TOKEN = new InjectionToken<ResourcesRepository>(
  'RESOURCES_REPOSITORY_TOKEN'
);
