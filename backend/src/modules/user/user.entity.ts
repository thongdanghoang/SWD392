import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';
import {PartialType} from '@nestjs/swagger';

export enum UserStatus {
  ACTIVE,
  BANNED
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @VersionColumn()
  version: number;

  @CreateDateColumn({name: 'creation_date', nullable: false})
  creationDate: Date;

  @UpdateDateColumn({name: 'last_modification_date', nullable: true})
  lastModificationDate: Date;

  @Column({name: 'first_name', nullable: false, length: 30})
  firstName: string;

  @Column({name: 'last_name', nullable: false, length: 30})
  lastName: string;

  @Column({name: 'email', nullable: false, length: 100, unique: true})
  email: string;

  @Column({name: 'email_verified', nullable: false})
  emailVerified: boolean;

  @Column({name: 'phone', nullable: true, length: 20})
  phone: string;

  // Tỉnh, thành phố
  @Column({name: 'province_id', nullable: true})
  provinceId: number;

  // Quận huyện thị xã
  @Column({name: 'district_id', nullable: true})
  districtId: number;

  // Phường xã thị trấn
  @Column({name: 'commune_id', nullable: true})
  wardId: number;

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
