import { Injectable, Logger } from '@nestjs/common';
import { Cron, NestSchedule, Interval } from 'nest-schedule';
import { ReviewService } from '../review/review.service';
import { VisitRetentionService } from '../visit/visitRetention.service';

@Injectable()
export class TasksService extends NestSchedule {
  constructor(readonly reviewService: ReviewService,
              readonly visitRetentionService: VisitRetentionService) {
    super();
  }
  private readonly logger = new Logger(TasksService.name);
  @Cron('0 18 1 * * *')
  handleGrouponCron() {
    this.logger.debug('Running grouponScrape cron job...');
    this.reviewService.grouponScrape();
  }

  @Cron('0 21 1 * * *')
  handleYelpCron() {
    this.logger.debug('Running yelpScrape cron job...');
    this.reviewService.yelpScrape();
  }

  @Cron('0 23 1 * * *')
  handleGoogleCron() {
    this.logger.debug('Running googleScrape cron job...');
    this.reviewService.googleScrape();
  }
  @Cron('0 1 0 * * *')
  handleRetentionCron() {
    this.logger.debug('Running Load Retention cron job...');
    this.visitRetentionService.loadRetentionEventsFromCalendar();
  }
}
