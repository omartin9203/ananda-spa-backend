import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { FACIALFORM_MODEL_NAME, BASEFORM_MODEL_NAME } from '../../../../constants/constants';
import { FacialFormSchema } from '../../models/schemas/form/facial-form.schema';

export const FacialFormProviders: Provider[] = [
  {
    provide: getModelToken(FACIALFORM_MODEL_NAME),
    useFactory: (baseFormModel) => baseFormModel.discriminator(FACIALFORM_MODEL_NAME, FacialFormSchema),
    inject: [ getModelToken(BASEFORM_MODEL_NAME) ],
  },
];
