import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { ColorSettingDto } from '../../dtos/dtos/settings/color/color-setting.dto';
import { ColorSettingRepository } from '../../../../infrastructure/common/repositories/settings/color-setting.repository';

@Injectable()
export class ColorSettingService extends ResourceService<ColorSettingDto> {
  constructor(repository: ColorSettingRepository) {
    super(repository);
  }
}
