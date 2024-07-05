import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';

export enum ExchangeStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
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
    name: 'products_to_exchange',
    type: 'text',
    nullable: false,
    transformer: {
      to: (value: string[]) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value)
    }
  })
  productsToBeExchanged: string[];

  @Column({
    name: 'exchange_by_money',
    type: 'bigint',
    nullable: true
  })
  exchangeMoney?: number;
}
