import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  content: string;

  @Column()
  sender: string;

  @Column()
  receiver: string;

  @Column()
  createAt: Date;
}
