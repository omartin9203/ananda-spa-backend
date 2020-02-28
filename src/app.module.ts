import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CONNECTION } from './constants';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { MulterModule } from '@nestjs/platform-express';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RolesGuard } from './application/common/guard/auth/roles.guard';

const { URI, OPTIONS } = process.env.NODE_ENV === 'production' ? CONNECTION.ATLAS : CONNECTION.LOCAL;

@Module({
  imports: [
    MongooseModule.forRoot(URI, OPTIONS),
    MulterModule.register({
      dest: './images',
    }),

    // UserModule,
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
      debug: true,
      introspection: true,
      playground: true,
      cors: false,
      formatError(err) {
        if (!err.originalError) {
          return err;
        }
        // const data = err.originalError.data;
        const msg = err.message || 'An error occurred.';
        const code = 500;
        return { message: msg, status: code };
      },
    }),
    // RoleModule,
    ApplicationModule, InfrastructureModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule { }
