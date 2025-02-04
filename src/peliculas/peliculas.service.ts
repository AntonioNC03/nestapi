import { Injectable } from '@nestjs/common';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';

@Injectable()
export class PeliculasService {
  constructor(//Conexión con la base de datos
    @InjectRepository(Pelicula,'nestapi1')
    private peliculaRepository:Repository<Pelicula>
  ){}
async create(createPeliculaDto: CreatePeliculaDto): Promise<Pelicula> {
  const pelicula=this.peliculaRepository.create(createPeliculaDto)
  return this.peliculaRepository.save(pelicula);
  
}

async findAll():Promise<Pelicula[]> {
  return this.peliculaRepository.find();
}

async findOne(id: number):Promise<Pelicula> {
  return this.peliculaRepository.findOne({where:{id}});
}

async update(id: number, UpdatePeliculaDto: UpdatePeliculaDto):Promise<string> {
  const pelicula=await this.findOne(id);
  this.peliculaRepository.merge(pelicula,UpdatePeliculaDto);
  this.peliculaRepository.save(pelicula);
  return `La Pelicula con id=#${id} ha sido modificado`;
}

async remove(id: number):Promise<string> {
  const pelicula= await this.findOne(id);
  this.peliculaRepository.remove(pelicula);
  return "Pelicula de la base de datos eliminado";
}

async buscaPelicula(pelicula:string):Promise<Pelicula[]>{
  return this.peliculaRepository.find({where:{titulo: pelicula}})
}
async buscaAño(año:number):Promise<Pelicula[]>{
  return this.peliculaRepository.find({where:{año:LessThan(año)}})
}
}
