import { Injectable } from '@nestjs/common';
import { ResourceRepository } from '../../core/repositories/resource.repository';
import { InjectModel } from '@nestjs/mongoose';
import { DIAGNOSTIC_MODEL_NAME } from '../../../constants';
import { QueryBuilderService } from '../../core/services/query-builder.service';
import { DiagnosticModel } from '../models/models/diagnostic.model';
import { Model } from 'mongoose';

@Injectable()
export class DiagnosticRepository extends ResourceRepository<DiagnosticModel> {
  constructor(
    @InjectModel(DIAGNOSTIC_MODEL_NAME) private readonly model: Model<DiagnosticModel>,
    private readonly querybuilderService: QueryBuilderService,
  ) {
    super(model, querybuilderService);
  }
}
