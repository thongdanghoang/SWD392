import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';

export enum ExchangeStatus {
  PENDING,
  ACCEPTED,
  REJECTED
}

@Entity('exchange')
export class ExchangeEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @VersionColumn()
  version?: number;

  @Column({name: 'created_by', length: 255, nullable: true})
  createdBy: string;

  @Column({name: 'modified_by', length: 255, nullable: true})
  modifiedBy: string;

  @CreateDateColumn({name: 'creation_date', nullable: false})
  creationDate?: Date;

  @UpdateDateColumn({name: 'last_modification_date', nullable: true})
  lastModificationDate?: Date;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ExchangeStatus,
    nullable: false,
    default: ExchangeStatus.PENDING
  })
  status: ExchangeStatus;

  @Column({
    name: 'product_request',
    type: 'uuid',
    nullable: false
  })
  productRequest: number;

  @Column({
    name: 'product_to_exchange',
    type: 'uuid',
    nullable: true
  })
  productToBeExchanged?: number;

  @Column({
    name: 'exchange_by_money',
    type: 'bigint',
    nullable: true
  })
  exchangeMoney?: number;
}
