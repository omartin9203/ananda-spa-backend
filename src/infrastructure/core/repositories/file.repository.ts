import { InjectConnection } from '@nestjs/mongoose';
import { IGridFSObject, IGridFSWriteOption, MongoGridFS } from 'mongo-gridfs';
import { FileInfo, IFileInfo } from '../models/interfaces/IFileInfo.interface';
import { Injectable } from '@nestjs/common';
import { FILE_MODEL_NAME } from '../../../constants';

const enum contentsType {
  image = 'image',
  text = 'text',
  video = 'video',
}

@Injectable()
export class FileRepository {
  private fileModel: MongoGridFS;
  constructor(@InjectConnection() private readonly connection) {
    this.fileModel = new MongoGridFS(this.connection.db, FILE_MODEL_NAME);
  }
  async readStream(id: string) {
    return this.fileModel.readFileStream(id);
  }

  async writeStream(stream, options?: IGridFSWriteOption) {
    return await this.fileModel
      .writeFileStream(stream, options)
      .then(FileRepository.convertToFileInfo);
  }

  static convertToFileInfo(file: IGridFSObject) {
    return new FileInfo(file);
  }

  async findInfo(id: string) {
    return await this.fileModel
      .findById(id)
      .then(FileRepository.convertToFileInfo);
  }

  public async writeFile(
    file,
    metadata?,
  ) {
    return await this.fileModel
      .uploadFile(
        file.path,
        {
          filename: file.originalname,
          contentType: file.mimetype,
          metadata,
        },
        true,
      )
      .then(FileRepository.convertToFileInfo);
  }

  public async findPerContentType(type: string = contentsType.image, skip: number = 0, limit: number = 10) {
    const regexp = new RegExp(type, 'i');
    return await this.fileModel.find({contentType: regexp});
  }
}
