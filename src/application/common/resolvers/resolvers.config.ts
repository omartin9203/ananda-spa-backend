import { ClientResolver } from './client.resolver';
import { UserResolver } from './user.resolver';
import { BaseFormResolver } from './form/base-form.resolver';
import { FacialFormResolver } from './form/facial-form.resolver';
import { MassageFormResolver } from './form/massage-form.resolver';
import { DiagnosticResolver } from './diagnostic.resolver';
import { VisitResolver } from './visit.resolver';
import { AuthResolver } from './auth/auth.resolver';
import { VisitRetentionResolver } from './visit/visitRetention.resolver';
import { ReviewResolver } from './review/review.resolver';
import { ReviewSettingResolver } from './settings/review-setting.resolver';
import { AccreditedResolver } from './review/accredited.resolver';
import {ReviewBalanceResolver} from './review/balance.resolver';
import { ReviewPerDirectoryResolver } from './review/review-per-directory.resolver';
import { ServiceSettingResolver } from './settings/service-setting.resolver';

export const ResolversConfig = {
    imports: [],
    providers: [
        ClientResolver, UserResolver, BaseFormResolver, FacialFormResolver, MassageFormResolver, DiagnosticResolver,
        VisitResolver, AuthResolver, VisitRetentionResolver, ReviewResolver, ReviewSettingResolver, AccreditedResolver,
        ReviewBalanceResolver, ReviewPerDirectoryResolver, ServiceSettingResolver,
    ],
    exports: [
        ClientResolver, UserResolver, BaseFormResolver, FacialFormResolver, MassageFormResolver, DiagnosticResolver,
        VisitResolver, AuthResolver, VisitRetentionResolver, ReviewResolver, ReviewSettingResolver, AccreditedResolver,
        ReviewBalanceResolver, ReviewPerDirectoryResolver, ServiceSettingResolver,
    ],
};
