import { Module } from '@nestjs/common';
import { ResourceRepository } from './repositories/resource.repository';
import { RepositoriesModule } from './repositories/repositories.module';
import { QueryBuilderService } from './services/query-builder.service';
import { FileRepository } from './repositories/file.repository';

@Module({
    imports: [RepositoriesModule],
    providers: [ResourceRepository, QueryBuilderService, FileRepository],
    exports: [RepositoriesModule, ResourceRepository, QueryBuilderService, FileRepository],
})
export class InfrastructureCoreModule { }
