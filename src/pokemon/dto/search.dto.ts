import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchPokemonDto {
  @IsNumber()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  name: string;
}
