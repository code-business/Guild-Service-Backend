import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuildsService } from './guilds.service';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';

@Controller('guilds')
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Post()
  create(@Body() createGuildDto: CreateGuildDto) {
    return this.guildsService.create(createGuildDto);
  }

  @Get()
  findAll() {
    return this.guildsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guildsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuildDto: UpdateGuildDto) {
    return this.guildsService.update(+id, updateGuildDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guildsService.remove(+id);
  }
}
