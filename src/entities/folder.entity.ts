import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { File } from './file.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  isRoot: boolean;

  @ManyToOne(() => Folder, (folder) => folder.subFolders, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parentFolder: Folder;

  @OneToMany(() => Folder, (folder) => folder.parentFolder, { cascade: true })
  subFolders: Folder[];

  @OneToMany(() => File, (file) => file.folder, { cascade: true })
  files: File[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
