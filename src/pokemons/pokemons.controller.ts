import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
    async create(@Body() createPokemonDto: CreatePokemonDto):Promise<Pokemon> {
      return this.pokemonsService.create(createPokemonDto);
    }
  
    @Get()
    async findAll():Promise<Pokemon[]> {
      return this.pokemonsService.findAll();
    }
  
    @Get('query1')
    async rutaQuery(@Query('pokemon') pokemon:string):Promise<Pokemon[]>{
          return this.pokemonsService.buscaPokemon(pokemon);
    }
    @Get('query2')
    async ruta(@Query('tipo') tipo:string):Promise<Pokemon[]>{
          return this.pokemonsService.buscaTipo(tipo);
    }
    @Get(':id')
    async findOne(@Param('id') id: string):Promise<Pokemon> {
      return this.pokemonsService.findOne(+id);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto):Promise<string> {
      return this.pokemonsService.update(+id, updatePokemonDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string):Promise<string> {
      return this.pokemonsService.remove(+id);
    }
  }
