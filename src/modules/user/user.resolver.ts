import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { constant } from 'core/default';
import { UserService } from './user.service';
import { LogOutUserDTO } from './dto/logout-user.input';
import { UpdateUserResponseDTO } from './dto/update-user-response.input';
import { UpdateUserPersonalInfoInput } from './dto/update-user-personal-info.input';
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // update user personal info
  @Mutation(() => UpdateUserResponseDTO, {
    description: 'to update user personal informations',
  })
  updateUserPersonalInfo(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserPersonalInfoInput,
  ): Promise<UpdateUserResponseDTO> {
    return this.userService.updateUserPersonalInfo(id, input);
  }
  // logout from the system
  @Query(() => LogOutUserDTO, { description: 'logout to the system' })
  logoutUser(): LogOutUserDTO {
    return { Message: constant.LOGOUT_SUCCESSFUL };
  }
}
