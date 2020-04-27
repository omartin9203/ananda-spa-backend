import { ObjectType } from "type-graphql";
//import { IBaseSetting } from "./base-setting.interface";
import { ResourceDto } from "../../../../../core/dtos/resource.dto";

@ObjectType() // { implements: IBaseSetting })
export class BaseSettingDto extends ResourceDto { // implements IBaseSetting {
}
