import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { constant } from 'core/default';
import { UpdateUserPersonalInfoInput } from './dto/update-user-personal-info.input';
import { UpdateUserResponseDTO } from './dto/update-user-response.input';

interface FindUserOptions {
  email?: string;
  id?: string;
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // find user by email when user exists
  async findUser(options: FindUserOptions) {
    const { email, id } = options;
    const query = {};
    if (email) {
      query['email'] = email;
    }
    if (id) {
      query['id'] = id;
    }
    const user = await this.userRepository.findOne({ where: query });
    if (!user) {
      throw new NotFoundException(constant.USER_DOES_NOT_EXIST);
    }

    return user;
  }

  // update user by id when user exists
  async updateUserPersonalInfo(id: string, input: UpdateUserPersonalInfoInput) {
    const user = await this.findUser({ id });
    Object.assign(user, { ...input });
    const updatedUser = await user.save();
    const response: UpdateUserResponseDTO = {
      message: constant.UPDATE_USER_SUCCESSFUL,
      userData: updatedUser,
    };
    return response;
  }
}
