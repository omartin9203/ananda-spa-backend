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
import { FacialFormService } from './application/common/services/form/facial/facial-form.service';
import { ColorSettingService } from './application/common/services/settings/color-setting.service';
import { ColorSettingInput } from './application/common/dtos/inputs/settings/color/color-setting.input';

const { URI, OPTIONS } = process.env.NODE_ENV === 'production' ? CONNECTION.ATLAS : CONNECTION.LOCAL;

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
      // formatError(err: any) {
      //   if (!err.originalError) {
      //     return err;
      //   }
      //   // const data = err.originalError.data;
      //   const msg = err.message || 'An error occurred.';
      //   const code = 500;
      //   // const res = Object(err.originalError.message) as { error: string, statusCode: number };
      //   // return { message: err.originalError.response.error, status: err.originalError.response.statusCode };
      //   return err.message;
      // },
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
export class AppModule {
  constructor(readonly colorService: ColorSettingService) {
    this.initialize();
  }
  async initialize() {
    const str =
      '1,Lavender,#7986CB|2,Sage,#33B679|3,Grape,#8E24AA' +
      '|4,Flamingo,#E67C73|5,Banana,#F6C026|6,Tangerine,#F5511D' +
      '|7,Peacock,#039BE5|8,Graphite,#616161|9,Blueberry,#3F51B5' +
      '|10,Basil,#0B8043|11,Tomato,#D60000';
    const colorsGoogle: ColorSettingInput[] = str.split('|').map(x => {
      const [colorId, name, hexcode ] = x.split(',');
      return {
        name,
        hexcode,
        colorId,
      };
    });
    for (const x of colorsGoogle) {
      try {
        await this.colorService.findOne(x);
      } catch (e) {
        if (e.message.message === 'Could not find resource.') {
          await this.colorService.createResource(x);
        }
      }
    }
  }
}
