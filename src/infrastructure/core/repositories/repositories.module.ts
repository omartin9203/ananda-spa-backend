import { Module } from '@nestjs/common';
import { ResourceRepository } from './resource.repository';

@Module({
    providers: [ResourceRepository],
    exports: [ResourceRepository],
})
export class RepositoriesModule { }
