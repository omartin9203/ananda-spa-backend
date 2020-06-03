import { ObjectType } from 'type-graphql';
import PaginatedResponse from '../../../../../core/dtos/PaginatedResponse';
import { RetentionSettingDto } from './retention-setting.dto';

@ObjectType()
export class PaginatedRetentionSettingResponse extends PaginatedResponse(RetentionSettingDto) {
}
