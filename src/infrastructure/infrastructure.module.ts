import { Module } from '@nestjs/common';
import { InfrastructureCommonModule } from './common/common.module';
import { InfrastructureCoreModule } from './core/core.module';
import { ResourceRepository } from './core/repositories/resource.repository';
import { FacialFormRepository } from './common/repositories/form/facial-form.repository';
import { MassageFormRepository } from './common/repositories/form/massage-form.repository';
import { UserRepository } from './common/repositories/user.repository';
import { ClientRepository } from './common/repositories/client.repository';
import { DiagnosticRepository } from './common/repositories/diagnostic.repository';

@Module({
    imports: [InfrastructureCoreModule, InfrastructureCommonModule],
    providers: [
        FacialFormRepository, MassageFormRepository, ClientRepository, ResourceRepository,
        UserRepository, DiagnosticRepository,
    ],
    exports: [InfrastructureCoreModule, InfrastructureCommonModule],
  })
export class InfrastructureModule { }
