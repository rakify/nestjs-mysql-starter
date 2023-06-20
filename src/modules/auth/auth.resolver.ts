import { AuthService } from './auth.service';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { RegisterResponseDTO } from './dto/register-response.input';
import { LoginResponseDTO, ReturnUserData } from './dto/login-response.input';
import { RegisterUserDTO } from './dto/register-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorator/current-user.decoder';
import { UserEntity } from 'modules/user/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  // to register the user into the system
  @Mutation(() => RegisterResponseDTO, {
    description: 'to register user into the system',
  })
  registerUser(
    @Args('registerUser') registerUser: RegisterUserDTO,
  ): Promise<RegisterResponseDTO> {
    return this.authService.registerUser(registerUser);
  }

  @Mutation(() => LoginResponseDTO, {
    description: 'to login user into the system',
  })
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginResponseDTO> {
    return this.authService.signIn(email, password);
  }

  @UseGuards(AuthGuard)
  @Query(() => ReturnUserData)
  async getLoggedUser(@CurrentUser() reqUser: UserEntity) {
    return this.authService.getCurrentUser(reqUser);
  }
}
