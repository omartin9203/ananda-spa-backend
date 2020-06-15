import { ResourceDto } from '../../../../core/dtos/resource.dto';
import { ObjectType, Field } from 'type-graphql';
import { FLAG_RETENTION } from '../../../../../constants/modules/enums';
import { UserInfoDto } from '../user/user.Info.dto';
import { ReviewSettingDto } from '../settings/review/review-setting.dto';
import { ClientRetentionDto } from './client-retention.dto';
import { ServiceSettingDto } from '../settings/service/service-setting.dto';

@ObjectType()
export class VisitRetentionDto extends ResourceDto {
    @Field()
    readonly userId: string;
    @Field(type => UserInfoDto, {nullable: true})
    readonly user?: UserInfoDto;
    @Field()
    readonly date: Date;
    @Field()
    readonly flag: FLAG_RETENTION;
    @Field()
    readonly directoryId: string;
    @Field(t => ReviewSettingDto, {nullable: true})
    readonly directory?: ReviewSettingDto;
    @Field({nullable: true})
    readonly serviceId?: string;
    @Field(t => ServiceSettingDto, {nullable: true})
    readonly service?: ServiceSettingDto;
    @Field(t => ClientRetentionDto)
    readonly client: ClientRetentionDto;
    @Field({nullable: true})
    readonly amount?: string;
    @Field({nullable: true})
    readonly tip?: string;
    @Field({nullable: true})
    readonly calendarId?: string;
    @Field(t => [String], {nullable: true})
    readonly otherInfo?: string[];
}
