import { Injectable, Logger } from '@nestjs/common';
import { ResourceDto } from '../dtos/resource.dto';
import { ResourceRepository } from '../../../infrastructure/core/repositories/resource.repository';
import { IPaginatedResponseClass } from '../../../infrastructure/core/models/interfaces/paginate.interface';

export class ResourceService<TResource extends ResourceDto>  {
    constructor(private resourceRepository: ResourceRepository<TResource>) {
    }
    async getAll(skip?: number, limit?: number, filter?: object): Promise<IPaginatedResponseClass<TResource>> {
        const total = await this.resourceRepository.count(filter);
        return {
            items: await this.resourceRepository.find(filter, skip, limit),
            total,
            hasMore: limit + skip < total,
        };
    }
    async findResource(id: string): Promise<TResource> {
        return await this.resourceRepository.getOne(id);
    }
    async createResource(resource: object): Promise<TResource> {
        return await this.resourceRepository.create(resource);
    }
    async updateResource(id: string, input: object): Promise<TResource> {
        return await this.resourceRepository.updateOne(id, input);
    }
    async deleteResource(id: string): Promise<TResource> {
        return await this.resourceRepository.deleteOne(id);
    }
    async findOne(filter: any): Promise<TResource> {
        return await this.resourceRepository.findOne(filter);
    }
}
