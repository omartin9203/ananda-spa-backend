import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { RetentionSettingDto } from '../../dtos/dtos/settings/retention/retention-setting.dto';
import { RetentionSettingRepository } from '../../../../infrastructure/common/repositories/settings/retention-setting.repository';

@Injectable()
export class RetentionSettingsService extends ResourceService<RetentionSettingDto> {
  constructor(repository: RetentionSettingRepository) {
    super(repository);
  }
}
