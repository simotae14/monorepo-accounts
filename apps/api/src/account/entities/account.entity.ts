import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'account',
})
export class Account extends Model<Account> {
  @Column
  email: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  dateOfBirth: string;

  @Column
  fiscalCode: string;

  @Column
  street: string;

  @Column
  numberAddress: number;

  @Column
  postalCode: string;

  @Column
  province: string;

  @Column
  city: string;

  @Column
  country: string;

  @Column
  isLivingHere: boolean;

  @Column
  isPEP: boolean;
}
