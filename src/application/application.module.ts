import { Module } from '@nestjs/common';
import { ApplicationCoreModule } from './core/core.module';
import { ApplicationCommonModule } from './common/common.module';
import { ClientRepository } from '../infrastructure/common/repositories/client.repository';
import { ResourceService } from './core/services/resource.service';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UserRepository } from '../infrastructure/common/repositories/user.repository';
import { ResourceRepository } from '../infrastructure/core/repositories/resource.repository';
import { FacialFormRepository } from '../infrastructure/common/repositories/form/facial-form.repository';
import { MassageFormRepository } from '../infrastructure/common/repositories/form/massage-form.repository';
import { DiagnosticRepository } from '../infrastructure/common/repositories/diagnostic.repository';

@Module({
    imports: [ApplicationCoreModule, ApplicationCommonModule, InfrastructureModule],
    providers: [
      ResourceService, UserRepository, ResourceRepository, ClientRepository, FacialFormRepository, MassageFormRepository,
      DiagnosticRepository,
    ],
    exports: [ApplicationCoreModule, ApplicationCommonModule],
  })
export class ApplicationModule { }
