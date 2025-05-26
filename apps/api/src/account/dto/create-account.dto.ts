import { Transform } from 'class-transformer';

export class CreateAccountDto {
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(1, {
  //   message: 'Please enter a name for the product.',
  // })
  // readonly name: string;
  // @IsNotEmpty()
  // @IsString()
  // @IsUrl(undefined, {
  //   message: 'Please enter a valid URL including starting with https://',
  // })
  // readonly link: string;
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(5, {
  //   message: 'Coupon code must be at least 5 characters long',
  // })
  // readonly coupon: string;
  // @IsNotEmpty()
  // @Transform(({ value }) => {
  //   const num = Number(value);
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //   return isNaN(num) ? value : num; // Return original value if not a valid number, let validation handle it
  // })
  // @IsNumber(undefined, {
  //   message: 'Discount must be a valid number',
  // })
  // @Min(1, {
  //   message: 'Discount must be at least 1%',
  // })
  // @Max(100, {
  //   message: 'Discount must be at most 100%',
  // })
  // readonly discount: number;
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(5, {
  //   message: 'Please enter a contact name of at least 5 characters long',
  // })
  // readonly contactName: string;
  // @IsNotEmpty()
  // @IsString()
  // @IsEmail(undefined, {
  //   message: 'Please enter a valid email',
  // })
  // readonly contactEmail: string;
}
