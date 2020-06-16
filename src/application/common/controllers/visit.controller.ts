import { Body, Controller, Get, Headers, Logger, NotImplementedException, Param, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import { VisitRetentionService } from '../services/visit/visitRetention.service';
import { VisitRetentionInput } from '../dtos/inputs/visitRetention/visitRetention.input';
import { UserService } from '../services/user/user.service';
import { UserDto } from '../dtos/dtos/user/user.dto';
import { API_KEY } from '../../../constants/constants';
import { FLAG_RETENTION } from '../../../constants/modules/enums';
import { RetentionParserService } from '../services/visit/retention-parser.service';
import { CalendarEventService } from '../services/calendar/calendar.event.service';

@Controller('visit')
export class VisitsController {
    constructor(readonly parserService: RetentionParserService, readonly userService: UserService,
                readonly calendarEventService: CalendarEventService,
                readonly visitRetentionService: VisitRetentionService) {}
    private readonly logger = new Logger(VisitsController.name);
    @Post('retention')
    async saveVisitRetention(
        @Body() event: any,
        @Req() req: any,
    ) {
       try {
           this.logger.debug(req.body);
           const calendarEvent = await this.calendarEventService.getEvent(req.body.id);
           await this.visitRetentionService.createRetentionFromEvent(calendarEvent);
       } catch (e) {
           this.logger.debug(e);
       }
    }

    @Get('retention/parser')
    async parser(@Query('text') text: string) {
        const result = await this.parserService.parserSummary(text);
        if (!result) { return new NotImplementedException('No exist setting'); }
        return result;
    }
}
