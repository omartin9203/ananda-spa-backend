import { Injectable, Logger } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { UserDto } from '../../dtos/dtos/user/user.dto';
import { UserRepository } from '../../../../infrastructure/common/repositories/user.repository';
import { QueryBuilderService } from '../../../../infrastructure/core/services/query-builder.service';
import { STATUS } from '../../../../constants/constants';
import { IPaginatedResponseClass } from '../../../../infrastructure/core/models/interfaces/paginate.interface';
import { RetentionUserInput } from '../../dtos/inputs/user/retention.user.input';
import { UserBalanceRetentionDto } from '../../dtos/dtos/user/balance/user-balance-retention.dto';
import { UpdateUserInput } from '../../dtos/inputs/user/user.update';
import { ColorSettingService } from '../settings/color-setting.service';

@Injectable()
export class UserService extends ResourceService<UserDto> {
    constructor(private readonly repository: UserRepository,
                private readonly colorSettingService: ColorSettingService,
                private readonly queryBuilderService: QueryBuilderService) {
        super(repository);
    }
    async updateResource(id, input: UpdateUserInput) {
      input.colorId = (input.status === STATUS.CANCELED) ? null : input.colorId;
      if (input.colorId !== undefined) {
        const user = await this.findResource(id);
        if (user.colorId) {
          await this.colorSettingService.updateResource(user.colorId, {available: true});
        }
        if (input.colorId) {
          await this.colorSettingService.updateResource(input.colorId, { available: false });
        }
      }
      return await this.repository.updateOne(id, input);
    }
    async deleteResource(id) {
      const entity = await this.repository.updateOne(id, {status: STATUS.CANCELED});
      if (entity.colorId) {
        await this.colorSettingService.updateResource(entity.colorId, {available: true});
      }
      return  entity;
    }
    async signInSSO(email: string) {
      try {
        const res = await this.repository.signInSSO(email);
        const success = !(!res || res.status !== STATUS.ACTIVE);
        const message = !res ? 'User not exist' : (res.status !== STATUS.ACTIVE) ? `Status of this user is ${res.status}` : 'OK';
        const data = success ? { id: res.id, status: res.status} : null;
        return {
          success,
          message,
          data,
        };
      } catch (e) {
        return {
          success: false,
          message: e.message,
          data: null,
        };
      }
    }
    async signInLocal(unique: string, password: string) {
      return await this.repository.signInLocal(unique, password);
    }
    async signUp(user: object) {
      return await this.repository.signUp(user);
    }
    async getRolesOfUser(id: string) {
      return await this.repository.getRolesOfUser(id);
    }
    async getUserInfo(id: string) {
      return await this.repository.getUserInfo(id);
    }
    async filter( filter: any, skip?: number, limit?: number ): Promise<IPaginatedResponseClass<UserDto>> {
      const total = await this.repository.count(filter, true);
      return {
        items: await this.repository.find(filter, skip, limit),
        total,
        hasMore: limit + skip < total,
      };
    }
    async updateRetention(id: string, update: RetentionUserInput) {
        await this.repository.updateRetention(id, update.total, update.important);
    }
    async getBalanceRetention(filter: any): Promise<UserBalanceRetentionDto> {
      return await this.repository.getBalanceRetention(filter);
    }
    async getUserByColor(colorId: string) {
      return await this.repository.getUserByColor(colorId);
    }
}
