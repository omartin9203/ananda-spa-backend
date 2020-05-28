import { ObjectType } from 'type-graphql';
import PaginatedResponse from '../../../../../core/dtos/PaginatedResponse';
import { ServiceSettingDto } from './service-setting.dto';

@ObjectType()
export class PaginatedServiceSettingResponse extends PaginatedResponse(ServiceSettingDto) {
}
