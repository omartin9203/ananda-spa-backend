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

//endregion
