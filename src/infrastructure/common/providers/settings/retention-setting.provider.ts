import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { BASE_SETTING_MODEL_NAME, RETENTION_SETTING_MODEL_NAME } from '../../../../constants/modules/models_names';
import { RetentionSettingSchema } from '../../models/schemas/settings/retention-setting.schema';

export const RetentionSettingProviders: Provider[] = [
  {
    provide: getModelToken(RETENTION_SETTING_MODEL_NAME),
    useFactory: (baseFormModel) => baseFormModel.discriminator(RETENTION_SETTING_MODEL_NAME, RetentionSettingSchema),
    inject: [getModelToken(BASE_SETTING_MODEL_NAME)],
  },
];
