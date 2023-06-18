import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { UserEntity } from '../user.entity';

@ObjectType()
export class UserDecoderData extends PickType(UserEntity, [
  'ID',
  'Name',
  'Email',
] as const) {}

@ObjectType()
export class loginResponseDTO {
  @Field()
  loginMessage: string;

  @Field(() => UserDecoderData)
  userData: UserDecoderData;
}
