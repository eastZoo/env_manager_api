import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { FileService } from './file.service';
import { File } from 'src/entities/file.entity';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  async createFile(
    @Body('name') name: string,
    @Body('folderId') folderId: number,
    @Body('type') type: string = 'frontend',
  ): Promise<File> {
    return this.fileService.createFile(name, folderId, type);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: number): Promise<void> {
    return this.fileService.deleteFile(id);
  }

  @Get(':id/content')
  async getFileContent(@Param('id') id: number): Promise<File | string> {
    return this.fileService.getFileContent(id);
  }

  @Put(':id/content')
  async updateFileContent(
    @Param('id') id: number,
    @Body('content') content: string,
  ): Promise<void> {
    await this.fileService.updateFileContent(id, content);
  }
}
