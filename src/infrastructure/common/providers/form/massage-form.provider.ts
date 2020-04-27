import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { MASSAGEFORM_MODEL_NAME, BASEFORM_MODEL_NAME } from '../../../../constants/constants';
import { MassageFormSchema } from '../../models/schemas/form/massage-form.schema';

export const MassageFormProviders: Provider[] = [
  {
    provide: getModelToken(MASSAGEFORM_MODEL_NAME),
    useFactory: (baseFormModel) => baseFormModel.discriminator(MASSAGEFORM_MODEL_NAME, MassageFormSchema),
    inject: [ getModelToken(BASEFORM_MODEL_NAME) ],
  },
];
