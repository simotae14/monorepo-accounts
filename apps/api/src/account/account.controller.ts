import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@ApiTags('submit')
@Controller('submit')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Create a new account' })
  @ApiCreatedResponse({ type: Account })
  @ApiBody({ type: CreateAccountDto })
  @Post()
  create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountService.create(createAccountDto);
  }

  @ApiOperation({ summary: 'Find all accounts' })
  @ApiOkResponse({ type: [Account] })
  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @ApiOperation({ summary: 'Delete an account by ID' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  @ApiOkResponse({ type: Account })
  @Delete(':id')
  async deleteAccount(@Param('id') id: string): Promise<Account> {
    return this.accountService.remove(id);
  }
}
