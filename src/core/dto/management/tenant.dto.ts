import { IsDate, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
export class CreateTenantDTO {
  @IsString()
  @Expose()
  full_name: string;

  @IsString()
  @Expose()
  cnpj: string;

  @IsString()
  @Expose()
  adress: string;
}
