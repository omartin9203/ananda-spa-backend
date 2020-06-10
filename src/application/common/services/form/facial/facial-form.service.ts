import { HttpService, Injectable } from '@nestjs/common';
import { ResourceService } from '../../../../core/services/resource.service';
import { FacialFormDto } from '../../../dtos/dtos/form/facial/facial-form.dto';
import { FacialFormRepository } from '../../../../../infrastructure/common/repositories/form/facial-form.repository';
import { ClientService } from '../../client/client.service';
import { CreateClientInputDto } from '../../../dtos/inputs/client/create-client.input';

@Injectable()
export class FacialFormService extends ResourceService<FacialFormDto> {
    constructor(repository: FacialFormRepository, private httpService: HttpService,
                private clientService: ClientService, private clientInput: CreateClientInputDto) {
        super(repository);
    }
    async loadOldForms() {
    const allForms = await this.httpService.get('https://api.anandaspa.us/facial/getall').toPromise();
    const ArrayForms = allForms.data;
    }
}
