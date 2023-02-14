import { Users } from './../entities/Users';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}

  async createUsers(email: string, nickname: string, password: string) {
    const qureryRunner = this.dataSource.createQueryRunner();
    await qureryRunner.connect();
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      await qureryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
