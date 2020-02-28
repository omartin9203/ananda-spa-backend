import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { DiagnosticDto } from '../../dtos/dtos/diagnostic/diagnostic.dto';
import { DiagnosticRepository } from '../../../../infrastructure/common/repositories/diagnostic.repository';

@Injectable()
export class DiagnosticService extends ResourceService<DiagnosticDto> {
  constructor(repository: DiagnosticRepository) {
    super(repository);
  }
}
