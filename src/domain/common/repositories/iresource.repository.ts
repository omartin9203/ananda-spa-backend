import { ResourceEntity } from '../../core/entities/resource.entity';

export interface IResourceRepository<TResource extends ResourceEntity> {
    getAll(): Promise<TResource[]>;
    create( input: object ): Promise<TResource>;
    getOne(id: string): Promise<TResource>;
    updateOne( Id: string, input: object ): Promise<TResource>;
    deleteOne(Id: string): Promise<TResource>;
    count(filter: object): Promise<number>;
}
