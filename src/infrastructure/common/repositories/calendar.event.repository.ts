import { Injectable } from '@nestjs/common';
import { ResourceRepository } from '../../core/repositories/resource.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CalendarEventModel } from '../models/models/calendar.event.model';
import { CALENDAR_EVENT_MODEL_NAME } from '../../../constants/constants';
import { QueryBuilderService } from '../../core/services/query-builder.service';

@Injectable()
export class CalendarEventRepository extends ResourceRepository<CalendarEventModel> {
  constructor(
    @InjectModel(CALENDAR_EVENT_MODEL_NAME) private readonly calendarEventModel: Model<CalendarEventModel>,
    private readonly querybuilderService: QueryBuilderService) {
    super(calendarEventModel, querybuilderService);
  }
}
