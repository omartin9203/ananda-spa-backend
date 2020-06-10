import { HttpService, Injectable } from '@nestjs/common';
import { ResourceService } from '../../../../core/services/resource.service';
import { FacialFormDto } from '../../../dtos/dtos/form/facial/facial-form.dto';
import { FacialFormRepository } from '../../../../../infrastructure/common/repositories/form/facial-form.repository';
import { ClientService } from '../../client/client.service';
import { catchError } from 'rxjs/operators';
import { ParentConsentType } from '../../../dtos/dtos/form/parent-consent/parent-consent.dto';
import { FacialFormInput } from '../../../dtos/inputs/form/facial/facial-form.input';
import { CreateClientInputDto } from '../../../dtos/inputs/client/create-client.input';

@Injectable()
export class FacialFormService extends ResourceService<FacialFormDto> {
    constructor(repository: FacialFormRepository, private httpService: HttpService,
                private clientService: ClientService) {
        super(repository);
    }
    async loadOldForms() {
        const allForms = await this.httpService.get('https://api.anandaspa.us/facial/getall').toPromise();
        const ArrayForms = allForms.data;
        for (const element of ArrayForms) {
          const result = await this.httpService.post('https://api.anandaspa.us/facial/getItem', {body: {id: element._id}}).toPromise();
          const form = result.data;

          // fixing before save
          const fullname = form.fullname.trim().replace(/( )+/, ' ').split(' ');
          const parentName = form.parentname.trim().replace(/( )+/, ' ').split(' ');
          const [city, state, zipcode] = form.citystate.replace(new RegExp(/(\/)|( )/, 'g'), ' ').split(' ');

          const client = await this.clientService.createResource({
            firstname: fullname.slice(0, 1).join('') || '',
            lastname: fullname.slice(1).join(' ') || '',
            phone: form.phone,
            streetaddress: form.address || '',
            city: city || '',
            state: state || '',
            zipcode: zipcode || '',
            email: form.email || '',
            datebirth: form.datebirth,
            imgSrc: null,
            gender: null,
          } as CreateClientInputDto);
          const input: FacialFormInput = {
            clientId: client.id, recommendation: form.recommendation,
            groupon: form.groupon, business: form.business, businessYelp: form.business_yelp,
            businessGoogle: form.business_google, businessGroupon: form.business_groupon, businessClasspass: form.business_classpass,
            businessFacebook: form.business_facebook, businessRecommendation: form.business_recommendation, wearcontact: form.wearcontact,
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
            pictures: form.pictures, consent: form.consent, signature: form.signature,
            parentsConsent: {
              firstname: parentName.slice(0, 1).join('') || '',
              lastname: parentName.slice(1).join(' ') || '',
              signature: form.parentsignature,
            },
          };
          const savedform: FacialFormDto = await this.createResource(input);
          // tslint:disable-next-line:no-console
          console.log(savedform.id);

        }
    }
}
