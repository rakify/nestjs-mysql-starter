import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { constant } from 'core/default';
import { UserService } from './user.service';
import { LogOutUserDTO } from './dto/logout-user.input';
import { UpdateUserResponseDTO } from './dto/update-user-response.input';
import { UpdateUserPersonalInfoInput } from './dto/update-user-personal-info.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'modules/auth/guards/auth.guard';
import { CurrentUser } from 'modules/auth/decorator/current-user.decoder';
import { UserEntity } from './user.entity';
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // update user personal info
  @UseGuards(AuthGuard)
  @Mutation(() => UpdateUserResponseDTO, {
    description: 'to update user personal informations',
  })
  updateUserPersonalInfo(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserPersonalInfoInput,
    @CurrentUser() reqUser: UserEntity,
  ): Promise<UpdateUserResponseDTO> {
    return this.userService.updateUserPersonalInfo(id, input, reqUser);
  }
  // logout from the system
  @Query(() => LogOutUserDTO, { description: 'logout to the system' })
  logoutUser(): LogOutUserDTO {
    return { Message: constant.LOGOUT_SUCCESSFUL };
  }
}
