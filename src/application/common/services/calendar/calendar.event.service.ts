import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { CalendarEventDto } from '../../dtos/dtos/calendar/calendar.event.dto';
import { CalendarEventRepository } from '../../../../infrastructure/common/repositories/calendar.event.repository';
import { QueryBuilderService } from '../../../../infrastructure/core/services/query-builder.service';

@Injectable()
export class CalendarEventService extends ResourceService<CalendarEventDto> {
  constructor(
    private repository: CalendarEventRepository,
    private readonly queryBuilderService: QueryBuilderService,
  ) {
    super(repository);
  }
}
