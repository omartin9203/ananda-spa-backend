import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { ClientDto } from '../../dtos/dtos/client/client.dto';
import { ClientRepository } from '../../../../infrastructure/common/repositories/client.repository';
import { IPaginatedResponseClass } from '../../../../infrastructure/core/models/interfaces/paginate.interface';
import { QueryBuilderService } from '../../../../infrastructure/core/services/query-builder.service';
import { Operators } from '../../../../infrastructure/core/utils/query/operators.enum';
import { UserDto } from '../../dtos/dtos/user/user.dto';

@Injectable()
export class ClientService extends ResourceService<ClientDto> {
    constructor(
      private repository: ClientRepository,
    ) {
        super(repository);
    }
    async filter( filter: any, skip?: number, limit?: number ): Promise<IPaginatedResponseClass<ClientDto>> {
        const total = await this.repository.count(filter);
        return {
            items: (await this.repository.find(filter, skip, limit)),
            total,
            hasMore: limit + skip < total,
        };
    }
}
