import { InputType, Field } from 'type-graphql';
import { FLAG_RETENTION } from '../../../../../constants/modules/enums';
import { ClientRetentionUpdate } from './ClientRetentionUpdate';

@InputType()
export class VisitRetentionUpdate {
    @Field({nullable: true})
    readonly userId?: string;
    @Field({nullable: true})
    readonly date?: Date;
    @Field({nullable: true})
    readonly flag?: FLAG_RETENTION;
    @Field({nullable: true})
    readonly directoryId?: string;
    @Field({nullable: true})
    readonly serviceId?: string;
    @Field(t => ClientRetentionUpdate, {nullable: true})
    readonly client?: ClientRetentionUpdate;
    @Field({nullable: true})
    readonly amount?: string;
    @Field({nullable: true})
    readonly tip?: string;
}
