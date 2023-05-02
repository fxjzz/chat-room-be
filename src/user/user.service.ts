import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<any>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    //密码
    const msg = users.map((user) => {
      const { password, ...info } = user;
      return info;
    });
    return msg;
  }

  async findOne(name: string) {
    const res = await this.userRepository.findOne({
      where: {
        username: name,
      },
    });
    return res;
  }

  async deleteOne(id: string) {
    const user = await this.userRepository.delete(id);
    return user;
  }
}
