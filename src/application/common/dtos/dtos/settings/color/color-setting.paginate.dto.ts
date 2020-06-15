import { ObjectType } from 'type-graphql';
import PaginatedResponse from '../../../../../core/dtos/PaginatedResponse';
import { ColorSettingDto } from './color-setting.dto';

@ObjectType()
export class PaginatedColorSettingResponse extends PaginatedResponse(ColorSettingDto) {
  // we can freely add more fields or overwrite the existing one's types
}
