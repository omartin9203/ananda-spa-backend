import { HttpService, Injectable } from '@nestjs/common';
import { ResourceService } from '../../../../core/services/resource.service';
import { FacialFormDto } from '../../../dtos/dtos/form/facial/facial-form.dto';
import { FacialFormRepository } from '../../../../../infrastructure/common/repositories/form/facial-form.repository';
import { ClientService } from '../../client/client.service';
import { catchError } from 'rxjs/operators';
import { ParentConsentType } from '../../../dtos/dtos/form/parent-consent/parent-consent.dto';

@Injectable()
export class FacialFormService extends ResourceService<FacialFormDto> {
    constructor(repository: FacialFormRepository, private httpService: HttpService,
                private clientService: ClientService, private  parentConsent: ParentConsentType) {
        super(repository);
    }
    async loadOldForms() {
        const allForms = await this.httpService.get('https://api.anandaspa.us/facial/getall').toPromise();
        const ArrayForms = allForms.data;
        for (const element of ArrayForms) {
          const result = await this.httpService.post('https://api.anandaspa.us/facial/getItem', {body: {id: element._id}}).toPromise();
          const form = result.data;

          // fixing before save
          const fullname = form.fullname.split(' ');
          let name = ' ';
          let lastname = ' ';
          let address = ' ';
          const stateV1 = form.citystate.split('/');
          const stateV2 = form.citystate.split(' ');
          let state = ' ';
          let city = ' ';
          let zip = ' ';
          let email = ' ';

          if (fullname.length === 1) {
            name = fullname[0];
          }
          if (fullname.length === 2) {
            name = fullname[0];
            if (fullname[1] !== '') {
            lastname = fullname[1];
            }
          }
          if (fullname.length === 3) {
            name = fullname[0];
            lastname = fullname[1] + ' ' + fullname[2];
          }
          if (fullname.length === 4) {
            name = fullname[0] + ' ' + fullname[1];
            lastname = fullname[2] + ' ' + fullname[3];
          }

          if (stateV1.length === 3) {
            if (stateV1[0]) {
              city = stateV1[0];
            }
            if (stateV1[1]) {
              state = stateV1[1];
            }
            if (stateV1[2]) {
              zip = stateV1[2];
            }

          } else if (stateV2.length === 3) {
            if (stateV2[0]) {
              city = stateV2[0];
            }
            if (stateV2[1]) {
              state = stateV2[1];
            }
            if (stateV2[2]) {
              zip = stateV2[2];
            }
          }

          if (form.email) {
            email = form.email;
          }
          if (form.address) {
            address = form.address;
          }

          const client = await this.clientService.createResource({firstname: name, lastname,
            phone: form.phone, streetaddress: address, city, state, zipcode: zip, email,
            datebirth: form.datebirth, imgSrc: null, gender: null});

          // tslint:disable-next-line:no-console
          console.log(client.id);

          await this.createResource({client, recommendation: form.recommendation,
            groupon: form.groupon, business: form.business, businessYelp: form.businessYelp,
            businessGoogle: form.businessGoogle, businessGroupon: form.businessGroupon,
            businessRecommendation: form.businessRecommendation, wearcontact: form.wearcontact,
            surgery: form.surgery, surgerydescribe: form.surgerydescribe, skincancer: form.skincancer,
            dermatitis: form.dermatitis, keloidscarring: form.keloidscarring, acne: form.acne,
            rosacea: form.rosacea, broken: form.broken, treatment: form.treatment, hypo: form.hypo,
            hyperpig: form.hyperpig, burns: form.burns, anycondition: form.anycondition,
            anyconditiondescription: form.anyconditiondescription, allergies: form.allergies,
            latexallergies: form.latexallergies, otherallergies: form.otherallergies,
            otherallergiesdescription: form.otherallergiesdescription, prescription: form.prescription,
            prescriptiondescription: form.prescriptiondescription, pregnant: form.pregnant,
            technician: form.technician, techniciandescription: form.techniciandescription,
            appointment: form.appointment, oftenfacials: form.oftenfacials, oftenbody: form.oftenbody,
            cosmetic: form.cosmetic, finelines: form.finelines, wrinkles: form.wrinkles,
            dull: form.dull, loss: form.loss, dry: form.dry, oily: form.oily, pores: form.pores,
            redness: form.redness, sensit: form.sensit, dark: form.dark, pimples: form.pimples,
            skin: form.skin, other: form.other, otherextradescription: form.otherextradescription,
            routine: form.routine, cleanser: form.cleanser, toner: form.toner,
            moisturizer: form.moisturizer, spf: form.spf, vitamin: form.vitamin, scrubs: form.scrubs,
            speciality: form.speciality, mask: form.mask, supplements: form.supplements,
            exercise: form.exercise, scar: form.scar, skinsensitive: form.skinsensitive,
            pictures: form.pictures, signature: form.signature});

        }
    }
}
