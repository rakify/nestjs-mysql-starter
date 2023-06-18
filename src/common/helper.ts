import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { constant } from './constant';

dotenv.config();

export interface IGenerateToken {
  ID: number;
  Name: string;
  Email: string;
}

const hashPassword = (plainPassword: string) =>
  bcrypt.hash(plainPassword, constant.HASH_SALT_COUNT);

const comparePassword = (plainPassword: string, hasPassword: string) =>
  bcrypt.compare(plainPassword, hasPassword);

const formatter = (value: number) => {
  const stringValue = Number(value).toFixed(2);
  return Number(stringValue);
};

export { hashPassword, comparePassword, formatter };
