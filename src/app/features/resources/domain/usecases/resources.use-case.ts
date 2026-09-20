import { Injectable, inject } from '@angular/core';
import { ResourceCategory, ResourceItem } from '../models/resource.model';
import { RESOURCES_REPOSITORY_TOKEN } from '../repository/resources.repository';

@Injectable()
export class GetResourcesUseCase {
  private readonly repo = inject(RESOURCES_REPOSITORY_TOKEN);

  async execute(category?: ResourceCategory): Promise<ResourceItem[]> {
    return this.repo.getResources(category);
  }

  async getById(id: string): Promise<ResourceItem | null> {
    return this.repo.getResourceById(id);
  }
}
