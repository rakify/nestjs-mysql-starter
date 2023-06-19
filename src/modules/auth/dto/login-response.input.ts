import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { UserEntity } from '../../user/user.entity';
import { constant } from 'core/default';

@ObjectType()
export class LoggedInUserData extends OmitType(UserEntity, [
  'password',
  'isActive',
] as const) {}

@ObjectType()
export class LoginResponseDTO {
  @Field({ defaultValue: constant.LOGIN_SUCCESSFUL })
  loginMessage: string;

  @Field({ nullable: true })
  access_token: string;

  @Field(() => LoggedInUserData, { nullable: true })
  userData: LoggedInUserData;
}
