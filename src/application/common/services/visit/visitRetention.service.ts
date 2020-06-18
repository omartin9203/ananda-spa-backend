import { Injectable, Logger } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { VisitRetentionRepository } from '../../../../infrastructure/common/repositories/visitRetention.repository';
import { VisitRetentionDto } from '../../dtos/dtos/visitRetention/visitRetention.dto';
import { FLAG_RETENTION } from '../../../../constants/modules/enums';
import { UserService } from '../user/user.service';
import { VisitRetentionInput } from '../../dtos/inputs/visitRetention/visitRetention.input';
import { VisitRetentionUpdate } from '../../dtos/inputs/visitRetention/visitRetention.update';
import { CalendarEventUpdateDto } from '../../dtos/dtos/calendar/calendar.event.update.dto';
import { CalendarEventService } from '../calendar/calendar.event.service';
import { IParserTreatmentResponse, RetentionParserService } from './retention-parser.service';
import { CalendarEventDto } from '../../dtos/dtos/calendar/calendar.event.dto';
import { RetentionPerformanceDto } from '../../dtos/dtos/visitRetention/retention-performance.dto';
import { ColorSettingService } from '../settings/color-setting.service';

@Injectable()
export class VisitRetentionService extends ResourceService<VisitRetentionDto> {
    constructor(
      readonly repository: VisitRetentionRepository,
      readonly userService: UserService,
      readonly parserService: RetentionParserService,
      readonly calendarService: CalendarEventService,
      readonly colorSettingService: ColorSettingService,
    ) {
        super(repository);
    }

    //region OVERRIDE METHODS
    async createResource(input: VisitRetentionInput): Promise<VisitRetentionDto> {
        await this.userService.updateRetention(input.userId, {
            important: Number(input.flag !== FLAG_RETENTION.NORMAL),
            total: 1,
        });
        return await this.repository.create(input);
    }

    async deleteResource(id: string): Promise<VisitRetentionDto> {
        const item = await this.repository.getOne(id) as { flag: FLAG_RETENTION, userId: string, calendarId?: string};
        await this.userService.updateRetention(item.userId, {
            important: -Number(item.flag !== FLAG_RETENTION.NORMAL),
            total: -1,
        });
        if (item.calendarId) {
            await this.calendarService.deleteEvent(item.calendarId);
        }
        return await this.repository.deleteOne(id);
    }

    async updateResource(id: string, input: VisitRetentionUpdate) {
        if (input.flag) {
            await this.updateFlag(id, input.flag);
        }
        return await this.repository.updateOne(id, VisitRetentionUpdate.getUnzip(input));
    }

    async updateRetentionAndEvent(id: string, input: VisitRetentionUpdate) {
        const entity: VisitRetentionDto = await this.updateResource(id, input);
        if (entity.calendarId) {
            const eventUpdate: CalendarEventUpdateDto = {};
            eventUpdate.summary = Object.keys(input).filter(x => x !== 'userId').length
              ? (await this.parserService.buildSummary(entity)).data
              : undefined;
            if (input.userId) {
                const colorId = (await this.userService.findResource(input.userId)).colorId;
                eventUpdate.colorId = (await this.colorSettingService.findResource(colorId)).colorId;
            }
            if (Object.keys(eventUpdate).filter(x => eventUpdate[x]).length) {
                await this.calendarService.updateEvent(entity.calendarId, eventUpdate);
            }
        }
        return entity;
    }
    //endregion

    async updateFlag(id: string, flag: FLAG_RETENTION) {
        const prev = await this.repository.getOne(id) as { flag: FLAG_RETENTION, userId: string };
        if (prev.flag !== flag) {
            await this.userService.updateRetention(prev.userId,
              { important: prev.flag === FLAG_RETENTION.NORMAL ? 1 : flag === FLAG_RETENTION.NORMAL ? -1 : 0 });
        }
    }

    async getPerformanceRetention(filter: any = {}, sort: string = '-date', skip = 0, limit = 10, withItems = true)
      : Promise<RetentionPerformanceDto> {
        return await this.repository.getPerformanceRetention(filter, sort, skip, limit, withItems);
    }

    async syncRetention(entityId: string, eventId: string): Promise<VisitRetentionDto> {
        if (!eventId) { throw new Error('Enter event id'); }
        const event = await this.calendarService.getEvent(eventId);
        if (!event) { throw new Error('There is no event with that id'); }
        const update = await this.getInfoFromSummary(event.summary);
        const colorSettingId = (await this.colorSettingService.findOne({colorId: event.colorId})).id;
        const userId = (await this.userService.getUserByColor(colorSettingId)).id;
        const input: VisitRetentionUpdate = {
            ...update,
            userId,
            date: new Date(event.start),
        };
        return await this.updateResource(entityId, VisitRetentionUpdate.getUnzip(input));
    }
    async getInfoFromSummary(summary: string) {
        const parserResponse = await this.parserService.parserSummary(summary);
        if (parserResponse.classification === 'availability') {
            throw new Error('The classification of the calendar event was not of the treatment type');
        }
        const treatment = parserResponse.response as IParserTreatmentResponse;
        return {
            amount: treatment.amount ?? null,
            tip: treatment.tip ?? null,
            directoryId: treatment.directoryId,
            flag: treatment.flag,
            client: {
                name: treatment.client.name,
                phone: treatment.client.phone ?? null,
            },
            otherInfo: treatment.otherInfo,
            serviceId: treatment.serviceId ?? null,
        };
    }

    async updateRetentionFromSummary(id: string, summary: string) {
        const input = await this.getInfoFromSummary(summary);
        return await this.updateResource(id, input);
    }
    async createRetentionFromEvent(event: CalendarEventDto) {
        try {
            const info = await this.getInfoFromSummary(event.summary);
            const colorSettingId = (await this.colorSettingService.findOne({colorId: event.colorId})).id;
            const userId = (await this.userService.getUserByColor(colorSettingId)).id;
            const input: VisitRetentionInput = {
                ...info,
                userId,
                date: new Date(event.start),
                calendarId: event.id,
            };
            return await this.createResource(input);
        } catch (e) {
            Logger.debug(e, 'error create retention');
            return null;
        }
    }
    async loadRetentionEventsFromCalendar() {
        try {
            const startDate = new Date();
            startDate.setHours(7, 0, 0);
            startDate.setDate(startDate.getDate() - 1);
            const endDate = new Date();
            const events = await this.calendarService.getEvents(startDate, endDate);
            for (const event of events) {
                 await this.createRetentionFromEvent(event);
            }
        } catch (e) {
           Logger.debug(e);
        }
    }
}
