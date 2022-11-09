/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuildsModule } from './guilds/guilds.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root:root1234@cluster0.skixv.mongodb.net/guilds'),
    GuildsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
