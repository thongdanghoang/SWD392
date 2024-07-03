import {Column, Entity, PrimaryGeneratedColumn, VersionColumn} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @VersionColumn()
  version: number;

  @Column({name: 'title', type: 'varchar', length: 255, nullable: false})
  title: string;

  @Column({name: 'image', type: 'text', nullable: true})
  image: string;
}
