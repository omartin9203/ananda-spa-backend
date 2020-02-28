import { Module } from '@nestjs/common';
import { ApplicationCoreModule } from '../core/core.module';

import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { AuthController } from './controllers/auth.controller';
import { GuardConfig } from './guard/guard.config';
import { ServicesConfig } from './services/service.config';
import { ResolversConfig } from './resolvers/resolvers.config';

@Module({
  imports: [
    ApplicationCoreModule, InfrastructureModule,
    ...GuardConfig.imports, ...ServicesConfig.imports, ...ResolversConfig.imports,
  ],
  providers: [
    ...ServicesConfig.providers, ...GuardConfig.providers, ...ResolversConfig.providers,
  ],
  exports: [
    ...ServicesConfig.exports, ...GuardConfig.exports, ...ResolversConfig.exports,
  ],
  controllers: [AuthController],
})
export class ApplicationCommonModule { }
