import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { Folder } from './folder.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 왠만든지 모르겠음
  @Column({ nullable: true })
  type: string; // ex. frontend, backend 등

  @Column({ nullable: true })
  fileType: string;

  @Column('text', { nullable: true })
  content: string; // 파일 내용

  @ManyToOne(() => Folder, (folder) => folder.files, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  folder: Folder;

  @DeleteDateColumn()
  deletedAt: Date;
}
