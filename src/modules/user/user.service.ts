import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { constant } from 'core/default';
import { UpdateUserPersonalInfoInput } from './dto/update-user-personal-info.input';
import { UpdateUserResponseDTO } from './dto/update-user-response.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // find user by email when user exists
  async findByEmail(email: string) {
    return await UserEntity.findOne({
      where: {
        email: email,
      },
    });
  }

  // find user by id when user exists
  async findbyId(id: string) {
    return await UserEntity.findOne({
      where: {
        id: id,
      },
    });
  }
  // update user by id when user exists
  async updateUserPersonalInfo(
    id: string,
    input: UpdateUserPersonalInfoInput,
    reqUser: UserEntity,
  ) {
    if (reqUser.id !== id)
      throw new BadRequestException(constant.UNAUTHORIZED_OWNER_MESSAGE);

    const user = await this.findbyId(id);
    if (!user) throw new Error(constant.USER_NOT_EXIST);

    Object.assign(user, { ...input });

    const updatedUser = await user.save();

    const response: UpdateUserResponseDTO = {
      message: constant.UPDATE_USER_SUCCESSFUL,
      userData: updatedUser,
    };
    return response;
  }
}
