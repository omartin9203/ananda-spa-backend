import { ResourceRepository } from '../../../core/repositories/resource.repository';
import { InjectModel } from '@nestjs/mongoose';
import { RETENTION_SETTING_MODEL_NAME } from '../../../../constants/modules/models_names';
import { QueryBuilderService } from '../../../core/services/query-builder.service';
import { Model } from 'mongoose';
import { RetentionSettingModel } from '../../models/models/settings/retention-setting.model';

export class RetentionSettingRepository extends ResourceRepository<RetentionSettingModel> {
  constructor(
    @InjectModel(RETENTION_SETTING_MODEL_NAME) model: Model<RetentionSettingModel>,
    private readonly querybuilderService: QueryBuilderService,
  ) {
    super(model, querybuilderService);
  }
}
