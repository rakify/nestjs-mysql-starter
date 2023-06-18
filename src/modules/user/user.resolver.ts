import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { constant } from 'core/default';
import { User } from 'core/custom_decoder/user.decoder';
import { UserEntity } from './user.entity';
import { LoginUserDTO } from './dto/login-user.input';
import { RegisterUserDTO } from './dto/register-user.input';
import { UserService } from './user.service';
import { LogOutUserDTO } from './dto/logout-user.input';
import { UserDecoderData, loginResponseDTO } from './dto/login-response.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // to register the user into the system
  @Mutation(() => UserEntity, {
    description: 'to register the user into the system',
  })
  registerUser(
    @Args('registerUser') registerUser: RegisterUserDTO,
  ): Promise<UserEntity> {
    return this.userService.registerUser(registerUser);
  }

  // login into the system
  // @UseGuards(GQLAuthGuard, ActivateSession, IsAuthenticated)
  @Query(() => loginResponseDTO, { description: 'login into the system' })
  async userLogin(
    @Args('UserLoginData') userLoginData: LoginUserDTO,
    @User() user: UserDecoderData,
  ): Promise<loginResponseDTO> {
    return { loginMessage: constant.LOGIN_SUCCESSFUL, userData: user };
  }

  // logout to the system
  // @UseGuards(Logout)
  @Query(() => LogOutUserDTO, { description: 'logout to the system' })
  logoutUser(): LogOutUserDTO {
    return { Message: constant.LOGOUT_SUCCESSFUL };
  }
}
