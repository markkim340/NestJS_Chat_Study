import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'chatapp', name: 'users' })
export class Users {
  @PrimaryColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;
}
