import { Schema } from 'mongoose';

export const MassageFormSchema: Schema = new Schema({
    occupation: { type: String, required: false },
    emergencyname: { type: String, required: false },
    emergencyphone: { type: String, required: false },
    havepro: { type: Boolean, required: false },
    howofter: { type: String, required: false },
    difficulty: { type: Boolean, required: false },
    qtTwoExplain: { type: String, required: false },
    allergies: { type: Boolean, required: false },
    qtThreeExplain: { type: String, required: false },
    sensitive: { type: Boolean, required: false },
    contactlenses: { type: Boolean, required: false },
    dentures: { type: Boolean, required: false },
    hearing: { type: Boolean, required: false },
    workstation: { type: Boolean, required: false },
    qtSixExplain: { type: String, required: false },
    repetitive: { type: Boolean, required: false },
    qtSevenExplain: { type: String, required: false },
    experience: { type: Boolean, required: false },
    muscle: { type: Boolean, required: false },
    anxiety: { type: Boolean, required: false },
    insomnia: { type: Boolean, required: false },
    irritability: { type: Boolean, required: false },
    other: { type: String, required: false },
    particular: { type: Boolean, required: false },
    qtNitghExplain: { type: String, required: false },
    goals: { type: Boolean, required: false },
    qtTenExplain: { type: String, required: false },
    arms: { type: Boolean, required: false },
    legs: { type: Boolean, required: false },
    feet: { type: Boolean, required: false },
    shoulder: { type: Boolean, required: false },
    hip: { type: Boolean, required: false },
    uperback: { type: Boolean, required: false },
    lowerback: { type: Boolean, required: false },
    calves: { type: Boolean, required: false },
    medical: { type: Boolean, required: false },
    qtElevenExplain: { type: String, required: false },
    chiropractor: { type: Boolean, required: false },
    qtTweleExplain: { type: String, required: false },
    medication: { type: Boolean, required: false },
    qtTreceExplain: { type: String, required: false },
    contContagious: { type: Boolean, required: false },
    contSores: { type: Boolean, required: false },
    contBruising: { type: Boolean, required: false },
    accident: { type: Boolean, required: false },
    fracture: { type: Boolean, required: false },
    surgery: { type: Boolean, required: false },
    artificial: { type: Boolean, required: false },
    sprains: { type: Boolean, required: false },
    fever: { type: Boolean, required: false },
    swollen: { type: Boolean, required: false },
    sensitivity: { type: Boolean, required: false },
    heart: { type: Boolean, required: false },
    blood: { type: Boolean, required: false },
    circulatory: { type: Boolean, required: false },
    varicose: { type: Boolean, required: false },
    rheumatoid: { type: Boolean, required: false },
    atherosclerosis: { type: Boolean, required: false },
    phlebitis: { type: Boolean, required: false },
    thrombosis: { type: Boolean, required: false },
    osteoporosis: { type: Boolean, required: false },
    epilepsy: { type: Boolean, required: false },
    migraines: { type: Boolean, required: false },
    cancer: { type: Boolean, required: false },
    diabetes: { type: Boolean, required: false },
    sensation: { type: Boolean, required: false },
    neck: { type: Boolean, required: false },
    fibromyalgia: { type: Boolean, required: false },
    tmj: { type: Boolean, required: false },
    carpal: { type: Boolean, required: false },
    tennis: { type: Boolean, required: false },
    pregnancy: { type: Boolean, required: false },
    manymonth: { type: String, required: false },
    conditionexplain: { type: String, required: false },
    anything: { type: String, required: false },
    signature: { type: String, required: false },
    datecreated: { type: Date, required: false },
    dateinitial: { type: String, required: false },
    parentsConsent: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      signature: { type: String, required: true },
    },
  },
  { discriminatorKey: 'type' },
);
