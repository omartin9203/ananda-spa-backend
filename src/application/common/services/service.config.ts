import { ClientService } from './client/client.service';
import { UserService } from './user/user.service';
import { FacialFormService } from './form/facial/facial-form.service';
import { MassageFormService } from './form/massage/massage-form.service';
import { DiagnosticService } from './diagnostic/diagnostic.service';
import { VisitService } from './visit/visit.service';
import { FilesService } from './images/FilesServices';
import { AuthService } from './auth/auth.service';
import { VisitRetentionService } from './visit/visitRetention.service';
import { ReviewService } from './review/review.service';
import { ReviewSettingService } from './settings/review-settings.service';
import { ServiceSettingService } from './settings/service-setting.service';

export const ServicesConfig = {
    imports: [
    ],
    providers: [
        ClientService, UserService, FacialFormService, MassageFormService, DiagnosticService, VisitService, FilesService,
        AuthService, VisitRetentionService, ReviewService, ReviewSettingService, ServiceSettingService,
    ],
    exports: [
        ClientService, UserService, FacialFormService, MassageFormService, DiagnosticService, VisitService, FilesService,
        AuthService, VisitRetentionService, ReviewService, ReviewSettingService, ServiceSettingService,
    ],
};
