import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {
    nombre:string;
     tipo:string;
     hp: number;
     att: number;
     deff: number;
     spatt: number;
     spdef: number;
     speed: number;
}
