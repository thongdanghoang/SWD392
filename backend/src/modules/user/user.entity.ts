import {Column, Entity, PrimaryGeneratedColumn, VersionColumn} from 'typeorm';
import {PartialType} from '@nestjs/swagger';

export enum UserStatus {
  ACTIVE,
  BANNED
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @VersionColumn()
  version: number;

  @Column({
    name: 'last_modification_date',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  lastModificationDate: Date;

  @Column({name: 'creation_date', nullable: false})
  creationDate: Date;

  @Column({name: 'first_name', nullable: false, length: 30})
  firstName: string;

  @Column({name: 'last_name', nullable: false, length: 30})
  lastName: string;

  @Column({name: 'email', nullable: false, length: 100})
  email: string;

  @Column({name: 'email_verified', nullable: false})
  emailVerified: boolean;

  @Column({name: '', nullable: true, length: 20})
  phone: string;

  // Tỉnh, thành phố
  @Column({name: 'province', nullable: true, length: 40})
  province: string;

  // Quận huyện thị xã
  @Column({name: 'district', nullable: true, length: 40})
  district: string;

  // Phường xã thị trấn
  @Column({name: 'commune', nullable: true, length: 40})
  commune: string;

  // Địa chỉ cụ thể
  @Column({name: 'address_detail', nullable: true, length: 100})
  addressDetail: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE
  })
  status: UserStatus;
}

export class UserCreateEntity extends PartialType(UserEntity) {}
