import { BaseSettingModel } from './base-setting.model';

export class ServiceSettingModel extends BaseSettingModel {
  readonly name: string;
  readonly roles: string[];
}
