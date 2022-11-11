import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuildsController } from './guilds.controller';
import { GuildsService } from './guilds.service';
import {
  BadgeRequests,
  BadgeRequestsSchema,
} from './schemas/badge-requests.schema';
import {
  BorrowerEarningHistory,
  BorrowerEarningHistorySchema,
} from './schemas/borrower-earning-history.schema';
import {
  BorrowerEarningStat,
  BorrowerEarningStatSchema,
} from './schemas/borrower-earning-stat.schema';
import { LenderInfo, LenderInfoSchema } from './schemas/lender-info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BadgeRequests.name, schema: BadgeRequestsSchema },
      { name: BorrowerEarningStat.name, schema: BorrowerEarningStatSchema },
      {
        name: BorrowerEarningHistory.name,
        schema: BorrowerEarningHistorySchema,
      },
      {
        name: LenderInfo.name,
        schema: LenderInfoSchema,
      },
    ]),
  ],
  controllers: [GuildsController],
  providers: [GuildsService],
})
export class GuildsModule {}
