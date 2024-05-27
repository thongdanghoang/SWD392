import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'int', default: 0})
  version: number;

  @Column({type: 'nvarchar', length: 255, nullable: true})
  created_by: string;

  @CreateDateColumn()
  creation_date: Date;

  @Column({type: 'nvarchar', length: 255, nullable: true})
  modified_by: string;

  @UpdateDateColumn()
  last_modification_date: Date;

  @Column({type: 'bigint'})
  owner_id: number;

  @Column({type: 'varchar', length: 75})
  title: string;

  @Column({type: 'text', nullable: true})
  summary: string;

  @Column({type: 'float', nullable: true})
  suggested_price: number;

  @Column({type: 'varchar', length: 20})
  status: string;
}
