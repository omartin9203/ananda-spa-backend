import { Module } from '@nestjs/common';
import { ResourceService } from './services/resource.service';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { ResourceRepository } from '../../infrastructure/core/repositories/resource.repository';

@Module({
    imports: [InfrastructureModule],
    providers: [ResourceRepository, ResourceService],
    exports: [ResourceService],
})
export class ApplicationCoreModule { }
