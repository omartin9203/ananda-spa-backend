import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { ClientDto } from '../../dtos/dtos/client/client.dto';
import { ClientRepository } from '../../../../infrastructure/common/repositories/client.repository';
import { IPaginatedResponseClass } from '../../../../infrastructure/core/models/interfaces/paginate.interface';
import { QueryBuilderService } from '../../../../infrastructure/core/services/query-builder.service';
import { Operators } from '../../../../infrastructure/core/utils/query/operators.enum';

@Injectable()
export class ClientService extends ResourceService<ClientDto> {
    constructor(
      private repository: ClientRepository,
      private readonly queryBuilderService: QueryBuilderService,
    ) {
        super(repository);
    }
    async filterClients( query: string = '', skip?: number, limit?: number ): Promise<IPaginatedResponseClass<ClientDto>> {
        // const regex = new RegExp(query, 'si');
        // Logger.log(regex, 'ClientService:::Regex');
        // const filter = [
        //     {firstname: regex},
        //     {lastname: regex},
        //     {phone: regex},
        //     {email: regex},
        // ];
        const filter = this.queryBuilderService.buildQueryContains(query, [ 'firstname', 'lastname', 'phone', 'email'], Operators.OR);
        const total = await this.repository.count(filter, true);
        return {
            items: await this.repository.find(filter, skip, limit, true),
            total,
            hasMore: limit + skip < total,
        };
    }
}
