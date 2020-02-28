import { Injectable } from '@nestjs/common';
import { FileRepository } from '../../../../infrastructure/core/repositories/file.repository';

@Injectable()
export class FilesService {
  constructor(private readonly fileRepository: FileRepository) {}

  async readStream(id: string) {
    return this.fileRepository.readStream(id);
  }

  async writeStream(stream, options?) {
    return await this.fileRepository.writeStream(stream, options);
  }

  async findInfo(id: string) {
    return await this.fileRepository.findInfo(id);
  }

  public async writeFile(file, metadata?) {
    return await this.fileRepository.writeFile(file, metadata);
  }
  public async findPerContentType(type?: string) {
    return await this.fileRepository.findPerContentType(type);
  }
}
