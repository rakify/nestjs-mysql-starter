import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from './auth.guard';
import { RegisterResponseDTO } from './dto/register-response.input';
import { RegisterUserDTO } from './dto/register-user.input';
import { LoginResponseDTO } from './dto/login-response.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  // to register the user into the system
  @Public()
  @Mutation(() => RegisterResponseDTO, {
    description: 'to register user into the system',
  })
  registerUser(
    @Args('registerUser') registerUser: RegisterUserDTO,
  ): Promise<RegisterResponseDTO> {
    return this.authService.registerUser(registerUser);
  }

  @Public()
  @Mutation(() => LoginResponseDTO, {
    description: 'to login user into the system',
  })
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginResponseDTO> {
    return this.authService.signIn(email, password);
  }
}
