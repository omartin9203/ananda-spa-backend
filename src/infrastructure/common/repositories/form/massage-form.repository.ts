import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MassageFormModel } from '../../models/models/form/massage-form.model';
import { ResourceRepository } from '../../../core/repositories/resource.repository';
import { MASSAGEFORM_MODEL_NAME } from '../../../../constants/constants';
import { QueryBuilderService } from '../../../core/services/query-builder.service';

@Injectable()
export class MassageFormRepository extends ResourceRepository<MassageFormModel> {
  constructor(
    @InjectModel(MASSAGEFORM_MODEL_NAME) private readonly massageModel: Model<MassageFormModel>,
    private readonly querybuilderService: QueryBuilderService,

  ) {
    super(massageModel, querybuilderService);
   }
  // async getMassages() {
  //   const massages = await this.massageModel.find().exec();
  //   return massages ? massages : [];
  // }
  // async createMassage( input: MassageFormInput ) {
  //   const massage = new this.massageModel({...input});
  //   return await massage.save();
  // }
  // async getMassage(id: string) {
  //   let massage;
  //   try {
  //     massage = await this.massageModel.findById(id).exec();
  //   } catch (error) {
  //     throw new NotFoundException('Could not find Massage.');
  //   }
  //   if (!massage) {
  //     throw new NotFoundException('Could not find Massage.');
  //   }
  //   return massage;
  // }

  // async updateMassage( id: string, input: UpdateMassageFormInput ) {
  //   let updateMassage;
  //   try {
  //     updateMassage = await this.massageModel.findByIdAndUpdate(id, { ...input }, { new: true }).exec();
  //   } catch (err) {
  //     throw new InternalServerErrorException('Error Updating.');
  //   }
  //   if (!updateMassage) {
  //     throw new NotFoundException('Could not find Massage.');
  //   }
  //   return updateMassage;
  // }

  // async deleteMassage(Id: string) {
  //   let result;
  //   try {
  //     result = await this.massageModel.findByIdAndRemove(Id).exec();
  //   } catch (err) {
  //     throw new InternalServerErrorException('Error Deleting.');
  //   }
  //   if (!result) {
  //     throw new NotFoundException('Could not find Massage.');
  //   }
  //   return result;
  // }
}
