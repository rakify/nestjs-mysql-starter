import { Query, Resolver } from '@nestjs/graphql';
import { constant } from 'core/default';
import { UserService } from './user.service';
import { LogOutUserDTO } from './dto/logout-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // logout from the system
  @Query(() => LogOutUserDTO, { description: 'logout to the system' })
  logoutUser(): LogOutUserDTO {
    return { Message: constant.LOGOUT_SUCCESSFUL };
  }
}
