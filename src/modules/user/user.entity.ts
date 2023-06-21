import { Field, ObjectType } from '@nestjs/graphql';
import { ExtendedBaseEntity } from 'modules/common/common.entity';
import { Column, Entity, Index } from 'typeorm';
import { UserAccessRole } from './user.interface';
@ObjectType({ description: 'user entity' })
@Entity({ name: 'User' })
export class UserEntity extends ExtendedBaseEntity {
  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Field()
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Field()
  @Column({
    name: 'password',
    type: 'text',
    comment: 'hashed password of the user',
    nullable: false,
  })
  password: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  avatarLink: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  coverLink: string;

  @Field()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 10, nullable: true })
  country: string;

  @Field(() => UserAccessRole)
  @Column({
    type: 'enum',
    enum: UserAccessRole,
    default: UserAccessRole.Customer,
  })
  accessRole: UserAccessRole;
}
