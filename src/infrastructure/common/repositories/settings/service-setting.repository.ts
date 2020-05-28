import { ResourceRepository } from '../../../core/repositories/resource.repository';
import { InjectModel } from '@nestjs/mongoose';
import { SERVICE_SETTING_MODEL_NAME } from '../../../../constants/modules/models_names';
import { QueryBuilderService } from '../../../core/services/query-builder.service';
import { ServiceSettingModel } from '../../models/models/settings/service-setting.model';
import { Model } from 'mongoose';

export class ServiceSettingRepository extends ResourceRepository<ServiceSettingModel> {
  constructor(
    @InjectModel(SERVICE_SETTING_MODEL_NAME) model: Model<ServiceSettingModel>,
    private readonly querybuilderService: QueryBuilderService,
  ) {
    super(model, querybuilderService);
  }
}
