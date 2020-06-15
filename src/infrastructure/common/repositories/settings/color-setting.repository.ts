import { ResourceRepository } from '../../../core/repositories/resource.repository';
import { ColorSettingModel } from '../../models/models/settings/color-setting.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryBuilderService } from '../../../core/services/query-builder.service';
import { COLOR_SETTING_MODEL_NAME } from '../../../../constants/modules/models_names';

export  class ColorSettingRepository extends ResourceRepository<ColorSettingModel> {
  constructor(
    @InjectModel(COLOR_SETTING_MODEL_NAME) model: Model<ColorSettingModel>,
    private readonly querybuilderService: QueryBuilderService,
  ) {
    super(model, querybuilderService);
  }
}
