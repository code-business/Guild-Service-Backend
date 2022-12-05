import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuildsModule } from './guilds/guilds.module';
import constants from './constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(constants.MONGO_URL),
    GuildsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
