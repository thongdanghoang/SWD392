import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import {UserEntity} from './user.entity';

export enum NotificationType {
  EXCHANGE_REQUEST
}

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn({name: 'creation_date', nullable: false})
  creationDate: Date;

  @Column({
    name: 'type',
    type: 'enum',
    enum: NotificationType,
    nullable: false
  })
  type: NotificationType;

  @Column({name: 'title', nullable: false})
  title: string;

  @Column({name: 'content', nullable: false})
  content: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.notifications)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;

  @Column({name: 'exchange_id', type: 'uuid', nullable: true})
  exchangeId: number;
}
