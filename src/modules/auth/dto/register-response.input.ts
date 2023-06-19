import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { UserEntity } from '../../user/user.entity';
import { constant } from 'core/default';

@ObjectType()
export class RegisteredUserData extends OmitType(UserEntity, [
  'password',
  'isActive',
] as const) {}

@ObjectType()
export class RegisterResponseDTO {
  @Field({ defaultValue: constant.REGISTER_SUCCESSFUL })
  registerMessage: string;

  @Field({ nullable: true })
  access_token: string;

  @Field(() => RegisteredUserData, { nullable: true })
  userData: RegisteredUserData;
}
