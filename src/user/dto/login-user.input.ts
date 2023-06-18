import { InputType, OmitType } from '@nestjs/graphql';
import { RegisterUserDTO } from './register-user.input';

@InputType()
export class LoginUserDTO extends OmitType(RegisterUserDTO, [
  'Name',
] as const) {}
