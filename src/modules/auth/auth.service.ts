import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { constant } from 'core/default';
import { comparePassword, hashPassword } from 'core/helper';
import { RegisterUserDTO } from './dto/register-user.input';
import { UserEntity } from 'modules/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReturnUserData } from './dto/login-response.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  // to register the user into the system
  async registerUser(registerUserData: RegisterUserDTO): Promise<any> {
    const { email, password } = registerUserData;

    const lowerEmail = email.toLowerCase();
    const user = await this.userRepository.findOne({
      where: { email: lowerEmail },
      select: ['email'],
    });
    if (user && user.email) {
      throw new BadRequestException(constant.USER_ALREADY_EXIST);
    }
    const hashPasswordValue = await hashPassword(password);

    const dataObject: RegisterUserDTO = {
      email: lowerEmail,
      password: hashPasswordValue,
    };
    const newUserData = this.userRepository.create(dataObject);
    const newUser = await this.userRepository.save(newUserData);
    const payload = { email: newUser.email, accessRole: newUser.accessRole };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      message: constant.REGISTER_SUCCESSFUL,
      userData: newUser,
      access_token,
    };
  }

  // login into the system
  async signIn(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email.toLowerCase());
    if (!user) {
      throw new UnauthorizedException(constant.PROVIDED_WRONG_EMAIL);
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException(constant.PROVIDED_WRONG_PASSWORD);
    }

    const payload = { email: user.email, accessRole: user.accessRole };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      message: constant.LOGIN_SUCCESSFUL,
      userData: user,
      access_token,
    };
  }

  async getCurrentUser(reqUser: UserEntity): Promise<ReturnUserData> {
    return reqUser;
  }

  async findByEmail(email: string) {
    return await UserEntity.findOne({
      where: {
        email: email,
      },
    });
  }

  async findbyId(id: string) {
    return await UserEntity.findOne({
      where: {
        id: id,
      },
    });
  }
}
