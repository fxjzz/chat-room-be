import { ConflictException, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

let myUsername;
let mySub;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<any>,
  ) {}

  async login(userMsg: User) {
    const payload = { username: userMsg.username, pwd: userMsg.password };
    myUsername = userMsg.username;
    mySub = userMsg.password;
    return {
      code: '200',
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: 'refreshKey',
        expiresIn: '24h',
      }),
      msg: '登录成功',
    };
  }

  async register(createUserDto: CreateUserDto) {
    let user = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });
    const payload = {
      username: createUserDto.username,
      pwd: createUserDto.password,
    };

    if (user) {
      throw new ConflictException('用户已存在');
    } else {
      user = this.userRepository.create(createUserDto);
      this.userRepository.save(user);
    }

    return {
      code: 201,
      msg: '注册成功!',
      access_token: this.jwtService.sign(payload),
    };
  }

  async refreshToken() {
    const payload = { username: myUsername, pwd: mySub };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }
}
