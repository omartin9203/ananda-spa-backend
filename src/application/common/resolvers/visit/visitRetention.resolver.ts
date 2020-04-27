import { VisitRetentionDto } from "../../dtos/dtos/visitRetention/visitRetention.dto";
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { VisitRetentionService } from "../../services/visit/visitRetention.service";
import { UserService } from "../../services/user/user.service";
import { ID, Int } from 'type-graphql';
import { PaginatedVisitRetentionResponse } from "../../dtos/dtos/visitRetention/paginate.visitRetention.dto";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../../guard/auth/graphql.guard";
import { VisitRetentionInput } from "../../dtos/inputs/visitRetention/visitRetention.input";
import { UserDto } from "../../dtos/dtos/user/user.dto";
import { VisitRetentionUpdate } from "../../dtos/inputs/visitRetention/visitRetention.update";
import { FLAG_RETENTION } from "../../../../constants/modules/enums";

@Resolver(of => VisitRetentionDto)
export class VisitRetentionResolver {
    constructor(
        private readonly service: VisitRetentionService,
        private readonly userService: UserService,
    ) { }

    @Query(() => VisitRetentionDto, { name: 'visitRetention' })
    async getVisit(@Args({ name: 'id', type: () => ID }) id: string) {
        return await this.service.findResource(id);
    }

    @Query(() => PaginatedVisitRetentionResponse, { name: 'visitRetentions' })
    //// @UseGuards(GqlAuthGuard, RolesGuard)
    //// @Roles('ADMIN', 'MANAGER')
    //@UseGuards(GqlAuthGuard)
    async getVisits(
        @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
        @Args({ name: 'limit', type: () => Int, nullable: true }) limit: number,
    ) {
        return await this.service.getAll(skip, limit);
    }

    @Mutation(() => VisitRetentionDto)
    async createVisitRetention(@Args('input') input: VisitRetentionInput) {
        try {
            const user: UserDto = await this.userService.findOne({
                email: input.user,
            });
            await this.userService.updateRetention(user.id, { total: 1, important: input.flag && input.flag != FLAG_RETENTION.NORMAL ? 1 : 0 })
            return await this.service.createResource({
                userId: user.id,
                treatment: input.treatment,
                clientPhone: input.client,
                flag: input.flag,
            });
        } catch {

        }
    }

    @Mutation(() => VisitRetentionDto)
    async updateVisitRetention(
        @Args({ name: 'id', type: () => ID }) id: string,
        @Args('input') input: VisitRetentionUpdate) {
        if (input.flag) {
            await this.service.updateFlag(id, input.flag);
        }
        return await this.service.updateResource(id, input);
    }

    @Mutation(() => VisitRetentionDto)
    async deleteVisitRetention(@Args({ name: 'id', type: () => ID }) id: string) {
        return await this.service.deleteResource(id);
    }

    @ResolveProperty(returns => UserDto)
    async user(@Parent() visit) {
        const { userId } = visit;
        let user;
        try {
            user = await this.userService.findResource(userId);
        } catch (e) {
            return null;
        }
        return user;
    }
}