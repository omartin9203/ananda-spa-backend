import { ResourceEntity } from '../../core/entities/resource.entity';
import { Field } from 'type-graphql';

export class ClientEntity extends ResourceEntity {
  readonly firstname: string;
  readonly lastname: string;
  readonly phone: string;
  readonly streetaddress: string;
  readonly city: string;
  readonly state: string;
  readonly zipcode: string;
  readonly email: string;
  readonly datebirth: Date;
  readonly imgSrc?: string;
}
