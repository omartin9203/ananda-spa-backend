import { BaseSettingModel } from './base-setting.model';

export class ColorSettingModel extends BaseSettingModel {
  readonly colorId: number;
  readonly name: string;
  readonly hexcode: string;
}
