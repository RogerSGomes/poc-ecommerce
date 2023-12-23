import { ArrayNotEmpty, IsArray, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateProductDTO {
  @IsString({ message: 'O nome do produto deve ser informado.' })
  @Expose()
  name!: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O valor do produto deve ser informado e deve conter até duas casas decimais.' }
  )
  @IsPositive({ message: 'O valor do produto deve ser maior que 0.' })
  @Expose()
  price!: number;

  @IsArray({ message: 'As categorias devem ser informadas no formato de lista.' })
  @ArrayNotEmpty({ message: 'Informe ao menos uma categoria para o produto.' })
  @IsUUID('4', { each: true, message: 'A lista deve conter apenas os IDs das categorias.' })
  @Expose()
  categories!: string[];
}
