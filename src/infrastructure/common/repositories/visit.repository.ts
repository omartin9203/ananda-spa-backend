import { Injectable } from '@nestjs/common';
import { ResourceRepository } from '../../core/repositories/resource.repository';
import { InjectModel } from '@nestjs/mongoose';
import { VISIT_MODEL_NAME } from '../../../constants';
import { QueryBuilderService } from '../../core/services/query-builder.service';
import { Model } from 'mongoose';
import { VisitModel } from '../models/models/visit.model';

@Injectable()
export class VisitRepository extends ResourceRepository<VisitModel> {
  constructor(
    @InjectModel(VISIT_MODEL_NAME) private readonly model: Model<VisitModel>,
    private readonly querybuilderService: QueryBuilderService,
  ) {
    super(model, querybuilderService);
  }
}