import { VisitRetentionDto } from '../../dtos/dtos/visitRetention/visitRetention.dto';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { VisitRetentionService } from '../../services/visit/visitRetention.service';
import { UserService } from '../../services/user/user.service';
import { ID, Int } from 'type-graphql';
import { PaginatedVisitRetentionResponse } from '../../dtos/dtos/visitRetention/paginate.visitRetention.dto';
import { Logger, UseGuards } from '@nestjs/common';
import { VisitRetentionInput } from '../../dtos/inputs/visitRetention/visitRetention.input';
import { UserDto } from '../../dtos/dtos/user/user.dto';
import { VisitRetentionUpdate } from '../../dtos/inputs/visitRetention/visitRetention.update';
import { FLAG_RETENTION, USER_ROLES } from '../../../../constants/modules/enums';
import { UserInfoDto } from '../../dtos/dtos/user/user.Info.dto';
import { ReviewSettingService } from '../../services/settings/review-settings.service';
import { ServiceSettingService } from '../../services/settings/service-setting.service';
import { ReviewSettingDto } from '../../dtos/dtos/settings/review/review-setting.dto';
import { ServiceSettingDto } from '../../dtos/dtos/settings/service/service-setting.dto';
import { RetentionFilterInput } from '../../dtos/inputs/visitRetention/retention-filter.input';
import { GqlAuthGuard } from '../../guard/auth/graphql.guard';
import { CurrentUser } from '../../decorators/params/current-user.decorator';
import { RetentionFilterArgsInput } from '../../dtos/inputs/visitRetention/retention-filter-args.input';
import { QueryFilterIdDto } from '../../../core/dtos/filter/query-filter/query-filter-id.dto';
import { ClientRetentionDto } from '../../dtos/dtos/visitRetention/client-retention.dto';
import { formatPhoneNumber } from '../../../../constants/utils';
import { RolesGuard } from '../../guard/auth/roles.guard';
import { Roles } from '../../decorators/auth/roles.decorator';
import { RetentionPerformanceDto } from '../../dtos/dtos/visitRetention/retention-performance.dto';

@Resolver(of => VisitRetentionDto)
export class VisitRetentionResolver {
    constructor(
        private readonly services: VisitRetentionService,
        private readonly userService: UserService,
        private readonly directoryService: ReviewSettingService,
        private readonly serviceSettingService: ServiceSettingService,
    ) { }

    @Query(() => VisitRetentionDto)
    async getRetention(@Args({ name: 'id', type: () => ID }) id: string) {
        return await this.services.findResource(id);
    }

    @Query(() => PaginatedVisitRetentionResponse)
    //// @UseGuards(GqlAuthGuard, RolesGuard)
    //// @Roles('ADMIN', 'MANAGER')
    // @UseGuards(GqlAuthGuard)
    async getRetentions(
        @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
        @Args({ name: 'limit', type: () => Int, nullable: true }) limit: number,
    ) {
        return await this.services.getAll(skip, limit, {}, '-date');
    }

    @Query(() => PaginatedVisitRetentionResponse)
    @UseGuards(GqlAuthGuard)
    async filterRetentions(
      @Args() { filter, limit, skip }: RetentionFilterArgsInput,
      @CurrentUser() user,
    ) {
        if (!['MANAGER', 'ADMIN'].some(x => user.roles.includes(x))) {
            filter.userId = {
                eq: user.id,
            } as QueryFilterIdDto;
        }
        return await this.services.getAll(skip, limit, RetentionFilterInput.getQuery(filter), '-date');
    }

    @Query(() => RetentionPerformanceDto)
    @UseGuards(GqlAuthGuard)
    async getPerformanceRetention(
      @Args() { filter, limit, skip, withItems }: RetentionFilterArgsInput,
      @CurrentUser() user,
    ) {
        if (!['MANAGER', 'ADMIN'].some(x => user.roles.includes(x))) {
            filter.userId = {
                eq: user.id,
            } as QueryFilterIdDto;
        }
        return await this.services.getPerformanceRetention(RetentionFilterInput.getQuery(filter), '-date', skip, limit, withItems);
    }

    @Mutation(() => VisitRetentionDto)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(USER_ROLES.MANAGER, USER_ROLES.ADMIN)
    async createRetention(@Args('input') input: VisitRetentionInput) {
        try {
            // const user: UserDto = await this.userService.getUserInfo(input.userId);
            // await this.userService.updateRetention(user.id, { total: 1, important: input.flag && input.flag !== FLAG_RETENTION.NORMAL ? 1 : 0 });
            return await this.services.createResource(input);
        } catch (e) {
            Logger.debug(e, 'error');
        }
    }

    @Mutation(() => VisitRetentionDto)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(USER_ROLES.MANAGER, USER_ROLES.ADMIN)
    async updateRetention(
        @Args({ name: 'id', type: () => ID }) id: string,
        @Args('input') input: VisitRetentionUpdate) {
        return await this.services.updateRetention(id, input);
    }

    @Mutation(() => VisitRetentionDto)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(USER_ROLES.MANAGER, USER_ROLES.ADMIN)
    async deleteRetention(@Args({ name: 'id', type: () => ID }) id: string) {
        return await this.services.deleteResource(id);
    }

    @Mutation(() => VisitRetentionDto, {nullable: true})
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(USER_ROLES.MANAGER, USER_ROLES.ADMIN)
    async updateRetentionFromSummary(
      @Args({ name: 'id', type: () => ID }) id: string,
      @Args({ name: 'summary', type: () => String }) summary: string,
    ) {
        return await this.services.updateRetentionFromSummary(id, summary);
    }

    @Mutation(() => VisitRetentionDto, {nullable: true})
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(USER_ROLES.MANAGER, USER_ROLES.ADMIN)
    async syncRetention(
      @Args({ name: 'entityId', type: () => ID }) entityId: string,
      @Args({ name: 'eventId', type: () => String }) eventId: string,
    ) {
        return await this.services.syncRetention(entityId, eventId);
    }

    @ResolveProperty(returns => UserInfoDto)
    async user(@Parent() visit) {
        const { userId } = visit;
        let user;
        try {
            user = await this.userService.getUserInfo(userId);
        } catch (e) {
            return null;
        }
        return user;
    }
    @ResolveProperty(returns => ReviewSettingDto)
    async directory(@Parent() visit) {
        const { directoryId } = visit;
        let directory;
        try {
            directory = await this.directoryService.findResource(directoryId);
        } catch (e) {
            return undefined;
        }
        return directory;
    }
    @ResolveProperty(returns => ServiceSettingDto)
    async service(@Parent() visit) {
        const serviceId = visit.serviceId;
        let service;
        try {
            if (serviceId) {
                service = await this.serviceSettingService.findResource(serviceId);
            }
        } catch (e) {
            return undefined;
        }
        return service;
    }
    @ResolveProperty(returns => ClientRetentionDto)
    async client(@Parent() visit) {
        const { client } = visit;
        return {
            name: client.name,
            phone: client.phone ? formatPhoneNumber(client.phone, {type: 'domestic'}) : undefined,
        };
    }

}
