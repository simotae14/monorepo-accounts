/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { validate } from 'class-validator';

describe('AccountService', () => {
  let service: AccountService;
  let mockAccountRepository: any;

  const validateDto = async (dtoData: Partial<CreateAccountDto>) => {
    const dto = Object.assign(new CreateAccountDto(), dtoData);
    return validate(dto);
  };
  // Mock data
  const validCreateAccountDto: CreateAccountDto = {
    firstName: 'Mario',
    lastName: 'Rossi',
    email: 'mario.rossi@example.com',
    dateOfBirth: '1990-05-15',
    fiscalCode: 'ABCDEF85S14F112Y', // The valid fiscal code from your validator
    street: 'Via Roma',
    numberAddress: 123,
    postalCode: '00100',
    province: 'Lazio',
    city: 'Viterbo',
    country: 'IT',
    isLivingHere: true,
    isPEP: false,
  };

  const mockCreatedAccount: Account = {
    id: '1',
    firstName: 'Mario',
    lastName: 'Rossi',
    email: 'mario.rossi@example.com',
    dateOfBirth: '1990-05-15',
    fiscalCode: 'ABCDEF85S14F112Y',
    street: 'Via Roma',
    numberAddress: 123,
    postalCode: '00100',
    province: 'Lazio',
    city: 'Viterbo',
    country: 'IT',
    isLivingHere: true,
    isPEP: false,
    createdAt: new Date('2023-01-01T10:00:00Z'),
    updatedAt: new Date('2023-01-01T10:00:00Z'),
  } as any;

  const mockAccountsList: Account[] = [
    mockCreatedAccount,
    {
      ...mockCreatedAccount,
      id: '2',
      firstName: 'Anna Giulia',
      lastName: 'Bianchi Lawrence',
      email: 'giulia.bianchi@example.com',
      fiscalCode: 'ABCDEF85S14F112Y',
    } as any,
  ];

  beforeEach(async () => {
    mockAccountRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getModelToken(Account),
          useValue: mockAccountRepository,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Service Initialization', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('create', () => {
    it('should successfully create an account with valid data', async () => {
      mockAccountRepository.create.mockResolvedValue(mockCreatedAccount);
      // validate the data
      const responseValidation = await validateDto({
        ...validCreateAccountDto,
      });
      expect(responseValidation.length).toBe(0);

      const result = await service.create(validCreateAccountDto);

      expect(mockAccountRepository.create).toHaveBeenCalledTimes(1);
      expect(mockAccountRepository.create).toHaveBeenCalledWith(
        validCreateAccountDto,
      );
      expect(result).toEqual(mockCreatedAccount);
      expect(result.fiscalCode).toBe('ABCDEF85S14F112Y');
      expect(result.country).toBe('IT');
    });

    it('should create account with optional fields undefined', async () => {
      const dtoWithoutOptionalFields: CreateAccountDto = {
        firstName: 'Luigi',
        lastName: 'Verdi',
        email: 'luigi.verdi@test.com',
        dateOfBirth: '1985-12-20',
        fiscalCode: 'ABCDEF85S14F112Y',
        street: 'Via Nazionale',
        numberAddress: 45,
        postalCode: '20121',
        province: 'Lombardia',
        city: 'Milano',
        country: 'IT',
        isLivingHere: undefined,
        isPEP: undefined,
      };

      const expectedAccount = {
        ...mockCreatedAccount,
        ...dtoWithoutOptionalFields,
      };

      mockAccountRepository.create.mockResolvedValue(expectedAccount);
      // validate the data
      const responseValidation = await validateDto({
        ...dtoWithoutOptionalFields,
      });
      expect(responseValidation.length).toBe(0);

      const result = await service.create(dtoWithoutOptionalFields);

      expect(mockAccountRepository.create).toHaveBeenCalledWith(
        dtoWithoutOptionalFields,
      );
      expect(result.isLivingHere).toBeUndefined();
      expect(result.isPEP).toBeUndefined();
    });
  });

  describe('findAll', () => {
    it('should return all accounts with complete data', async () => {
      mockAccountRepository.findAll.mockResolvedValue(mockAccountsList);

      const result = await service.findAll();

      expect(mockAccountRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('fiscalCode');
      expect(result[0]).toHaveProperty('country');
      expect(result[0].email).toContain('@');
      expect(result[1].firstName).toBe('Anna Giulia');
    });

    it('should return empty array when no accounts exist', async () => {
      mockAccountRepository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('DTO Validation Tests', () => {
    describe('firstName validation', () => {
      it('should fail validation for empty firstName', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          firstName: '',
        });

        expect(errors.length).toBeGreaterThan(0);

        const firstNameErrors = errors.find(
          (err) => err.property === 'firstName',
        );
        expect(firstNameErrors).toBeDefined();
        expect(firstNameErrors?.constraints).toHaveProperty('isNotEmpty');
        expect(firstNameErrors?.constraints?.isNotEmpty).toBe(
          'The first name cannot be empty',
        );
      });

      it('should fail validation for firstName with numbers', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          firstName: 'Mario123',
        });

        expect(errors.length).toBeGreaterThan(0);

        const firstNameErrors = errors.find(
          (err) => err.property === 'firstName',
        );
        expect(firstNameErrors).toBeDefined();
        expect(firstNameErrors?.constraints).toHaveProperty('matches');
        expect(firstNameErrors?.constraints?.matches).toBe(
          'The first name accepts only letters and blank spaces, no numbers or special characters',
        );
      });

      it('should fail validation for firstName too short', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          firstName: 'M',
        });

        expect(errors.length).toBeGreaterThan(0);

        const firstNameErrors = errors.find(
          (err) => err.property === 'firstName',
        );
        expect(firstNameErrors).toBeDefined();
        expect(firstNameErrors?.constraints).toHaveProperty('minLength');
        expect(firstNameErrors?.constraints?.minLength).toBe(
          'Please enter a first name longer than 2 characters',
        );
      });
    });

    describe('lastName validation', () => {
      it('should fail validation for empty lastName', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          lastName: '',
        });

        expect(errors.length).toBeGreaterThan(0);

        const lastNameErrors = errors.find(
          (err) => err.property === 'lastName',
        );
        expect(lastNameErrors).toBeDefined();
        expect(lastNameErrors?.constraints).toHaveProperty('isNotEmpty');
        expect(lastNameErrors?.constraints?.isNotEmpty).toBe(
          'The last name cannot be empty',
        );
      });

      it('should fail validation for lastName with special characters', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          lastName: 'Rossi@#$',
        });

        expect(errors.length).toBeGreaterThan(0);

        const lastNameErrors = errors.find(
          (err) => err.property === 'lastName',
        );
        expect(lastNameErrors).toBeDefined();
        expect(lastNameErrors?.constraints).toHaveProperty('matches');
        expect(lastNameErrors?.constraints?.matches).toBe(
          'The last name accepts only letters and blank space, no numbers or special characters',
        );
      });
    });

    describe('email validation', () => {
      it('should fail validation for invalid email format', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          email: 'invalid-email',
        });

        expect(errors.length).toBeGreaterThan(0);

        const emailErrors = errors.find((err) => err.property === 'email');
        expect(emailErrors).toBeDefined();
        expect(emailErrors?.constraints).toHaveProperty('isEmail');
        expect(emailErrors?.constraints?.isEmail).toBe(
          'Please enter a valid email',
        );
      });

      it('should fail validation for empty email', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          email: 'invalid-email',
        });

        expect(errors.length).toBeGreaterThan(0);

        const emailErrors = errors.find((err) => err.property === 'email');
        expect(emailErrors).toBeDefined();
        expect(emailErrors?.constraints).toHaveProperty('isEmail');
        expect(emailErrors?.constraints?.isEmail).toBe(
          'Please enter a valid email',
        );
      });
    });

    describe('dateOfBirth validation', () => {
      it('should fail validation for future date', async () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);

        const errors = await validateDto({
          ...validCreateAccountDto,
          dateOfBirth: futureDate.toISOString().split('T')[0],
        });

        expect(errors.length).toBeGreaterThan(0);
        const dateOfBirthErrors = errors.find(
          (err) => err.property === 'dateOfBirth',
        );
        expect(dateOfBirthErrors).toBeDefined();
        expect(dateOfBirthErrors?.constraints).toHaveProperty('isAdult');
        expect(dateOfBirthErrors?.constraints?.isAdult).toBe(
          'You must be at least 18 years old and the date cannot be in the future',
        );
      });

      it('should fail validation for minor (under 18)', async () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() - 10);

        const errors = await validateDto({
          ...validCreateAccountDto,
          dateOfBirth: futureDate.toISOString().split('T')[0],
        });

        expect(errors.length).toBeGreaterThan(0);
        const dateOfBirthErrors = errors.find(
          (err) => err.property === 'dateOfBirth',
        );
        expect(dateOfBirthErrors).toBeDefined();
        expect(dateOfBirthErrors?.constraints).toHaveProperty('isAdult');
        expect(dateOfBirthErrors?.constraints?.isAdult).toBe(
          'You must be at least 18 years old and the date cannot be in the future',
        );
      });

      it('should fail validation for invalid date format, an impossible date', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          dateOfBirth: '2000-02-30',
        });

        expect(errors.length).toBeGreaterThan(0);
        const dateOfBirthErrors = errors.find(
          (err) => err.property === 'dateOfBirth',
        );
        expect(dateOfBirthErrors).toBeDefined();
        expect(dateOfBirthErrors?.constraints).toHaveProperty('isAdult');
        expect(dateOfBirthErrors?.constraints?.isAdult).toBe(
          'You must be at least 18 years old and the date cannot be in the future',
        );
      });

      it('should fail validation for invalid date format, an impossible date', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          dateOfBirth: 'invalid-value',
        });

        expect(errors.length).toBeGreaterThan(0);
        const dateOfBirthErrors = errors.find(
          (err) => err.property === 'dateOfBirth',
        );
        expect(dateOfBirthErrors).toBeDefined();
        expect(dateOfBirthErrors?.constraints).toHaveProperty('isAdult');
        expect(dateOfBirthErrors?.constraints?.isAdult).toBe(
          'You must be at least 18 years old and the date cannot be in the future',
        );
      });
    });

    describe('fiscalCode validation', () => {
      it('should fail validation for wrong fiscal code format', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          fiscalCode: 'INVALID123456789',
        });

        expect(errors.length).toBeGreaterThan(0);
        const fiscalErrors = errors.find(
          (err) => err.property === 'fiscalCode',
        );
        expect(fiscalErrors?.constraints).toHaveProperty('matches');
        expect(fiscalErrors?.constraints?.matches).toBe(
          'The fiscal code needs to respect the correct format',
        );
      });

      it('should fail validation for fiscal code wrong length', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          fiscalCode: 'ABCDEF85S14F112', // 15 chars instead of 16
        });

        expect(errors.length).toBeGreaterThan(0);
        const fiscalErrors = errors.find(
          (err) => err.property === 'fiscalCode',
        );
        expect(fiscalErrors?.constraints).toHaveProperty('isLength');
        expect(fiscalErrors?.constraints?.isLength).toBe(
          'The fiscal code needs to be 16 characters long',
        );
      });

      it('should fail validation for invalid fiscal code  (not ABCDEF85S14F112Y)', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          fiscalCode: 'XXXXXX85S14F112Y', // Valid format but wrong code
        });

        expect(errors.length).toBeGreaterThan(0);
        const fiscalErrors = errors.find(
          (err) => err.property === 'fiscalCode',
        );
        expect(fiscalErrors?.constraints).toHaveProperty('isValidFiscalCode');
        expect(fiscalErrors?.constraints?.isValidFiscalCode).toBe(
          'The fiscal code needs to respect a valid italian format',
        );
      });
    });

    describe('address validation', () => {
      it('should fail validation for short street name', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          street: 'Via', // Too short
        });

        expect(errors.length).toBeGreaterThan(0);
        const streetErrors = errors.find((err) => err.property === 'street');
        expect(streetErrors?.constraints).toHaveProperty('minLength');
        expect(streetErrors?.constraints?.minLength).toBe(
          'Please enter a street name longer than 5 characters',
        );
      });

      it('should fail validation for invalid numberAddress', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          numberAddress: 0, // Must be at least 1
        });

        expect(errors.length).toBeGreaterThan(0);
        const numberErrors = errors.find(
          (err) => err.property === 'numberAddress',
        );
        expect(numberErrors?.constraints).toHaveProperty('min');
        expect(numberErrors?.constraints?.min).toBe(
          'Number Address must be at least 1',
        );
      });

      it('should fail validation for invalid postal code format', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          postalCode: '1234A', // Should be only digits
        });

        expect(errors.length).toBeGreaterThan(0);
        const postalCodeErrors = errors.find(
          (err) => err.property === 'postalCode',
        );
        expect(postalCodeErrors?.constraints).toHaveProperty('matches');
        expect(postalCodeErrors?.constraints?.matches).toBe(
          'The postal code accepts only digits',
        );
      });

      it('should fail validation for wrong postal code length', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          postalCode: '1234',
        });

        expect(errors.length).toBeGreaterThan(0);
        const postalCodeErrors = errors.find(
          (err) => err.property === 'postalCode',
        );
        expect(postalCodeErrors?.constraints).toHaveProperty('isLength');
        expect(postalCodeErrors?.constraints?.isLength).toBe(
          'The postal code needs to be 5 characters long',
        );
      });
    });

    describe('country validation', () => {
      it('should fail validation for invalid country code', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          country: 'XX', // Invalid country code
        });

        expect(errors.length).toBeGreaterThan(0);
        const countryErrors = errors.find((err) => err.property === 'country');
        expect(countryErrors?.constraints).toHaveProperty('isISO31661Alpha2');
        expect(countryErrors?.constraints?.isISO31661Alpha2).toBe(
          'Country must be a valid ISO 3166-1 alpha-2 code (e.g., IT, ES, DE, PT, FR)',
        );
      });

      it('should fail validation for unsupported country', async () => {
        const errors = await validateDto({
          ...validCreateAccountDto,
          country: 'US', // Valid ISO code but not in allowed list
        });

        expect(errors.length).toBeGreaterThan(0);
        const countryErrors = errors.find((err) => err.property === 'country');
        expect(countryErrors?.constraints).toHaveProperty('isIn');
        expect(countryErrors?.constraints?.isIn).toBe(
          'Country must be one of: IT, ES, DE, PT, FR',
        );
      });
    });
  });
});
