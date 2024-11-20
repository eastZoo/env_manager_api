import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/entities/file.entity';
import { Folder } from 'src/entities/folder.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
  ) {}

  async createFile(
    name: string,
    folderId: number,
    type: string = 'frontend',
  ): Promise<File> {
    const folder = await this.folderRepository.findOne({
      where: { id: folderId },
    });

    const newFile = new File();
    newFile.name = name;
    newFile.folder = folder;
    newFile.type = type;

    return this.fileRepository.save(newFile);
  }

  async deleteFile(fileId: number): Promise<void> {
    await this.fileRepository.delete(fileId);
  }
}
