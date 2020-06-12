import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { CalendarEventDto } from '../../dtos/dtos/calendar/calendar.event.dto';
import { CalendarEventRepository } from '../../../../infrastructure/common/repositories/calendar.event.repository';
import { QueryBuilderService } from '../../../../infrastructure/core/services/query-builder.service';
import {google} from 'googleapis';
import { GOOGLE_CALENDAR_CREDENTIALS, GOOGLE_CALENDAR_ID, GOOGLE_CALENDAR_TOKEN } from '../../../../constants';
import { CalendarEventUpdateDto } from '../../dtos/dtos/calendar/calendar.event.update.dto';

@Injectable()
export class CalendarEventService extends ResourceService<CalendarEventDto> {
  constructor(
    private repository: CalendarEventRepository,
    private readonly queryBuilderService: QueryBuilderService,
  ) {
    super(repository);
  }
  async authorize() {
    const { client_secret, client_id, redirect_uris } = GOOGLE_CALENDAR_CREDENTIALS.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );
    oAuth2Client.setCredentials(GOOGLE_CALENDAR_TOKEN);
    return oAuth2Client;
  }
  async getEvents(start: Date, end: Date): Promise<CalendarEventDto[]> {
    const auth = await this.authorize();
    const calendar = await google.calendar({
      version: 'v3',
      auth,
    });
    const res = await calendar.events.list({
        calendarId: GOOGLE_CALENDAR_ID,
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        // maxResults: 300,
        singleEvents: true,
        orderBy: 'startTime',
      });
    const events = res.data.items.map(x => ({
      id: x.id,
      colorId: x.colorId,
      createdAt: new Date(x.created),
      updatedAt: new Date(x.updated),
      description: x.description,
      summary: x.summary,
      end: x.end.dateTime,
      start: x.start.dateTime,
      status: x.status,
    } as CalendarEventDto));
    return events;
  }

  async getEvent(Id): Promise<CalendarEventDto> {
    const auth = await this.authorize();
    const calendar = await google.calendar({
      version: 'v3',
      auth,
    });
    const res = await calendar.events.get({
      calendarId: GOOGLE_CALENDAR_ID,
      eventId: Id,
    });
    const event = {
      id : res.data.id,
      colorId: res.data.colorId,
      createdAt: new Date(res.data.created),
      updatedAt: new Date(res.data.updated),
      description: res.data.description,
      summary: res.data.summary,
      end: res.data.end.dateTime,
      start: res.data.start.dateTime,
      status: res.data.status,
    } as CalendarEventDto;

    return event;
  }
  async updateEvent(Id, eventupdate: CalendarEventUpdateDto): Promise<CalendarEventDto> {
    const auth = await this.authorize();
    const calendar = await google.calendar({
      version: 'v3',
      auth,
    });
    const res = await calendar.events.get({
      calendarId: GOOGLE_CALENDAR_ID,
      eventId: Id,
    });
    const event = res.data;
    event.summary = eventupdate.summary;
    event.colorId = eventupdate.colorId;

    const resupdate = await calendar.events.update({
      calendarId: GOOGLE_CALENDAR_ID,
      eventId: Id,
      requestBody: event,
    });
    const eventupdated = {
      id : resupdate.data.id,
      colorId: resupdate.data.colorId,
      createdAt: new Date(resupdate.data.created),
      updatedAt: new Date(resupdate.data.updated),
      description: resupdate.data.description,
      summary: resupdate.data.summary,
      end: resupdate.data.end.dateTime,
      start: resupdate.data.start.dateTime,
      status: resupdate.data.status,
    } as CalendarEventDto;

    return eventupdated;
  }
}
