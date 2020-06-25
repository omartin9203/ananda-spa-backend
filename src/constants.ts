import { ServiceAccount } from 'firebase-admin';

export const URI_BASE = process.env.NODE_ENV === 'production' ? 'https://apinest.anandaspa.us/' : 'http://localhost:3000/';
export const URI_HELPER = {
  callback: {
    auth: {
      google: URI_BASE + 'auth/google/callback',
    },
  },
};

export const UI_URI_BASE = process.env.NODE_ENV === 'production' ? 'https://staff.anandaspa.us/' : 'http://localhost:8080/';
export const UI_URI_HELPER = {
  AUTH: {
    login: {
      handler: UI_URI_BASE + 'login/handler',
    },
  },
};

// Models Names

export const CLIENT_MODEL_NAME = 'Client';
export const ADVERTISEMENT_MODEL_NAME = 'Advertisement';
export const USER_MODEL_NAME = 'User';
export const FACIALFORM_MODEL_NAME = 'FacialForm';
export const BASEFORM_MODEL_NAME = 'BaseForm';
export const MASSAGEFORM_MODEL_NAME = 'MassageForm';
export const ROLE_MODEL_NAME = 'Role';
export const DEPARTMENT_MODEL_NAME = 'Department';
export const DIAGNOSTIC_MODEL_NAME = 'Diagnostic';
export const VISIT_MODEL_NAME = 'Visit';
export const FILE_MODEL_NAME = 'files';

// Connection Strings

export const CONNECTION = {
  ATLAS: {
    URI: 'mongodb+srv://socraticus:Tra21ai*@anandaspa-cluster0-iap7t.gcp.mongodb.net/AnandaSpa_apiNest_DB',
    OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  LOCAL: {
    URI: 'mongodb://localhost:27017/nest',
    OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true },
  },
};

//region SETTINGS

export enum SELECT_TYPES {
  ONE = 'One',
  MULTIPLE = 'Multiple',
}

export const DIAGNOSTIC_SETTINGS = {
  TYPES_OF_KIND: {
    select_type: SELECT_TYPES.ONE,
    options: ['Normal/Combo', 'Oily', 'Dry'],
  },
  Fitzpatrick_classification: {
    select_type: SELECT_TYPES.ONE,
    options: ['Type I', 'Type II', 'Type III', 'Type IV', 'Type V', 'Type VI'],
  },
  Conditions_and_concerns: {
    select_type: SELECT_TYPES.MULTIPLE,
    options: [
      'Acne/blemishes', 'Rosacea', 'Open comedones', 'Closed comedone', 'Millia',
      'Acne scars', 'Hyperpigmentation', 'Hypopigmentation', 'Telangiectasia',
      'Deep lines/wrinkles', 'Muscle tone', 'Dehydrated', 'Sensitive', 'Mature',
    ],
  },
  Texture: {
    select_type: SELECT_TYPES.ONE,
    options: ['Rough', 'Smooth', 'Uneven', 'Flaky', 'Saggy'],
  },
  Products_used_today: {
    select_type: SELECT_TYPES.MULTIPLE,
    options: ['Cleanser', 'Toner', 'Exfoliator', 'Mask', 'Serum', 'Eye cream',
      'Lip treatment', 'Moisturizer/Sunscreen'],
  },
};

export enum PROVIDER {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  LOCAL = 'local',
}

export enum STATUS {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  INACTIVE = 'INACTIVE',
}
export const STATUS_VALUES = [STATUS.ACTIVE, STATUS.PENDING, STATUS.CANCELED, STATUS.INACTIVE];

export enum GENDER_OPTIONS {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER',
}
export const GENDER_OPTIONSS_VALUES = [GENDER_OPTIONS.MALE, GENDER_OPTIONS.FEMALE, GENDER_OPTIONS.OTHER];
export const API_KEY = '95wTvKBBjxP0fbyn40qJwIWS3aIaDPI7' +
  'XgoNNq3U41UdR+r3fKhSWmy1MiRZ064Gcx1aJBK0KIswLQZlIAamMRglarXD3a0PvCRxs8yw2DB' +
  'Xvy7kUzlN8OIR7/NFKTh2gZydktfQMw3Mtm4cR3S5r3CHlTbzlhhvmvnuGXeGbd2Vo+lmytdg' +
  'FulZJAg/VaE//VWNEpFlCzMpqy5fEVDEs8Ay/gZlG4XgEZcEPtpZ+CZgNnUFF2Fa2dgblr/GZ8' +
  'v0QqSr7dFLJL6YMbsDUzvzMOZ76CPaLcqW/1C/3Axo+sutp2ZW3QPQpoFkdlpOs9CyJRmj5UYq0UfqVbyPbvBPuQ==';

// Google Calendar
export const GOOGLE_CALENDAR_CREDENTIALS = {
    installed: {
      client_id: '807432464392-4k90ct4qa9flj4klcjcq7u69ap089mo4.apps.googleusercontent.com',
      project_id: 'quickstart-1564686105986',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_secret: 'Y7cxcOS49Ycvz73A5Nmmhbuv',
      redirect_uris: ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost'],
  },
};

export const GOOGLE_CALENDAR_TOKEN = {
  access_token: 'ya29.a0AfH6SMAoIk1A282q0BGT6_kL3Gse62YwCtLNlWXuNy76kkZKITKGsWs1VSCBnAUVD7ZrYv7U1B6mFrX' +
    'DkVNqf8H3Wb63A7m65QOKEzoB68Mka4FCRGaACHoJabWqx6_9LNk0cXI713V3U4ucWb6FWGGsFydM3D3B8PE',
  refresh_token: '1//05t9m3u7N85MhCgYIARAAGAUSNwF-L9IrffRtMDkV80LTIuNG6VPGpRWJKoCK5yfg65aFeb2HlJTaZeBoUqQrRc57HwMfkGhV5nU',
  scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar',
  token_type: 'Bearer',
  expiry_date: 1591995297211,
};

export const GOOGLE_CALENDAR_ID = 'ph60s613mi84rsmkcgq397v38s@group.calendar.google.com';
export const GOOGLE_FIREBASE_CREDENTIALS: ServiceAccount = {
    projectId: 'ananda-spa-staff',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLCQ+YhSzHRC+K\n' +
      '4QrZdCDICRi+/s8NGRpX6r3bSTe2LHmOCk1WDrA56vOYMieIFgPeZWqFKuNuD8Yw\ndi4ym6Ftev+cmW2f0DBszODh4nyDaLtgEaZ4XdwI' +
      'RZ/GSyLwjKOsDtrn8g4YkikI\nvIaOZZjKYb6doCIdTXO9dblTOHqTk8S+WAwN7bfbDLr/cq+HM/GL7h2q8C6adPJN\nuvCGqfOpNFHt6Qh' +
      'hVawokXc4C3+5AFDb+NX3hro/Cmalt6LGSlRwtxYJu8lmKRSy\nbwuly6vOdMXXH/oTOufce6ndlg98CLRpgkGPscEGAbm4RL7qgXONFttW' +
      'li84d+qj\nk58N6JydAgMBAAECggEAAPu3U8XrLl22UsTHnqvSYSCyw/tCFIR3X7t4X5pqtZOb\nt2awwX9SQGRSvkvyWHLVTpQbxVaPEK' +
      'LFsKHGzzDbS72DXdoDcW91wETUgVwogtOj\netHuwTk+OALOTtGIfQPlChmo7qjIqtiQg9juf7wyORPDfVPullzRgeewgjo0kDl3\n/3RB' +
      'papvhcI6OA+5BGba+AJI2WjWQb/1rpRWcLNSlyem4WkBCsEaXh0e+eX7duU6\nk6Uo4zzslmNlJ0ywP8PWd1LDED2GHY56iwbfzHBp7KEt' +
      'tblQ6qv5uQWospbaJFZe\nIdu8qwRHBUqMpRVlGjCPvXQotzbc3HRdAawmjJmTqQKBgQDro87MepPVqiFvn55z\nUmWdpDQPV+NendRxTIC' +
      'fp0/3VpCZNdcJM2+ljb4Okdo4bABWDu4yHWPEuHxybKIu\niJnXLf2l+vwnUGn8VpA45YX6XmkrIBc0y6OELgSbFwGEiIuqMpNaAABBQd' +
      'im1wK4\nByiTpyaX91bvy3i8ANMX8oOUDwKBgQDclBB88HoOtQea7pSy/DL6HFK9iibEt7Sx\nVnZsFGfV13hC2C3M/kEyS9HowfXbQQY' +
      '822aIukXYbCMb3kChKyE5z7GuKdK0UtEC\nDIzA8H8aMplqNkTPdwTkTczoG3MRn5BkPxrHznclZ1CWF5PmthOwPCOf1DuWl5Ct\n7KVM' +
      'DgPokwKBgQDPsgmj9+L4MEXaYmHCGf1RDpuIbpoNGqZW2uyATHPSea1oLamF\nBZ5B2QaNRweGNcOyFuTirT7z9PxTyubEh0i5/mKU+v1' +
      'oFZvle9MRI1WNEcw248kw\nktFkvz72CDghPk2ETaHNcTTIUCaLH/bYiA6+3lTJG4y4PasEYuGtOOe7BwKBgBWS\n/dHai3WoyyeiMjU' +
      'Xab0AzC7xtj0DYs79j/OeQ1GtE3wmPMSSEbpjpBJJ9kwNnhiR\ntQOmhHJYkU6GfHfHCibnY4+PU6aDeyHiLFoqq6PaUxsKV8ya7YWO/n' +
      '2tQaH1o1/K\ntEnardigtEcZ40Nrh51zJGDbl0Bxbps0TC6WKFe1AoGBAM/oi822Wh+tT+38edR8\nQcPtGqkZ3S7ZN1FWR8go5K/VdD9a' +
      '+sdax3ICAHlB4U1nN+/nIHwC4pmYbWJiaKha\nfL0XPmeN9qw6iDxK87WL+TN34Tzof82eCXGHV+QXP5UolmtJKhqb1qiBsVdsa+sH\n79' +
      'EEOM4Avr9ydP0wqKUDpVNq\n-----END PRIVATE KEY-----\n',
    clientEmail: 'firebase-adminsdk-h73if@ananda-spa-staff.iam.gserviceaccount.com',
    };
export const GOOGLE_FIREBASE_DATABASE_URL = 'https://ananda-spa-staff.firebaseio.com';
export const YELP_BEARER_API_TOKEN = 'h35r9qU1NUhyIMfq94zD3y4G6L9nhBdFh9gWSak4F2Z2OG8hMW' +
  'Slb76YZtds-H9l73NFcL-pMZM25P4OIAbWuV4-Ot7xBYNQH2dMCeiTEJ629n45-t-Pnbop_CzyXnYx';

// NodeMailer
export const NODEMAILER_HOST = 'smtp.gmail.com';
export const NODEMAILER_TYPE = 'OAuth2';
export const NODEMAILER_USER = 'contact@anandaspamiami.com';
export const NODEMAILER_CLIENTID = '639665884326-5jvmtdhs4ifha6e9j3eanovdsf3bjuji' +
  '.apps.googleusercontent.com';
export const NODEMAILER_CLIENTSECRET = 'Bq3rWlreKARYKuE4lPKtOooA';
export const NODEMAILER_REFRESHTOKEN = '1/_eim3SumpBsCquSqJgjqEtqQq6wcS7XzhfMUiXmXyMs';
export const MAILER_FROM_DEFAULT = '"Ananda Spa" <contact@anandaspamiami.com>';
export const MAILER_TEMPLATE_ROUTE = '/templates';
export const MAILER_TRANSPORT = {
  host: NODEMAILER_HOST,
  port: 465,
  secure: true,

  auth: {
    type: NODEMAILER_TYPE,
    user: NODEMAILER_USER,
    clientId: NODEMAILER_CLIENTID,
    clientSecret: NODEMAILER_CLIENTSECRET,
    refreshToken: NODEMAILER_REFRESHTOKEN,
  },
};

// endregion
