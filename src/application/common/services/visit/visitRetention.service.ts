import { Injectable, Logger } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { VisitRetentionRepository } from '../../../../infrastructure/common/repositories/visitRetention.repository';
import { VisitRetentionDto } from '../../dtos/dtos/visitRetention/visitRetention.dto';
import { FLAG_RETENTION } from '../../../../constants/modules/enums';
import { UserService } from '../user/user.service';
import { RetentionPerformanceDto } from '../../dtos/dtos/visitRetention/retention-performance.dto';
import { VisitRetentionInput } from '../../dtos/inputs/visitRetention/visitRetention.input';
import { VisitRetentionUpdate } from '../../dtos/inputs/visitRetention/visitRetention.update';
import { CalendarEventUpdateDto } from '../../dtos/dtos/calendar/calendar.event.update.dto';
import { CalendarEventService } from '../calendar/calendar.event.service';
import { IParserTreatmentResponse, RetentionParserService } from './retention-parser.service';
import { CalendarEventDto } from '../../dtos/dtos/calendar/calendar.event.dto';

@Injectable()
export class VisitRetentionService extends ResourceService<VisitRetentionDto> {
    constructor(
      readonly repository: VisitRetentionRepository,
      readonly userService: UserService,
      readonly parserService: RetentionParserService,
      readonly calendarService: CalendarEventService,
    ) {
        super(repository);
    }
    async createResource(input: VisitRetentionInput): Promise<VisitRetentionDto> {
        await this.userService.updateRetention(input.userId, {
            important: Number(input.flag !== FLAG_RETENTION.NORMAL),
            total: 1,
        });
        return await this.repository.create(input);
    }
    async deleteResource(id: string): Promise<VisitRetentionDto> {
        const item = await this.repository.getOne(id) as { flag: FLAG_RETENTION, userId: string };
        await this.userService.updateRetention(item.userId, {
            important: -Number(item.flag !== FLAG_RETENTION.NORMAL),
            total: -1,
        });
        return await this.repository.deleteOne(id);
    }
    async updateRetention(id: string, input: VisitRetentionUpdate) {
        if (input.flag) {
            await this.updateFlag(id, input.flag);
        }
        const entity: VisitRetentionDto = await this.updateResource(id, VisitRetentionUpdate.getUnzip(input));
        if (entity.calendarId) {
            const eventUpdate: CalendarEventUpdateDto = {};
            eventUpdate.summary = Object.keys(input).filter(x => x !== 'userId').length
              ? (await this.parserService.buildSummary(entity)).data
              : undefined;
            // todo: Update colorId ( userService.get(userId).colorId )
            if (Object.keys(eventUpdate).filter(x => eventUpdate[x]).length) {
                await this.calendarService.updateEvent(entity.calendarId, eventUpdate);
            }
        }
        const result = await this.parserService.buildSummary(entity);
        Logger.log(result.data ?? result.error, result.success ? 'SUMMARY' : 'ERROR');
        return entity;
    }

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
        // todo: update userId from colorId
        const input: VisitRetentionUpdate = {
            ...update,
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
        return await this.updateResource(id, VisitRetentionUpdate.getUnzip(input));
    }
    async createRetentionFromEvent(event: CalendarEventDto) {
        try {
            const info = await this.getInfoFromSummary(event.summary);
            const userId = ' '; // todo: take userId
            const input: VisitRetentionInput = {
                ...info,
                userId,
                date: new Date(event.start),
                calendarId: event.id,
            };
            return await this.createResource(input);
        } catch (e) {
            return null;
        }
    }
}
