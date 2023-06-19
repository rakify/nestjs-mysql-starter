import * as bcrypt from 'bcrypt';
import { constant } from '../default';
import { BadRequestException } from '@nestjs/common';

export interface IGenerateToken {
  ID: number;
  Name: string;
  Email: string;
}

const hashPassword = (plainPassword: string) =>
  bcrypt.hash(plainPassword, constant.HASH_SALT_COUNT);

const comparePassword = (plainPassword: string, hashPassword: string) =>
  bcrypt.compare(plainPassword, hashPassword);

const formatter = (value: number) => {
  const stringValue = Number(value).toFixed(2);
  return Number(stringValue);
};

/* 
   manual validation due to below issue 
   reference https://github.com/nestjs/passport/issues/129 
*/
const emailAndPasswordValidation = (email: string, password: string) => {
  // validate email
  const emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const emailValidationResult = emailRegex.test(email);
  if (!emailValidationResult) {
    throw new BadRequestException(constant.INVALID_EMAIL_FORMAT);
  }
  // manual password validation
  const passwordRegex = /^.{4,}$/;
  const passwordValidationResult = passwordRegex.test(password);
  if (!passwordValidationResult) {
    throw new BadRequestException(constant.WEAK_PASSWORD_MESSAGE);
  }
};

export { hashPassword, comparePassword, formatter, emailAndPasswordValidation };
