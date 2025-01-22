import { BaseEntity } from "../../config/base.entity";

export class User extends BaseEntity {
  email: string;
  accountNumber: number;

  constructor({
    id,
    email,
    accountNumber,
  }: {
    id: number;
    email: string;
    accountNumber: number;
  }) {
    super(id);
    this.email = email;
    this.accountNumber = accountNumber;
  }
}
