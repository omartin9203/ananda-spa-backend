import { ResourceEntity } from '../../core/entities/resource.entity';

export interface IResourceService<TResource extends ResourceEntity> {
    getAll(): Promise<TResource[]>;
    findResource(id: string): Promise<TResource>;
    createResource(resource: object): Promise<TResource>;
    updateResource(id: string, input: object): Promise<TResource>;
    deleteResource(id: string): Promise<TResource>;
}
