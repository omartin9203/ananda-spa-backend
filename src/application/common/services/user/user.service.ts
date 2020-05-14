import { Injectable, NotImplementedException } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { UserDto } from '../../dtos/dtos/user/user.dto';
import { UserRepository } from '../../../../infrastructure/common/repositories/user.repository';
import { QueryBuilderService } from '../../../../infrastructure/core/services/query-builder.service';
import { STATUS } from '../../../../constants/constants';
import { IPaginatedResponseClass } from '../../../../infrastructure/core/models/interfaces/paginate.interface';
import { ClientDto } from '../../dtos/dtos/client/client.dto';
import { Operators } from '../../../../infrastructure/core/utils/query/operators.enum';
import { UserFilterInput } from '../../dtos/inputs/user/UserFilter';
import { RetentionUserInput } from '../../dtos/inputs/user/retention.user.input';
import { UserBalanceRetentionDto } from '../../dtos/dtos/user/balance/user-balance-retention.dto';

@Injectable()
export class UserService extends ResourceService<UserDto> {
    constructor(private readonly repository: UserRepository,
                private readonly queryBuilderService: QueryBuilderService) {
        super(repository);
    }
    async signInSSO(email: string) {
      return await this.repository.signInSSO(email)
        .then(res => {
            const success = !(!res || res.status !== STATUS.ACTIVE);
            const message = !res ? 'User not exist' : (res.status !== STATUS.ACTIVE) ? `Status of this user is ${res.status}` : 'OK';
            const data = success ? { id: res.id, status: res.status} : null;
            return {
              success,
              message,
              data,
            };
        });
    }
    async signInLocal(unique: string, password: string) {
      return await this.repository.signInLocal(unique, password);
        // .then(res => {
        //   const success = !(!res || res.status !== STATUS.ACTIVE || !res.passwordMatch);
        //   const message = !res ? 'User not exist'
        //     : (res.status !== STATUS.ACTIVE) ? `Status of this user is ${res.status}` :
        //     !res.passwordMatch ? 'Incorrect password' : 'OK';
        //   const data = success ? { id: res.id, status: res.status} : null;
        //   return {
        //     success,
        //     message,
        //     data,
        //   };
        // });
    }
    async signUp(user: object) {
      return await this.repository.signUp(user);
        // .then(res => {
        //   const success = res !== null;
        //   const message = !res ? 'Error' : 'Ok';
        //   const data = success ? { id: res.id, status: res.status} : null;
        //   return {
        //     success,
        //     message,
        //     data,
        //   };
        // });
    }
    async getRolesOfUser(id: string) {
      return await this.repository.getRolesOfUser(id);
    }
    async getUserInfo(id: string) {
      return await this.repository.getUserInfo(id);
    }
    async filter( filter: any, skip?: number, limit?: number ): Promise<IPaginatedResponseClass<UserDto>> {
      // const buildFilter = {
      //   :userFilter.userName
      // };
      // const filter = Object.keys(userFilter).length ? this.queryBuilderService.buildQueryEq(userFilter, Operators.AND) : {};
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
}
