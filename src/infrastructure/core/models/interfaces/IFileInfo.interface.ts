import { IGridFSObject } from 'mongo-gridfs';

export interface IFileInfo {
  readonly id: string;
  readonly uploadDate: Date;
  readonly filename: string;
  readonly contentType: string;
  readonly metadata: object;
}

export class FileInfo implements IFileInfo {
  constructor(file: IGridFSObject) {
    this.id = file._id;
    this.contentType = file.contentType;
    this.filename = file.filename;
    this.metadata = file.metadata;
    this.uploadDate = file.uploadDate;
  }
  readonly id: string;
  readonly contentType: string;
  readonly filename: string;
  readonly metadata: object;
  readonly uploadDate: Date;
}
