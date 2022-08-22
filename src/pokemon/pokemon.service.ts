import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { SearchPokemonDto } from './dto/search.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const createdPokemon = new this.pokemonModel(createPokemonDto);
      return createdPokemon.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon exists in db ${error.keyValue.name}`,
        );
      }

      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.pokemonModel.find().exec();
  }

  search(query: SearchPokemonDto) {
    const { limit } = query;
    const data = this.pokemonModel
      .find({
        name: {
          $regex: query.name,
          $options: 'xi',
        },
      })
      .limit(limit ? limit : 10);
    return data.exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
