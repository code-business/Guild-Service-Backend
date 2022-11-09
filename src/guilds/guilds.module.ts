import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuildsController } from './guilds.controller';
import { GuildsService } from './guilds.service';
import { Guild, GuildSchema } from './schemas/guild.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }]),
  ],
  controllers: [GuildsController],
  providers: [GuildsService],
})
export class GuildsModule {}
