import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FACIALFORM_MODEL_NAME } from '../../../../constants';
import { FacialFormModel } from '../../models/models/form/facial-form.model';
import { ResourceRepository } from '../../../core/repositories/resource.repository';
import { QueryBuilderService } from '../../../core/services/query-builder.service';

@Injectable()
export class FacialFormRepository extends ResourceRepository<FacialFormModel> {
  constructor(
    @InjectModel(FACIALFORM_MODEL_NAME) facialModel: Model<FacialFormModel>,
    private readonly querybuilderService: QueryBuilderService,
  ) {
    super(facialModel, querybuilderService);
   }
  // async getFacials() {
  //   const facials = await this.facialModel.find().exec();
  //   return facials ? facials : [];
  // }
  // async createFacial( input: FacialFormInput ) {
  //   const facial = new this.facialModel({...input});
  //   return await facial.save();
  // }
  // async getFacial(id: string) {
  //   let facial;
  //   try {
  //     facial = await this.facialModel.findById(id).exec();
  //   } catch (error) {
  //     throw new NotFoundException('Could not find Facial.');
  //   }
  //   if (!facial) {
  //     throw new NotFoundException('Could not find Facial.');
  //   }
  //   return facial;
  // }

  // async updateFacial( id: string, input: UpdateFacialFormInput ) {
  //   let updateFacial;
  //   try {
  //     updateFacial = await this.facialModel.findByIdAndUpdate(id, { ...input }, { new: true }).exec();
  //   } catch (err) {
  //     throw new InternalServerErrorException(err.message);
  //   }
  //   return updateFacial;
  // }

  // async deleteFacial(Id: string) {
  //   let result;
  //   try {
  //     result = await this.facialModel.findByIdAndRemove(Id).exec();
  //   } catch (err) {
  //     throw new InternalServerErrorException(err.message);
  //   }
  //   return result;
  // }
}
