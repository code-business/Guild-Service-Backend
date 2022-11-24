import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuildsController } from './guilds.controller';
import { GuildsService } from './guilds.service';
import {
  BadgeRequests,
  BadgeRequestsSchema,
} from './schemas/badge-requests.schema';
import {
  BadgeHistory,
  BadgeHistorySchema,
} from './schemas/badge-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BadgeRequests.name, schema: BadgeRequestsSchema },
      { name: BadgeHistory.name, schema: BadgeHistorySchema },
    ]),
    HttpModule,
  ],
  controllers: [GuildsController],
  providers: [GuildsService],
})
export class GuildsModule {}
