import { InputType, Field } from 'type-graphql';
import { FLAG_RETENTION } from '../../../../../constants/modules/enums';
import { ClientRetentionUpdate } from './ClientRetentionUpdate';
import { RetentionTreatmentSettingUpdate } from '../settings/retention/treatment/retention-treatment-setting.update';
import { RetentionAvailabilitySettingUpdate } from '../settings/retention/availability/retention-availability-setting.update';

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
    @Field(t => [String], {nullable: true})
    readonly otherInfo?: string[];
    static getUnzip(input: VisitRetentionUpdate) {
        const result: any = {};
        Object.keys(input).filter(x => x !== 'client').forEach(x => result[x] = input[x]);
        if (input.client) {
            Object.keys(input.client).forEach(x => {
                result[`client.${x}`] = input.client[x];
            });
        }
        return result;
    }
}
