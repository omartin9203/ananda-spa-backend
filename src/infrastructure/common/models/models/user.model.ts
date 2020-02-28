import { ResourceModel } from 'src/infrastructure/core/models/models/resource.model';
import { USER_MODEL_NAME } from '../../../../constants';

export class UserModel extends ResourceModel {
  readonly email: string;
  readonly userName: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
  readonly status: string;
  readonly phone: string;
  readonly imgSrc: string;
  readonly streetAddress: string;
  readonly address2?: string;
  readonly city: string;
  readonly state: string;
  readonly zipCode: string;
  readonly dateOfBirth: Date;
  readonly gender: string;
  readonly suspended: {
    isSuspended: boolean,
    endDate: Date,
  };
  readonly departments: [{
    departmentId: string,
  }];
  readonly roles: string[];
  static ModelName = USER_MODEL_NAME;
}
