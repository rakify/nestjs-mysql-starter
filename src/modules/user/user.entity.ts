import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ExtendedBaseEntity } from 'modules/common/common.entity';
import { Column, Entity } from 'typeorm';

export enum UserAccessRole {
  /**
   * 1. Can purchase products
   * 2. Can ask question about products
   * 3. Can follow shops
   */
  Customer = 'customer',
  /**
   * 1. Can own shop
   * 2. Can create, update & manage products
   * 3. Can create, update & manage orders
   */
  Salesman = 'salesman',
  /**
   * 1. Can add new salesman and customer
   * 2. Can remove salesman and customer
   * 3. Can manage followers list
   * 4. Can purchase products
   */
  Admin = 'admin',
  /**
   * 1. Can add customer and make customers admin or saleman
   * 2. Can remove customer and admin
   * 3. Can add, edit and manage orders or products
   * 4. Can manage followers list
   */
  SuperAdmin = 'super-admin',
}
registerEnumType(UserAccessRole, { name: 'UserAccessRole' });

@ObjectType({ description: 'user entity' })
@Entity({ name: 'User' })
export class UserEntity extends ExtendedBaseEntity {
  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, unique: true })
  userId: string;

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
