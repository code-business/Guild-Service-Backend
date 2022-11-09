import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';
import { Guild, GuildDocument } from './schemas/guild.schema';

@Injectable()
export class GuildsService {
  constructor(
    @InjectModel(Guild.name) private guildModel: Model<GuildDocument>,
  ) {}

  create(createGuildDto: CreateGuildDto) {
    const createdGuild = new this.guildModel(createGuildDto);
    return createdGuild.save();
    // return 'This action adds a new guild';
  }

  findAll() {
    return this.guildModel.find().exec();
    // return `This action returns all guilds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guild`;
  }

  update(id: number, updateGuildDto: UpdateGuildDto) {
    return `This action updates a #${id} guild`;
  }

  remove(id: number) {
    return `This action removes a #${id} guild`;
  }
}
