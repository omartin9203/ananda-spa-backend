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
  unzipEvent(event: any): CalendarEventDto {
    return {
      id : event.id,
      colorId: event.colorId,
      createdAt: new Date(event.created),
      updatedAt: new Date(event.updated),
      description: event.description,
      summary: event.summary,
      end: event.end.dateTime,
      start: event.start.dateTime,
      status: event.status,
    };
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
    return res.data.items.map(this.unzipEvent);
  }

  async getEvent(Id): Promise<CalendarEventDto> {
    const auth = await this.authorize();
    const calendar = await google.calendar({
      version: 'v3',
      auth,
    });
    const { data } = await calendar.events.get({
      calendarId: GOOGLE_CALENDAR_ID,
      eventId: Id,
    });
    return this.unzipEvent(data);
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
    Object.keys(eventupdate).filter(x => eventupdate[x]).forEach(x => event[x] = eventupdate[x]);
    const { data } = await calendar.events.update({
      calendarId: GOOGLE_CALENDAR_ID,
      eventId: Id,
      requestBody: event,
    });
    return this.unzipEvent(data);
  }
  async watchEvent(): Promise<any> {
    const auth = await this.authorize();
    const calendar = await google.calendar({
      version: 'v3',
      auth,
    });
    try {
      const res = await calendar.events.watch({
        calendarId: GOOGLE_CALENDAR_ID,
        requestBody: {
          id: 'aasdf-123-fghj-qwer-5467a-333',
          token: 'token123',
          type: 'web_hook',
          address: 'http://localhost',
        },
      });
      // tslint:disable-next-line:no-console
      console.log(res);

    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }
}
