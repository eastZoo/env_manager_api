import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FolderService } from './folder.service';
import { Folder } from 'src/entities/folder.entity';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  async createFolder(
    @Body('name') name: string,
    @Body('parentFolderId') parentFolderId?: number,
  ): Promise<Folder> {
    return this.folderService.createFolder(name, parentFolderId);
  }

  @Get()
  async getAllRootFolders(): Promise<Folder[]> {
    return this.folderService.getAllRootFolders();
  }

  @Get(':id')
  async getFolderById(@Param('id') id: number): Promise<Folder> {
    return this.folderService.getFolderById(id);
  }

  @Delete(':id')
  async deleteFolder(@Param('id') id: number): Promise<void> {
    return this.folderService.deleteFolder(id);
  }
}
