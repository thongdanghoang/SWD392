import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';

export enum ProductStatus {
  REVIEWING = 'REVIEWING',
  PUBLISHED = 'PUBLISHED',
  EXCHANGING = 'EXCHANGING',
  EXCHANGED = 'EXCHANGED',
  BANNED = 'BANNED',
  REMOVED = 'REMOVED'
}

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @VersionColumn()
  version: number;

  @Column({name: 'created_by', length: 255, nullable: false})
  createdBy: string;

  @Column({name: 'modified_by', length: 255, nullable: false})
  modifiedBy: string;

  @CreateDateColumn({name: 'creation_date', nullable: false})
  creationDate: Date;

  @UpdateDateColumn({name: 'last_modification_date', nullable: false})
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

  @Column({name: 'is_give_away', type: 'boolean', nullable: false})
  isGiveAway: boolean;

  @Column({name: 'is_used', type: 'boolean', nullable: true})
  isUsed: boolean;

  @Column({
    name: 'suggested_price',
    type: 'bigint',
    nullable: true
  })
  suggestedPrice: number;

  @Column({name: 'summary', type: 'text', nullable: false})
  summary: string;

  @Column({name: 'province_code', length: 10, nullable: false})
  provinceCode: string;

  @Column({name: 'district_code', length: 10, nullable: false})
  districtCode: string;

  @Column({name: 'ward_code', length: 10, nullable: false})
  wardCode: string;

  @Column({name: 'address_detail', type: 'text', nullable: false})
  addressDetail: string;

  @Column({
    name: 'image_links',
    type: 'text',
    nullable: false,
    transformer: {
      to: (value: string[]) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value)
    }
  })
  images: string[];

  @Column({
    name: 'video_link',
    type: 'text',
    nullable: true
  })
  video: string;

  @Column({
    name: 'owner_id',
    type: 'uuid',
    nullable: false
  })
  owner: number;

  // TODO : [Nguyễn Trần Duy Thái] set this fields mandatory according to ticket SWD-44
  @Column({type: 'int', name: 'category_id', nullable: true})
  category: number;
}
