import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from 'src/entities/folder.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
  ) {}

  async createFolder(name: string, parentFolderId?: number): Promise<Folder> {
    const newFolder = new Folder();
    newFolder.name = name;

    Logger.log('parentFolderId', parentFolderId);
    // parentFolderId 가 있다면 해당 폴더를 찾아서 부모 폴더로 설정합니다.
    if (parentFolderId) {
      const parentFolder = await this.folderRepository.findOne({
        where: { id: parentFolderId },
        relations: ['subFolders', 'files'],
      });
      newFolder.parentFolder = parentFolder;
    } else {
      // parentFolderId 가 없다면 루트 폴더로 설정합니다.
      newFolder.isRoot = true;
    }

    return this.folderRepository.save(newFolder);
  }

  async getFolderById(folderId: number): Promise<Folder> {
    return this.folderRepository.findOne({
      where: { id: folderId },
      relations: ['subFolders', 'files'],
    });
  }

  // async getAllRootFolders(): Promise<Folder[]> {
  //   return this.folderRepository.find({
  //     where: { parentFolder: null, isRoot: true },
  //     relations: ['subFolders', 'subFolders.subFolders', 'files'], // 하위 폴더와 그 하위 폴더까지 명시적으로 설정
  //   });
  // }

  async getAllRootFolders(): Promise<Folder[]> {
    const rootFolders = await this.folderRepository.find({
      where: { parentFolder: null, isRoot: true },
      relations: ['files'], // 첫 단계에서는 파일만 가져옵니다.
      order: {
        createdAt: 'DESC',
      },
    });

    for (const folder of rootFolders) {
      folder.subFolders = await this.getAllSubFolders(folder.id);
    }

    return rootFolders;
  }

  private async getAllSubFolders(parentFolderId: number): Promise<Folder[]> {
    const subFolders = await this.folderRepository.find({
      where: { parentFolder: { id: parentFolderId } },
      relations: ['files'], // 하위 폴더의 파일 정보도 가져옵니다.
    });

    for (const subFolder of subFolders) {
      subFolder.subFolders = await this.getAllSubFolders(subFolder.id);
    }

    return subFolders;
  }

  async deleteFolder(folderId: number): Promise<void> {
    await this.folderRepository.delete(folderId);
  }
}
