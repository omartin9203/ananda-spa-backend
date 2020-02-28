import { ObjectType } from 'type-graphql';
import { IResourceDto } from './resource.interface';

@ObjectType('ResourceDto', { implements: IResourceDto })
export class ResourceDto implements IResourceDto {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
