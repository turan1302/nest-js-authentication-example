import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
    nullable: false,
    length: 255,
  })
  username!: string;

  @Column({
    unique: true,
    nullable: false,
    length: 255,
  })
  email!: string;
}