import { InjectRepository } from '@nestjs/typeorm';
import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { constant } from 'core/default';
import { comparePassword, hashPassword } from 'core/helper';
import { LoginUserDTO } from './dto/login-user.input';
import { RegisterUserDTO } from './dto/register-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // to register the user into the system
  async registerUser(registerUserData: RegisterUserDTO): Promise<UserEntity> {
    const { Name, Email, Password } = registerUserData;

    const lowerEmail = Email.toLowerCase();
    const findOneData = await this.userRepository.findOne({
      where: { Email: lowerEmail },
      select: ['Email'],
    });
    if (findOneData && findOneData.Email) {
      throw new BadRequestException(constant.USER_ALREADY_EXIST);
    }
    const hashPasswordValue = await hashPassword(Password);

    const dataObject: RegisterUserDTO = {
      Name,
      Email: lowerEmail,
      Password: hashPasswordValue,
    };
    const createUserQuery = this.userRepository.create(dataObject);
    const saveUserData: UserEntity = await this.userRepository.save(
      createUserQuery,
    );
    return saveUserData;
  }

  // login into the system
  async userLogin(userLoginData: LoginUserDTO): Promise<UserEntity> {
    const { Email, Password } = userLoginData;
    const lowerEmail = Email.toLowerCase();
    const findUserData = await this.userRepository.findOne({
      where: {
        Email: lowerEmail,
      },
      select: ['ID', 'Email', 'Name', 'Password'],
    });
    if (!findUserData) {
      throw new NotFoundException(constant.EMAIL_NOT_FOUND);
    }
    const IsValidPassword = await comparePassword(
      Password,
      findUserData.Password,
    );
    if (!IsValidPassword) {
      throw new BadGatewayException(constant.PROVIDED_WRONG_PASSWORD);
    }
    delete findUserData.Password;
    return findUserData;
  }
  // find by UserID whether user exist or not
  async findByUserID(userID: number) {
    const findUser = await this.userRepository.findOne({
      where: { ID: userID },
      select: ['ID'],
    });
    if (!findUser) {
      throw new NotFoundException(constant.USER_DOES_NOT_EXIST);
    }
    return findUser;
  }
}
