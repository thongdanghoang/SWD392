import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';

export enum ProductStatus {
  REVIEWING,
  PUBLISHED,
  EXCHANGING,
  EXCHANGED,
  BANNED,
  REMOVED
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @VersionColumn()
  version: number;

  @Column({name: 'created_by', length: 255, nullable: true})
  createdBy: string;

  @Column({name: 'modified_by', length: 255, nullable: true})
  modifiedBy: string;

  @CreateDateColumn({name: 'creation_date', nullable: false})
  creationDate: Date;

  @UpdateDateColumn({name: 'last_modification_date', nullable: true})
  lastModificationDate: Date;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ProductStatus,
    nullable: false,
    default: ProductStatus.REVIEWING
  })
  status: ProductStatus;

  @Column({name: 'title', length: 75, nullable: false})
  title: string;

  @Column({name: 'summary', type: 'text', nullable: true})
  summary: string;

  @Column({
    name: 'suggested_price',
    type: 'bigint',
    nullable: false
  })
  suggestedPrice: number;

  @Column({
    name: 'owner_id',
    type: 'uuid',
    nullable: false
  })
  owner: number;

  @Column({type: 'uuid', name: 'category_id', nullable: false})
  category: number;
}
