import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../../core/services/resource.service';
import { MassageFormDto } from '../../../dtos/dtos/form/massage/massage-form.dto';
import { MassageFormRepository } from '../../../../../infrastructure/common/repositories/form/massage-form.repository';

@Injectable()
export class MassageFormService extends ResourceService<MassageFormDto> {
    constructor(repository: MassageFormRepository) {
        super(repository);
    }
}
