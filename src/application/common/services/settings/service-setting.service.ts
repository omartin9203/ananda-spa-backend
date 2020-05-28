import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { ServiceSettingDto } from '../../dtos/dtos/settings/service/service-setting.dto';
import { ServiceSettingRepository } from '../../../../infrastructure/common/repositories/settings/service-setting.repository';

@Injectable()
export class ServiceSettingService extends ResourceService<ServiceSettingDto> {
  constructor(repository: ServiceSettingRepository) {
    super(repository);
  }
}
