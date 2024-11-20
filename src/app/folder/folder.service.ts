import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from 'src/entities/folder.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
  ) {}

  async createFolder(name: string, parentFolderId?: number): Promise<Folder> {
    const newFolder = new Folder();
    newFolder.name = name;

    if (parentFolderId) {
      const parentFolder = await this.folderRepository.findOne({
        where: { id: parentFolderId },
        relations: ['subFolders', 'files'],
      });
      newFolder.parentFolder = parentFolder;
    }

    return this.folderRepository.save(newFolder);
  }

  async getFolderById(folderId: number): Promise<Folder> {
    return this.folderRepository.findOne({
      where: { id: folderId },
      relations: ['subFolders', 'files'],
    });
  }

  async getAllRootFolders(): Promise<Folder[]> {
    return this.folderRepository.find({
      where: { parentFolder: null },
      relations: ['subFolders', 'files'],
    });
  }

  async deleteFolder(folderId: number): Promise<void> {
    await this.folderRepository.delete(folderId);
  }
}
