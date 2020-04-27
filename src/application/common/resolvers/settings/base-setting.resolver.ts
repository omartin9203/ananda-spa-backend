import { BaseSettingDto } from "../../dtos/dtos/settings/base/base-setting.dto";
import { Resolver } from '@nestjs/graphql';

@Resolver(of => BaseSettingDto)
export class BaseSettingResolver {
    constructor() { }
}
