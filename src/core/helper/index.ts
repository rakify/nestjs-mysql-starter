import * as bcrypt from 'bcrypt';
import { constant } from '../default';

export interface IGenerateToken {
  ID: number;
  Name: string;
  Email: string;
}

const hashPassword = (plainPassword: string) =>
  bcrypt.hash(plainPassword, constant.HASH_SALT_COUNT);

const comparePassword = (plainPassword: string, hashPassword: string) =>
  bcrypt.compare(plainPassword, hashPassword);

export { hashPassword, comparePassword };
