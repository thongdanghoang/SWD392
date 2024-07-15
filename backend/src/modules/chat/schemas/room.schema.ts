import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  buyerId: string;

  @Column()
  sellerId: string;

  @Column({unique: true})
  roomId: string;
}
