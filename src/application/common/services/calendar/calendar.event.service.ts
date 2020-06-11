import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { CalendarEventDto } from '../../dtos/dtos/calendar/calendar.event.dto';
import { CalendarEventRepository } from '../../../../infrastructure/common/repositories/calendar.event.repository';
import { QueryBuilderService } from '../../../../infrastructure/core/services/query-builder.service';
import {google} from 'googleapis';
import * as fs from 'fs';
import * as readline from 'readline';
import { GOOGLE_CALENDAR_CREDENTIALS, GOOGLE_CALENDAR_ID, GOOGLE_CALENDAR_TOKEN } from '../../../../constants';

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
  async getGoogleCalendarEvents(start, end) {
    return new Promise((resolve, reject) => {
      // If modifying these scopes, delete token.json.
      const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
      // The file token.json stores the user's access and refresh tokens, and is
      // created automatically when the authorization flow completes for the first
      // time.
      const TOKEN_PATH = 'token.json';

      // Load client secrets from a local file.
      /*fs.readFile('credentials.json', (err, content) => {
        // tslint:disable-next-line:no-console
        if (err) { return console.log('Error loading client secret file:', err); }
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content), listEvents);
      });*/
      authorize(GOOGLE_CALENDAR_CREDENTIALS, listEvents);

      /**
       * Create an OAuth2 client with the given credentials, and then execute the
       * given callback function.
       * @param {Object} credentials The authorization client credentials.
       * @param {function} callback The callback to call with the authorized client.
       */
      function authorize(credentials, callback) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
          client_id,
          client_secret,
          redirect_uris[0],
        );

        // Check if we have previously stored a token.
       /* fs.readFile(TOKEN_PATH, (err, token) => {
          if (err) { return getAccessToken(oAuth2Client, callback); }
          oAuth2Client.setCredentials(JSON.parse(token));
          callback(oAuth2Client);
        });*/
        oAuth2Client.setCredentials(GOOGLE_CALENDAR_TOKEN);
        callback(oAuth2Client);
      }

      /**
       * Lists the next 10 events on the user's primary calendar.
       * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
       */

      /* var start = new Date(2020, 2, 10);
      var end = new Date(); */

      function listEvents(auth) {
        const calendar = google.calendar({
          version: 'v3',
          auth,
        });
        calendar.events.list(
          {
            calendarId: GOOGLE_CALENDAR_ID,
            timeMin: start.toISOString(),
            timeMax: end.toISOString(),
            // maxResults: 300,
            singleEvents: true,
            orderBy: 'startTime',
          },
          (err, res) => {
            if (err) { return reject(err); }
            const events = res.data.items;
            if (events.length) {
              // tslint:disable-next-line:no-console
              console.log('Upcoming events:');
              /*events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                // tslint:disable-next-line:no-console
                console.log(`${start} - ${event.summary} - ${event.colorId}`);
              });*/
              return resolve(events);
            } else {
              // tslint:disable-next-line:no-console
              console.log('No upcoming events found.');
            }
          },
        );
      }
    });
  }
}
