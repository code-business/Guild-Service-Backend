import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBadgeRequestDto } from './dto/create-badge-request.dto';
import { CreateBorrowerEarningHistoryDto } from './dto/create-borrower-earning-history.dto';
import { CreateBorrowerEarningStatDto } from './dto/create-borrower-earning-stat.dto';
import { CreateLenderInfoDto } from './dto/create-lender-info.dto';
import {
  BadgeRequests,
  BadgeRequestsDocument,
} from './schemas/badge-requests.schema';
import {
  BorrowerEarningHistory,
  BorrowerEarningHistoryDocument,
} from './schemas/borrower-earning-history.schema';
import {
  BorrowerEarningStat,
  BorrowerEarningStatDocument,
} from './schemas/borrower-earning-stat.schema';
import { LenderInfo, LenderInfoDocument } from './schemas/lender-info.schema';

@Injectable()
export class GuildsService {
  constructor(
    @InjectModel(BadgeRequests.name)
    private badgeRequestsModel: Model<BadgeRequestsDocument>,
    @InjectModel(BorrowerEarningStat.name)
    private borrowerEarningStatModel: Model<BorrowerEarningStatDocument>,
    @InjectModel(BorrowerEarningHistory.name)
    private borrowerEarningHistoryModel: Model<BorrowerEarningHistoryDocument>,
    @InjectModel(LenderInfo.name)
    private lenderInfoModel: Model<LenderInfoDocument>,
  ) {}

  totalBadgeRequests(userId: string) {
    return this.badgeRequestsModel.count({ requesterUserId: userId });
  }

  createBadgeRequest(createBadgeRequestDto: CreateBadgeRequestDto) {
    const createdBadgeRequest = new this.badgeRequestsModel(
      createBadgeRequestDto,
    );
    return createdBadgeRequest.save();
  }

  createBorrowerEarningStat(
    createBorrowerEarningStatDto: CreateBorrowerEarningStatDto,
  ) {
    const createdBorrowerEarningStat = new this.borrowerEarningStatModel(
      createBorrowerEarningStatDto,
    );
    return createdBorrowerEarningStat.save();
  }

  createBorrowerEarningHistory(
    createBorrowerEarningHistoryDto: CreateBorrowerEarningHistoryDto,
  ) {
    const createdBorrowerEarningHistory = new this.borrowerEarningHistoryModel(
      createBorrowerEarningHistoryDto,
    );
    return createdBorrowerEarningHistory.save();
  }

  createLenderInfo(createLenderInfoDto: CreateLenderInfoDto) {
    const createdLenderInfo = new this.lenderInfoModel(createLenderInfoDto);
    return createdLenderInfo.save();
  }

  getAllBadgeRequests() {
    return this.badgeRequestsModel.find().exec();
  }

  getAllBorrowerEarningStats() {
    return this.borrowerEarningStatModel.find().exec();
  }

  getAllBorrowerEarningHistory() {
    return this.borrowerEarningHistoryModel.find().exec();
  }

  getAllLenderInfo() {
    return this.lenderInfoModel.find().exec();
  }
}
