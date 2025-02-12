import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/entities/file.entity';
import { Folder } from 'src/entities/folder.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
  ) {}

  async createFile(fileInfo: CreateFileDto): Promise<File> {
    const folder = await this.folderRepository.findOne({
      where: { id: fileInfo?.folderId },
    });

    const newFile = new File();
    newFile.name = fileInfo.name;
    newFile.folder = folder;
    newFile.fileType = fileInfo.fileType;

    return this.fileRepository.save(newFile);
  }

  async deleteFile(fileId: number): Promise<void> {
    await this.fileRepository.delete(fileId);
  }

  async getFileContent(fileId: number): Promise<File | string> {
    const file = await this.fileRepository.findOneOrFail({
      where: { id: fileId },
    });

    console.log('file', file);
    return file || ''; // 파일의 내용을 반환
  }

  async updateFileContent(fileId: number, content: string): Promise<void> {
    const file = await this.fileRepository.findOneOrFail({
      where: { id: fileId },
    });
    file.content = content; // 파일 내용을 업데이트
    await this.fileRepository.save(file);
  }
}
