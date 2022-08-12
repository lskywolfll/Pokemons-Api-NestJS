import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  @Transform((T) => T.value.toLocaleLowerCase())
  name: string;

  @IsNumber()
  @IsNotEmpty()
  no: number;
}
