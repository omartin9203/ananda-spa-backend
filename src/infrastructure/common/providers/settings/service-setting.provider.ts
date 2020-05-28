import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { BASE_SETTING_MODEL_NAME, SERVICE_SETTING_MODEL_NAME } from '../../../../constants/modules/models_names';
import { ServiceSettingSchema } from '../../models/schemas/settings/service-setting.schema';

export const ServiceSettingProviders: Provider[] = [
  {
    provide: getModelToken(SERVICE_SETTING_MODEL_NAME),
    useFactory: (baseFormModel) => baseFormModel.discriminator(SERVICE_SETTING_MODEL_NAME, ServiceSettingSchema),
    inject: [getModelToken(BASE_SETTING_MODEL_NAME)],
  },
];
