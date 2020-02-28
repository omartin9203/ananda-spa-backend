import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID, Int } from 'type-graphql';
import { BaseFormResolver } from './base-form.resolver';
import { FacialFormDto } from '../../dtos/dtos/form/facial/facial-form.dto';
import { FacialFormInput } from '../../dtos/inputs/form/facial/facial-form.input';
import { UpdateFacialFormInput } from '../../dtos/inputs/form/facial/facial-form.update';
import { FacialFormService } from '../../services/form/facial/facial-form.service';
import { ClientService } from '../../services/client/client.service';
import { PaginatedFacialFormResponse } from '../../dtos/dtos/form/facial/facial-form.paginate.dto';
import { FACIALFORM_MODEL_NAME } from '../../../../constants';

@Resolver('FacialFormType')
export class FacialFormResolver extends BaseFormResolver {
  constructor(
    private readonly facialFormService: FacialFormService,
    clientService: ClientService,

  ) {
    super(clientService);
  }

  @Query(() => FacialFormDto, { name: 'facial' })
  async getFacial(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.facialFormService.findResource(id);
  }

  @Query(() => PaginatedFacialFormResponse, { name: 'facials' })
  async getFacials(
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
    @Args({name: 'limit', type: () => Int, nullable: true }) limit: number,
  ) {
    return await this.facialFormService.getAll(skip, limit, {type: FACIALFORM_MODEL_NAME});
  }

  @Mutation(() => FacialFormDto)
  async createFacial(@Args('input') input: FacialFormInput) {
    return await this.facialFormService.createResource(input);
  }
  @Mutation(() => FacialFormDto)
  async deleteFacial( @Args({ name: 'id', type: () => ID }) id: string ) {
    return await this.facialFormService.deleteResource(id);
  }
  @Mutation(() => FacialFormDto)
  async updateFacial(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('input') input: UpdateFacialFormInput) {
    return await this.facialFormService.updateResource(id, input);
  }
}
