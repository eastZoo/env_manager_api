import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { File } from './file.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isOpen: boolean;

  @ManyToOne(() => Folder, (folder) => folder.subFolders, { nullable: true })
  parentFolder: Folder;

  @OneToMany(() => Folder, (folder) => folder.parentFolder)
  subFolders: Folder[];

  @OneToMany(() => File, (file) => file.folder)
  files: File[];
}
