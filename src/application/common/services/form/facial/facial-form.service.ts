import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../../core/services/resource.service';
import { FacialFormDto } from '../../../dtos/dtos/form/facial/facial-form.dto';
import { FacialFormRepository } from '../../../../../infrastructure/common/repositories/form/facial-form.repository';

@Injectable()
export class FacialFormService extends ResourceService<FacialFormDto> {
    constructor(repository: FacialFormRepository) {
        super(repository);
    }
}
