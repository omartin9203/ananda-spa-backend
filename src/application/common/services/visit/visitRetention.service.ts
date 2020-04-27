import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { VisitRetentionRepository } from '../../../../infrastructure/common/repositories/visitRetention.repository';
import { VisitRetentionDto } from '../../dtos/dtos/visitRetention/visitRetention.dto';
import { VisitRetentionUpdate } from '../../dtos/inputs/visitRetention/visitRetention.update';
import { FLAG_RETENTION } from '../../../../constants/modules/enums';
import { UserService } from '../user/user.service';

@Injectable()
export class VisitRetentionService extends ResourceService<VisitRetentionDto> {
    constructor(readonly repository: VisitRetentionRepository, readonly userService: UserService) {
        super(repository);
    }
    async updateFlag(id: string, flag: FLAG_RETENTION) {
        const prev = await this.repository.getOne(id) as { flag: FLAG_RETENTION, userId: string };
        if (prev.flag != flag) {
            await this.userService.updateRetention(prev.userId, { important: prev.flag == FLAG_RETENTION.NORMAL ? 1 : flag == FLAG_RETENTION.NORMAL ? -1 : 0 });
        }
    }
}