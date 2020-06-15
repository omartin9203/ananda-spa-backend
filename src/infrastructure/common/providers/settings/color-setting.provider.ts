import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { BASE_SETTING_MODEL_NAME, COLOR_SETTING_MODEL_NAME } from '../../../../constants/modules/models_names';
import { ColorSettingSchema } from '../../models/schemas/settings/color-setting.schema';

export const ColorSettingProvider: Provider[] = [
  {
    provide: getModelToken(COLOR_SETTING_MODEL_NAME),
    useFactory: (baseFormModel) => baseFormModel.discriminator(COLOR_SETTING_MODEL_NAME, ColorSettingSchema),
    inject: [getModelToken(BASE_SETTING_MODEL_NAME)],
  },
];
