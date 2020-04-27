import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { BASE_SETTING_MODEL_NAME, REVIEW_SETTING_MODEL_NAME } from '../../../../constants/modules/models_names';
import { ReviewSettingSchema } from '../../models/schemas/settings/review-settting.schema';

export const ReviewSettingProviders: Provider[] = [
    {
        provide: getModelToken(REVIEW_SETTING_MODEL_NAME),
        useFactory: (baseFormModel) => baseFormModel.discriminator(REVIEW_SETTING_MODEL_NAME, ReviewSettingSchema),
        inject: [getModelToken(BASE_SETTING_MODEL_NAME)],
    },
];
