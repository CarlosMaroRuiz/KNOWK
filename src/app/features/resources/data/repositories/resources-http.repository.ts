import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResourcesRepository } from '../../domain/repository/resources.repository';
import { ResourceCategory, ResourceItem } from '../../domain/models/resource.model';

@Injectable()
export class ResourcesHttpRepository implements ResourcesRepository {
  private readonly http = inject(HttpClient);
  private cache: ResourceItem[] | null = null;

  async getResources(category?: ResourceCategory): Promise<ResourceItem[]> {
    const allItems = await this.loadAllResources();
    if (!category) {
      return allItems;
    }
    return allItems.filter((item) => item.category === category);
  }

  async getResourceById(id: string): Promise<ResourceItem | null> {
    const allItems = await this.loadAllResources();
    return allItems.find((item) => item.id === id) ?? null;
  }

  private async loadAllResources(): Promise<ResourceItem[]> {
    if (this.cache) {
      return this.cache;
    }

    try {
      const [grammar, vocabulary, strategies] = await Promise.all([
        firstValueFrom(this.http.get<ResourceItem[]>('api/resources/grammar.json')),
        firstValueFrom(this.http.get<ResourceItem[]>('api/resources/vocabulary.json')),
        firstValueFrom(this.http.get<ResourceItem[]>('api/resources/strategies.json')),
      ]);

      this.cache = [...(grammar ?? []), ...(vocabulary ?? []), ...(strategies ?? [])];
      return this.cache;
    } catch {
      return [];
    }
  }
}
