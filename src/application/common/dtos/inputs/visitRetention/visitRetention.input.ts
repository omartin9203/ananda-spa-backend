import { Field, InputType } from 'type-graphql';
import { FLAG_RETENTION } from '../../../../../constants/modules/enums';
import { ClientRetentionInput } from './ClientRetentionInput';

@InputType()
export class VisitRetentionInput {
    @Field()
    readonly userId: string;
    @Field()
    readonly date: Date;
    @Field()
    readonly flag: FLAG_RETENTION;
    @Field()
    readonly directoryId: string;
    @Field({nullable: true})
    readonly serviceId?: string;
    @Field(t => ClientRetentionInput)
    readonly client: ClientRetentionInput;
    @Field({nullable: true})
    readonly amount?: string;
    @Field({nullable: true})
    readonly tip?: string;
    @Field({nullable: true})
    readonly calendarId?: string;
    @Field(t => [String], {nullable: true})
    readonly otherInfo?: string[];
}
