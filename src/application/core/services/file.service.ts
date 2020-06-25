import { Injectable } from '@nestjs/common';
import { PathLike, readFile, writeFile, WriteFileOptions, writeFileSync, promises as fs, promises } from 'fs';

@Injectable()
export class FileService {
  async createFile(path: PathLike, data: any, options?: {encoding?: string | null, mode?: string | number, flag?: string | number} | string | null)
    : Promise<{ success: boolean, message: string}> {
    try {
      await fs.writeFile(path, data, options);
      return {
        success: true,
        message: 'OK',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async readFile(path: PathLike): Promise<{ success: boolean, message?: string, data?: string}> {
    try {
      const result = await fs.readFile(path);
      return {
        success: true,
        data: result.toString(),
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }

  }
}
