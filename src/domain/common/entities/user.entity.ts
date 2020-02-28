import { ResourceEntity } from '../../core/entities/resource.entity';

export class UserEntity extends ResourceEntity {
  readonly email: string;
  readonly userName: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
  readonly active: boolean;
  readonly suspended: {
    isSuspended: boolean,
    endDate: Date,
  };
  readonly departments: [{
    departmentId: string,
  }];
  readonly roles: [{
    roleId: string,
  }];
}
