import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientModel } from '../models/models/client.model';
import { CLIENT_MODEL_NAME } from '../../../constants/constants';
import { QueryBuilderService } from '../../core/services/query-builder.service';
import { ResourceRepository } from '../../core/repositories/resource.repository';

@Injectable()
export class ClientRepository extends ResourceRepository<ClientModel> {
  constructor(
    @InjectModel(CLIENT_MODEL_NAME) private readonly clientModel: Model<ClientModel>,
    private readonly querybuilderService: QueryBuilderService,
  ) {
    super(clientModel, querybuilderService);
  }
}
