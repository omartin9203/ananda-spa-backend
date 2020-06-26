import { Module } from '@nestjs/common';
import { ResourceService } from './services/resource.service';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { ResourceRepository } from '../../infrastructure/core/repositories/resource.repository';
import { TemplateBuilderService } from './services/template-builder.service';

@Module({
    imports: [InfrastructureModule],
    providers: [ResourceRepository, ResourceService, TemplateBuilderService],
    exports: [ResourceService, TemplateBuilderService],
})
export class ApplicationCoreModule { }
