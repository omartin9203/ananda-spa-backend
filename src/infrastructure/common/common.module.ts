import { Module } from '@nestjs/common';
import { FacialFormRepository } from './repositories/form/facial-form.repository';
import { MassageFormRepository } from './repositories/form/massage-form.repository';
import { ClientRepository } from './repositories/client.repository';
import { UserRepository } from './repositories/user.repository';
import { FacialFormProviders } from './providers/form/facial-form.provider';
import { MassageFormProviders } from './providers/form/massage-form.provider';
import { InfrastructureCoreModule } from '../core/core.module';
import { ResourceRepository } from '../core/repositories/resource.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseFormFeature } from './models/schemas/form/base-form.schema';
import { ClientFeature } from './models/schemas/client.schema';
import { UserFeature } from './models/schemas/user.schema';
import { RoleFeature } from './models/schemas/role.schema';
import { DepartmentFeature } from './models/schemas/department.schema';
import { QueryBuilderService } from '../core/services/query-builder.service';
import { DiagnosticFeature } from './models/schemas/diagnostic.schema';
import { DiagnosticRepository } from './repositories/diagnostic.repository';
import { VisitRepository } from './repositories/visit.repository';
import { VisitFeature } from './models/schemas/visit.schema';
import { VisitRetentionFeature } from './models/schemas/visitRetention.schema';
import { VisitRetentionRepository } from './repositories/visitRetention.repository';
import { ReviewFeature } from './models/schemas/review.schema';
import { ReviewRepository } from './repositories/review.repository';
import { BaseSettingFeature } from './models/schemas/settings/base-setting.schema';
import { ReviewSettingProviders } from './providers/settings/review-setting.provider';
import { ReviewSettingRepository } from './repositories/settings/review-setting.repository';
import { CalendarEventFeature } from './models/schemas/calendar.event.schema';
import { CalendarEventRepository } from './repositories/calendar.event.repository';
import { ColorSettingRepository } from './repositories/settings/color-setting.repository';
import { ColorSettingProvider } from './providers/settings/color-setting.provider';
import { RetentionSettingRepository } from './repositories/settings/retention-setting.repository';
import { ServiceSettingRepository } from './repositories/settings/service-setting.repository';
import { RetentionSettingProviders } from './providers/settings/retention-setting.provider';
import { ServiceSettingProviders } from './providers/settings/service-setting.provider';

@Module({
    imports: [
        MongooseModule.forFeature([
            BaseFormFeature, ClientFeature, CalendarEventFeature, UserFeature, RoleFeature, DepartmentFeature,
            DiagnosticFeature, VisitFeature, VisitRetentionFeature, ReviewFeature, BaseSettingFeature,
        ]),
        InfrastructureCoreModule,
    ],
    providers: [
        FacialFormRepository, MassageFormRepository, ClientRepository, CalendarEventRepository,
        ResourceRepository, QueryBuilderService, VisitRetentionRepository,
        ReviewRepository, ColorSettingRepository, ReviewSettingRepository, ServiceSettingRepository, UserRepository, DiagnosticRepository,
        VisitRepository, RetentionSettingRepository,
        ...FacialFormProviders, ...MassageFormProviders, ...ReviewSettingProviders, ...ColorSettingProvider,
        ...ServiceSettingProviders, ...RetentionSettingProviders,
    ],
    exports: [
        MongooseModule.forFeature([BaseFormFeature, ClientFeature, CalendarEventFeature, UserFeature, RoleFeature, DepartmentFeature]),
        FacialFormRepository, MassageFormRepository, ClientRepository, CalendarEventRepository,
        VisitRepository, VisitRetentionRepository, ReviewRepository, ColorSettingRepository,
        ReviewSettingRepository, ServiceSettingRepository, UserRepository, DiagnosticRepository, RetentionSettingRepository,
        ...FacialFormProviders, ...MassageFormProviders, ...ReviewSettingProviders, ...ServiceSettingProviders, ...RetentionSettingProviders,
    ],
  })
export class InfrastructureCommonModule { }
