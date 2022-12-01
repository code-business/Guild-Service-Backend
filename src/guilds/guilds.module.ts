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
  BadgeRecords,
  BadgeRecordsSchema,
} from './schemas/badge-records.schema';
import { CardinalService } from './cardinal/cardinal.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BadgeRequests.name, schema: BadgeRequestsSchema },
      { name: BadgeRecords.name, schema: BadgeRecordsSchema },
    ]),
    HttpModule,
  ],
  controllers: [GuildsController],
  providers: [GuildsService, CardinalService],
})
export class GuildsModule {}
