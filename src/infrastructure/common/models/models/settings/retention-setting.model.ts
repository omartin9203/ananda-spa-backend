import { BaseSettingModel } from './base-setting.model';

interface IServiceRetention {
  readonly setting: IServiceRetentionOption[];
  readonly default?: string;
}

interface IServiceRetentionOption {
  serviceId: string;
  match: string[];
}

interface IRequestRetention {
  readonly default: boolean;
  readonly personalMatch: string[];
  readonly requestMatch: string[];
}

interface IAmountRetention {
  readonly default?: string;
  readonly setting: IAmount[];
}

interface IAmount {
  readonly match: string[];
  readonly type: 'string' | 'number';
  readonly display?: string;
}

interface IDirectoryRetention {
  readonly default: string;
  readonly setting: Array<{readonly directoryId: string, readonly match: string[]}>;
}

interface ITreatment {
  readonly services: IServiceRetention;
  readonly request: IRequestRetention;
  readonly amount: IAmountRetention;
  readonly directory: IDirectoryRetention;
  readonly tip: IAmountRetention;
  readonly otherInfo: string[];
}

interface IAvailability {
  readonly available: { match: string[] };
  readonly unavailable: { match: string[] };
}

export class RetentionSettingModel extends BaseSettingModel {
  readonly treatment: ITreatment;
  readonly availability: IAvailability;
}
