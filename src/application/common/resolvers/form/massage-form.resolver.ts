import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID, Int } from 'type-graphql';
import { BaseFormResolver } from './base-form.resolver';
import { MassageFormDto } from '../../dtos/dtos/form/massage/massage-form.dto';
import { MassageFormInput } from '../../dtos/inputs/form/massage/massage-form.input';
import { UpdateMassageFormInput } from '../../dtos/inputs/form/massage/massage-form.update';
import { ClientService } from '../../services/client/client.service';
import { MassageFormService } from '../../services/form/massage/massage-form.service';
import { PaginatedMassageFormResponse } from '../../dtos/dtos/form/massage/massage-form.paginate.dto';
import { MASSAGEFORM_MODEL_NAME } from '../../../../constants/constants';

@Resolver('MassageFormType')
export class MassageFormResolver extends BaseFormResolver {
  constructor(
    private readonly massageFormService: MassageFormService,
    clientService: ClientService,

  ) {
    super(clientService);
  }

  @Query(() => MassageFormDto, { name: 'massage', nullable: true })
  async getMassage(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.massageFormService.findResource(id);
  }

  @Query(() => PaginatedMassageFormResponse, { name: 'massages' })
  async getMassages(
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
    @Args({name: 'limit', type: () => Int, nullable: true }) limit: number,
  ) {
    return await this.massageFormService.getAll(skip, limit, {type: MASSAGEFORM_MODEL_NAME});
  }

  @Mutation(() => MassageFormDto, {nullable: true})
  async createMassage(@Args('input') input: MassageFormInput) {
    return await this.massageFormService.createResource(input);
  }
  @Mutation(() => MassageFormDto, {nullable: true})
  async deleteMassage( @Args({ name: 'id', type: () => ID }) id: string ) {
    return await this.massageFormService.deleteResource(id);
  }
  @Mutation(() => MassageFormDto, {nullable: true})
  async updateMassage(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('input') input: UpdateMassageFormInput) {
    return await this.massageFormService.updateResource(id, input);
  }
}
