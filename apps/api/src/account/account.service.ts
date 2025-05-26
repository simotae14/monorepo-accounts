import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account)
    private accountRepository: typeof Account,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountRepository.create(
      createAccountDto as CreationAttributes<Account>,
    );
  }

  findAll() {
    return this.accountRepository.findAll();
  }

  // Delete an Account by ID => DELETE /submit/:id
  async remove(id: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id },
    });

    if (!account) {
      throw new NotFoundException('Account not found.');
    }

    await account.destroy();
    return account;
  }
}
