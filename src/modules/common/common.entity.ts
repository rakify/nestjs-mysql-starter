import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  Column,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class ExtendedBaseEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @Field()
  @Column({ type: 'varchar', length: 36 })
  createdBy: string;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @Field()
  @Column({ type: 'varchar', length: 36 })
  updatedBy: string;
}