import { BaseSettingModel } from './base-setting.model';

export class ColorSettingModel extends BaseSettingModel {
  readonly colorId: string;
  readonly name: string;
  readonly hexcode: string;
  readonly avialable: boolean;
}
