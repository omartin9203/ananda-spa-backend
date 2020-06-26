import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateBuilderService {
  buildTemplate<T>(data: T, path: string): string {
    // use generic builder service here
    return '';
  }
}
