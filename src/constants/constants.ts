export const URI_BASE = process.env.NODE_ENV === 'production' ? 'https://apinest.anandaspa.us/' : 'http://localhost:3000/';
// export const URI_BASE = process.env.NODE_ENV === 'production' ? 'https://apinest.anandaspa.us/' : 'https://apinest.anandaspa.us/';
export const URI_HELPER = {
  callback: {
    auth: {
      google: URI_BASE + 'auth/google/callback',
    },
  },
};

export const UI_URI_BASE = process.env.NODE_ENV === 'production' ? 'https://staff.anandaspa.us/' : 'http://localhost:8080/'
// export const UI_URI_BASE = process.env.NODE_ENV === 'production' ? 'https://staff.anandaspa.us/' : 'https://staff.anandaspa.us/'
export const UI_URI_HELPER = {
  AUTH: {
    login: {
      handler: UI_URI_BASE + 'login/handler',
    },
  },
};

// Models Names

export const CLIENT_MODEL_NAME = 'Client';
export const CALENDAR_EVENT_MODEL_NAME = 'CalendarEvent';
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
export const VISIT_RETENTION_MODEL_NAME = 'Retention';

// Connection Strings

export const CONNECTION = {
  ATLAS: {
    URI: 'mongodb+srv://socraticus:Tra21ai*@anandaspa-cluster0-iap7t.gcp.mongodb.net/AnandaSpa_apiNest_DB',
    OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  LOCAL: {
    URI: 'mongodb://localhost:27017/nest',
    // URI: 'mongodb+srv://socraticus:Tra21ai*@anandaspa-cluster0-iap7t.gcp.mongodb.net/AnandaSpa_apiNest_DB',
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
export enum DIRECTORY_NAME {
  GOOGLE = 'GOOGLE',
  YELP = 'YELP',
  GROUPON = 'GROUPON',
  ANANDASPA = 'ANANDA SPA',
}

export const STATUS_VALUES = [STATUS.ACTIVE, STATUS.PENDING, STATUS.CANCELED, STATUS.INACTIVE];

export enum GENDER_OPTIONS {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER',
}
export const GENDER_OPTIONSS_VALUES = [GENDER_OPTIONS.MALE, GENDER_OPTIONS.FEMALE, GENDER_OPTIONS.OTHER];

export enum TREATMENT {
  FACIAL = 'FACIAL',
  MASSAGE = 'MASSAGE',
  HAIR_REMOVERS = 'HAIR_REMOVERS'
}
export const TREATMENT_VALUES = [TREATMENT.FACIAL, TREATMENT.MASSAGE];

export const API_KEY = '95wTvKBBjxP0fbyn40qJwIWS3aIaDPI7' +
  'XgoNNq3U41UdR+r3fKhSWmy1MiRZ064Gcx1aJBK0KIswLQZlIAamMRglarXD3a0PvCRxs8yw2DB' +
  'Xvy7kUzlN8OIR7/NFKTh2gZydktfQMw3Mtm4cR3S5r3CHlTbzlhhvmvnuGXeGbd2Vo+lmytdg' +
  'FulZJAg/VaE//VWNEpFlCzMpqy5fEVDEs8Ay/gZlG4XgEZcEPtpZ+CZgNnUFF2Fa2dgblr/GZ8' +
  'v0QqSr7dFLJL6YMbsDUzvzMOZ76CPaLcqW/1C/3Axo+sutp2ZW3QPQpoFkdlpOs9CyJRmj5UYq0UfqVbyPbvBPuQ==';

//endregion
