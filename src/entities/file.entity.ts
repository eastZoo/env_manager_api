import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Folder } from './folder.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string; // frontend, backend 등 파일의 타입

  @Column({ nullable: true })
  fileType: string; // 파일의 확장자

  @Column('jsonb', { default: {} })
  env: Record<string, string>; // 환경 변수 정보

  @ManyToOne(() => Folder, (folder) => folder.files, { nullable: false })
  folder: Folder;
}
