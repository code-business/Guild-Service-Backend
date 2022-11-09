import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';
import { GuildsService } from './guilds.service';

@ApiTags('guilds')
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
