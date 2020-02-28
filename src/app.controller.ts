import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
  HttpException,
  HttpStatus, BadRequestException, Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './application/common/services/images/FilesServices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly  filesService: FilesService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('images')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('File is required.');
    }
    return await this.filesService.writeFile(file);
  }
  @Get('images/:id')
  async getFile(@Param('id') id: string, @Res() res) {
    // res.type('jpg');
    return await this.filesService.readStream(id)
      .then(item => {
        item.once('error', () => {
          // return res.status(400).end();
          throw new BadRequestException();
      }).pipe(res);
      })
      .catch(err => {
        // Logger.log(err, 'ERROR_CATCH');
        throw new BadRequestException();
      });
  }

  @Get('images')
  async getFiles( @Res() res, @Body('type') type?: string) {
    // res.type('jpg');
    return await this.filesService.findPerContentType(type)
      .then(items => {
        res.send(items);
      })
      .catch(err => {
        // Logger.log(err, 'ERROR_CATCH');
        throw new BadRequestException();
      });
  }

}
