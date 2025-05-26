/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';
import {
  IsString,
  Matches,
  MinLength,
  IsNotEmpty,
  IsEmail,
  IsDateString,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
  Length,
  IsOptional,
  IsNumber,
  Min,
  IsISO31661Alpha2,
  IsIn,
  IsBoolean,
} from 'class-validator';

// define a custom constraint for the dateOfBirth to check if the account user is an adult
@ValidatorConstraint({
  name: 'isAdult',
  async: false,
})
export class IsAdultConstraint implements ValidatorConstraintInterface {
  validate(dateOfBirth: string) {
    if (!dateOfBirth) return false;

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    // check if date is valid
    if (isNaN(birthDate.getTime())) return false;

    // Check if date is not in the future
    if (birthDate > today) return false;

    // Check if date is not an invalid date like 2000-02-30
    const dateStr = dateOfBirth.split('T')[0];
    const [year, month, day] = dateStr.split('-').map(Number);
    if (year < 1900 || year > new Date().getFullYear()) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    // Check if date was auto-corrected
    if (
      !(
        birthDate.getFullYear() === year &&
        birthDate.getMonth() === month - 1 &&
        birthDate.getDate() === day
      )
    ) {
      return false;
    }

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 18;
  }

  defaultMessage() {
    return 'You must be at least 18 years old and the date cannot be in the future';
  }
}

// define a custom constraint for the fiscalCode to check if the fiscal code is ABCDEF85S14F112Y
@ValidatorConstraint({
  name: 'isValidFiscalCode',
  async: true,
})
export class IsValidFiscalCodeConstraint
  implements ValidatorConstraintInterface
{
  async validate(fiscalCode: string) {
    if (!fiscalCode) return false;

    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    return fiscalCode === 'ABCDEF85S14F112Y';
  }

  defaultMessage() {
    return 'The fiscal code needs to respect a valid italian format';
  }
}

export class CreateAccountDto {
  @IsNotEmpty({
    message: 'The first name cannot be empty',
  })
  @IsString()
  @MinLength(2, {
    message: 'Please enter a first name longer than 2 characters',
  })
  @Matches(/^[A-Za-z ]*$/, {
    message:
      'The first name accepts only letters and blank spaces, no numbers or special characters',
  })
  readonly firstName: string;

  @IsNotEmpty({
    message: 'The last name cannot be empty',
  })
  @IsString()
  @MinLength(2, {
    message: 'Please enter a last name longer than 2 characters',
  })
  @Matches(/^[A-Za-z ]*$/, {
    message:
      'The last name accepts only letters and blank space, no numbers or special characters',
  })
  readonly lastName: string;

  @IsNotEmpty({
    message: 'The email cannot be empty',
  })
  @IsString()
  @IsEmail(undefined, {
    message: 'Please enter a valid email',
  })
  readonly email: string;

  @IsNotEmpty({
    message: 'The date of birth cannot be empty',
  })
  @IsDateString(undefined, {
    message: 'Invalid date format',
  })
  @Validate(IsAdultConstraint)
  readonly dateOfBirth: string;

  @IsNotEmpty({
    message: 'The fiscal code cannot be empty',
  })
  @IsString()
  @Length(16, 16, {
    message: 'The fiscal code needs to be 16 characters long',
  })
  @Matches(/^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/, {
    message: 'The fiscal code needs to respect the correct format',
  })
  @Validate(IsValidFiscalCodeConstraint)
  readonly fiscalCode: string;

  @IsNotEmpty({
    message: 'The street name cannot be empty',
  })
  @IsString()
  @MinLength(5, {
    message: 'Please enter a street name longer than 5 characters',
  })
  @Matches(/^[A-Za-z ]*$/, {
    message:
      'The street name accepts only letters and blank space, no numbers or special characters',
  })
  readonly street: string;

  @IsNotEmpty({
    message: 'The number of the address cannot be empty',
  })
  @Transform(({ value }) => {
    const num = Number(value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return isNaN(num) ? value : num; // Return original value if not a valid number, let validation handle it
  })
  @IsNumber(undefined, {
    message: 'Number Address must be a valid number',
  })
  @Min(1, {
    message: 'Number Address must be at least 1',
  })
  readonly numberAddress: number;

  @IsNotEmpty({
    message: 'The postal code cannot be empty',
  })
  @IsString()
  @Length(5, 5, {
    message: 'The postal code needs to be 5 characters long',
  })
  @Matches(/^[0-9]*$/, {
    message: 'The postal code accepts only digits',
  })
  readonly postalCode: string;

  @IsNotEmpty({
    message: 'The province name cannot be empty',
  })
  @IsString()
  @MinLength(5, {
    message: 'Please enter a province name longer than 5 characters',
  })
  @Matches(/^[A-Za-z ]*$/, {
    message:
      'The province name accepts only letters and blank space, no numbers or special characters',
  })
  readonly province: string;

  @IsNotEmpty({
    message: 'The city name cannot be empty',
  })
  @IsString()
  @MinLength(5, {
    message: 'Please enter a city name longer than 5 characters',
  })
  @Matches(/^[A-Za-z ]*$/, {
    message:
      'The city name accepts only letters and blank space, no numbers or special characters',
  })
  readonly city: string;

  @IsNotEmpty({
    message: 'The country name cannot be empty',
  })
  @IsString()
  @IsISO31661Alpha2({
    message:
      'Country must be a valid ISO 3166-1 alpha-2 code (e.g., IT, ES, DE, PT, FR)',
  })
  @IsIn(['IT', 'ES', 'DE', 'PT', 'FR'], {
    message: 'Country must be one of: IT, ES, DE, PT, FR',
  })
  readonly country: string;

  @IsOptional()
  @IsBoolean()
  readonly isLivingHere?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isPEP?: boolean;
}
