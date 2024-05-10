import {Column, Entity, PrimaryGeneratedColumn, VersionColumn} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @VersionColumn()
  version: number;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({default: true})
  isActive: boolean;
}
