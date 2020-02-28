import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { VisitDto } from '../../dtos/dtos/visit/visit.dto';
import { VisitRepository } from '../../../../infrastructure/common/repositories/visit.repository';

@Injectable()
export class VisitService extends ResourceService<VisitDto> {
  constructor(repository: VisitRepository) {
    super(repository);
  }
}
