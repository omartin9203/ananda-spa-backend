import { BaseSettingModel } from "./base-setting.model";

export class ReviewSettingModel extends BaseSettingModel {
    readonly directoryName: string;
    readonly bonus: number;
    readonly payment: number;
    readonly percentage: number;
    readonly minOverall: number;
    readonly icon?: string;
    readonly iconReview?: string;
    readonly iconColored?: string;
}
