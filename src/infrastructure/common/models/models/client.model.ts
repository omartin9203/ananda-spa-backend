import { ResourceModel } from 'src/infrastructure/core/models/models/resource.model';
import { CLIENT_MODEL_NAME } from '../../../../constants/constants';

export class ClientModel extends ResourceModel {
  readonly firstname: string;
  readonly lastname: string;
  readonly phone: string;
  // readonly address: {
  readonly streetaddress: string;
  readonly city: string;
  readonly state: string;
  readonly zipcode: string;
  // };
  readonly email: string;
  readonly datebirth?: Date;
  readonly imgSrc?: string;
  readonly gender?: string;
  static ModelName = CLIENT_MODEL_NAME;
}
