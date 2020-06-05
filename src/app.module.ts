import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CONNECTION } from './constants/constants';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { MulterModule } from '@nestjs/platform-express';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from 'nest-schedule';

const { URI, OPTIONS } = process.env.NODE_ENV === 'production' ? CONNECTION.LOCAL : CONNECTION.LOCAL;

@Module({
  imports: [
    MongooseModule.forRoot(URI, OPTIONS),
    ScheduleModule.register(),
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
      formatError(err: any) {
        if (!err.originalError) {
          return err;
        }
        // const data = err.originalError.data;
        const msg = err.message || 'An error occurred.';
        const code = 500;
        // const res = Object(err.originalError.message) as { error: string, statusCode: number };
        // return { message: err.originalError.response.error, status: err.originalError.response.statusCode };
        return err.message;
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
