import { NotFoundException, InternalServerErrorException, Logger, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { ResourceModel } from '../models/models/resource.model';
import { IResourceRepository } from '../../../domain/common/repositories/iresource.repository';
import { QueryBuilderService } from '../services/query-builder.service';

export class ResourceRepository<TResource extends ResourceModel> implements IResourceRepository<TResource> {
  constructor(
    private readonly resourceModel: Model<TResource>,
    private readonly queryBuilderService: QueryBuilderService,
  ) {
  }
  unzip(x?: any): TResource | undefined {
    return x ? { ...x, id: x._id.toString() } : x;
  }
  async getAll(skip: number = 0, limit: number = 10): Promise<TResource[]> {
    // let resources = await this.resourceModel.find({}, null, { skip, limit }).exec();
    let resources = await this.resourceModel.find().skip(skip).limit(limit).lean();
    resources = resources ? resources : [];
    return resources.map(x => this.unzip(x));
  }
  async create( input: object ): Promise<TResource> {
    let resource = new this.resourceModel({...input});
    resource = await resource.save();
    return this.unzip(resource);
  }
  async getOne(id: string) {
    let resource;
    try {
      resource = await this.resourceModel.findById(id).lean();
    } catch (error) {
      throw new NotFoundException('Could not find resource.');
    }
    if (!resource) {
      throw new NotFoundException('Could not find resource.');
    }
    return this.unzip(resource);
  }
  async updateOne( Id: string, input: object ): Promise<TResource> {
    let resource;
    try {
      resource = await this.resourceModel.findByIdAndUpdate(Id, { ...input, updatedAt: Date.now() }, {new: true}).lean();
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
    return this.unzip(resource);
  }
  async deleteOne(Id: string): Promise<TResource> {
    const result = await this.resourceModel.findByIdAndRemove(Id).lean();
    if (!result) {
      throw new NotFoundException('Could not find resource.');
    }
    return this.unzip(result);
  }
  async count(filter = {}, byOr: boolean = false): Promise<number> {
    // if ( byOr ) {
    //   return this.resourceModel.find().or(queryFilter).countDocuments();
    // }
    // const filter = queryBuilder ? queryBuilder.getQuery() : null;
    return filter !== {} ? await this.resourceModel.countDocuments(filter) : await this.resourceModel.estimatedDocumentCount();
  }
  async findOne(filter = {}): Promise<TResource> {
    let resource;
    try {
      resource = await this.resourceModel.findOne(filter).lean();
    } catch (error) {
      throw new NotFoundException(error.toString());
    }
    if (!resource) {
      throw new NotFoundException('Could not find resource.');
    }
    return this.unzip(resource);
  }
  async find(filter = {}, skip: number = 0, limit: number = 10, sort: any | string = null): Promise<TResource[]> {
    const resources = await this.resourceModel.find(filter).sort(sort).skip(skip).limit(limit).lean();
    return resources ? resources.map(x => this.unzip(x)) : [];
  }
}
