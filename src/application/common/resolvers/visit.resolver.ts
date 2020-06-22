import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ClientService } from '../services/client/client.service';
import { UserService } from '../services/user/user.service';
import { ID, Int } from 'type-graphql';
import { ClientDto } from '../dtos/dtos/client/client.dto';
import { UserDto } from '../dtos/dtos/user/user.dto';
import { VisitDto } from '../dtos/dtos/visit/visit.dto';
import { VisitService } from '../services/visit/visit.service';
import { PaginatedVisitResponse } from '../dtos/dtos/visit/paginate.visit.dto';
import { CreateVisit } from '../dtos/inputs/visit/visit.input';
import { UpdateVisit } from '../dtos/inputs/visit/visit.update';
import {Logger, UseGuards} from '@nestjs/common';
import { GqlAuthGuard } from '../guard/auth/graphql.guard';
import { FacialFormDto } from '../dtos/dtos/form/facial/facial-form.dto';
import { FacialFormService } from '../services/form/facial/facial-form.service';
import { MassageFormService } from '../services/form/massage/massage-form.service';
import { MassageFormDto } from '../dtos/dtos/form/massage/massage-form.dto';
import { DiagnosticService } from '../services/diagnostic/diagnostic.service';
import { DiagnosticDto } from '../dtos/dtos/diagnostic/diagnostic.dto';
import { CreateDiagnosticInputDto } from '../dtos/inputs/diagnostic/diagnostic.input';
import { ColorSettingDto } from '../dtos/dtos/settings/color/color-setting.dto';

@Resolver(of => VisitDto)
export class VisitResolver {
  constructor(
    private readonly service: VisitService,
    private readonly clientService: ClientService,
    private readonly userService: UserService,
    private readonly facialService: FacialFormService,
    private readonly massageService: MassageFormService,
    private readonly diagnosticService: DiagnosticService,
  ) {}

  @Query(() => VisitDto, { name: 'visit', nullable: true })
  async getVisit(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.service.findResource(id);
  }

  @Query(() => PaginatedVisitResponse, { name: 'visits' })
  // @UseGuards(GqlAuthGuard, RolesGuard)
  // @Roles('ADMIN', 'MANAGER')
  @UseGuards(GqlAuthGuard)
  async getVisits(
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
    @Args({name: 'limit', type: () => Int, nullable: true }) limit: number,
  ) {
    return await this.service.getAll(skip, limit);
  }

  @Mutation(() => VisitDto, {nullable: true})
  async createVisit(@Args('input') input: CreateVisit) {
    const diagnostic: DiagnosticDto = await this.diagnosticService.createResource({
      ...input.diagnostic,
      clientId: input.clientId,
      performedById: input.performedById,
        date: input.date,
    } as CreateDiagnosticInputDto);
    Logger.log(diagnostic, 'diagnostic');
    return await this.service.createResource({ ...input, diagnosticId: diagnostic.id });
  }
  @Mutation(() => VisitDto, {nullable: true})
  async updateVisit(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('input') input: UpdateVisit) {
    return await this.service.updateResource(id, input);
  }

  @Mutation(() => VisitDto, {nullable: true})
  async deleteVisit( @Args({ name: 'id', type: () => ID }) id: string ) {
    return await this.service.deleteResource(id);
  }

  @ResolveProperty(returns => ClientDto)
  async client(@Parent() visit) {
    const { clientId } = visit;
    let client;
    try {
      client = await this.clientService.findResource(clientId);
    } catch (e) {
      return null;
    }
    return client;
  }

  @ResolveProperty(returns => DiagnosticDto)
  async diagnostic(@Parent() visit) {
    const { diagnosticId } = visit;
    let diagnostic;
    try {
      diagnostic = await this.diagnosticService.findResource(diagnosticId);
    } catch (e) {
      return null;
    }
    return diagnostic;
  }

  @ResolveProperty(returns => UserDto)
  async performedBy(@Parent() visit) {
    const { performedById } = visit;
    let user;
    try {
      user = await this.userService.findResource(performedById);
    } catch (e) {
      return null;
    }
    return user;
  }

  @ResolveProperty(returns => FacialFormDto)
  async facialForm(@Parent() visit) {
    const { formId } = visit;
    if (!formId) { return null; }
    let facial;
    try {
      facial = await this.facialService.findResource(formId);
    } catch (e) {
      return null;
    }
    return facial;
  }

  @ResolveProperty(returns => MassageFormDto)
  async massageForm(@Parent() visit) {
    const { formId } = visit;
    if (!formId) { return null; }
    let massage;
    try {
      massage = await this.massageService.findResource(formId);
    } catch (e) {
      return null;
    }
    return massage;
  }
}
