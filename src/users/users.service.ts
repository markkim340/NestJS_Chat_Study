import { Users } from './../entities/Users';
import { ForbiddenException, Injectable } from '@nestjs/common';
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
    await qureryRunner.startTransaction();

    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new ForbiddenException('이미 존재하는 사용자 입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      await qureryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });
      await qureryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log(error);
      await qureryRunner.rollbackTransaction();
      throw error;
    } finally {
      await qureryRunner.release();
    }
  }
}
