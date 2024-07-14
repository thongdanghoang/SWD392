import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';
import {PartialType} from '@nestjs/swagger';
import {NotificationEntity} from './notification.entity';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED'
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

  @Column({name: 'avatar', nullable: true, length: 255})
  avatar: string;

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

  @Column({name: 'province_code', length: 10, nullable: true})
  provinceCode?: string;

  @Column({name: 'district_code', length: 10, nullable: true})
  districtCode?: string;

  @Column({name: 'ward_code', length: 10, nullable: true})
  wardCode?: string;

  @Column({name: 'address_detail', type: 'text', nullable: true})
  addressDetail?: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE
  })
  status: UserStatus;

  @OneToMany(
    () => NotificationEntity,
    (notification: NotificationEntity) => notification.user,
    {cascade: true, eager: true}
  )
  notifications: NotificationEntity[];
}

export class UserCreateEntity extends PartialType(UserEntity) {}
