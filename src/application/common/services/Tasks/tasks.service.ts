import { Injectable, Logger } from '@nestjs/common';
import { Cron, NestSchedule, Interval } from 'nest-schedule';

@Injectable()
export class TasksService extends NestSchedule {
  private readonly logger = new Logger(TasksService.name);

  @Cron('5 * * * * *')
  handleCron() {
    this.logger.debug('Called cron when the current second is 5');
  }
  // @Interval(5000)
  // handleInterval() {
  //   this.logger.debug('Called Interval when the current second is 5');
  // }
}
