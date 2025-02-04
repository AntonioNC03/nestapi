import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class PokemonsService {
  constructor(//Conexión con la base de datos
    @InjectRepository(Pokemon,'nestapi1')
    private pokemonRepository:Repository<Pokemon>
  ){}
async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
  const pokemon=this.pokemonRepository.create(createPokemonDto)
  return this.pokemonRepository.save(pokemon);
  
}

async findAll():Promise<Pokemon[]> {
  return this.pokemonRepository.find();
}

async findOne(id: number):Promise<Pokemon> {
  return this.pokemonRepository.findOne({where:{id}});
}

async update(id: number, updatePokemonDto: UpdatePokemonDto):Promise<string> {
  const pokemon=await this.findOne(id);
  this.pokemonRepository.merge(pokemon,updatePokemonDto);
  this.pokemonRepository.save(pokemon);
  return `El Pokemon con id=#${id} ha sido modificado`;
}

async remove(id: number):Promise<string> {
  const pokemon= await this.findOne(id);
  this.pokemonRepository.remove(pokemon);
  return "Pokemon de la base de datos eliminado";
}

async buscaPokemon(pokemon:string):Promise<Pokemon[]>{
  return this.pokemonRepository.find({where:{nombre: pokemon}})
}
async buscaTipo(tipo:string):Promise<Pokemon[]>{
  return this.pokemonRepository.find({where:{tipo}})
}
async buscaHP(hp:number):Promise<Pokemon[]>{
  return this.pokemonRepository.find({where:{hp:MoreThan(hp)}})
}
}