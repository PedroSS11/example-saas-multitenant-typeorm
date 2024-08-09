import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
export class CreateUserDTO {
  @IsString()
  @Expose()
  firstName: string;

  @IsString()
  @Expose()
  lastName: string;

  @IsString()
  @Expose()
  age: number;

  @IsString()
  @Expose()
  gender: string;
}
