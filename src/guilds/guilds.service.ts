import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BadgeRecordStatusEnum,
  BadgeTypeEnum,
} from '../shared/enum/guilds.enum';
import { UpdateBadgeRecordDto } from './dto/update-badge-record.dto';
import {
  BadgeRecords,
  BadgeRecordsDocument,
} from './schemas/badge-records.schema';
import {
  BadgeRequests,
  BadgeRequestsDocument,
} from './schemas/badge-requests.schema';

@Injectable()
export class GuildsService {
  constructor(
    @InjectModel(BadgeRecords.name)
    private badgeRecordsModel: Model<BadgeRecordsDocument>,
    @InjectModel(BadgeRequests.name)
    private badgeRequestsModel: Model<BadgeRequestsDocument>,
  ) {}

  getBadgeRecords(publicKey: string) {
    return this.badgeRecordsModel.find({
      publicKey,
      status: {
        $in: [BadgeRecordStatusEnum.PENDING, BadgeRecordStatusEnum.SUCCESS],
      },
    });
  }

  addBadgeRecord(doc: any) {
    return this.badgeRecordsModel.create(doc);
  }

  addDraftBadgeRecord(
    publicKey: string,
    badgeType: string,
    mintAddress: string,
  ) {
    return this.badgeRecordsModel.create({
      publicKey,
      badgeType,
      mintAddress,
      status: BadgeRecordStatusEnum.DRAFT,
    });
  }

  updateBadgeRecord(body: UpdateBadgeRecordDto) {
    const { publicKey, badgeType, mintAddress } = body;
    return this.badgeRecordsModel.findOneAndUpdate(
      { publicKey, badgeType, mintAddress, status: 'draft' },
      { status: 'pending' },
      { new: true },
    );
  }

  raiseBadgeRequest(body: any) {
    return this.badgeRequestsModel.create({ ...body, status: 'pending' });
  }

  cancelBadgeRequest(requestId: string) {
    return this.badgeRequestsModel.findByIdAndUpdate(
      requestId,
      { status: 'cancelled' },
      { new: true },
    );
  }

  getMinerInfo(userIds: any) {
    return userIds.map(() => ({
      name: 'Navnath Parte',
      joinDate: '12 Jan, 2022',
      totalVideosUploaded: 10,
      followers: 100,
      following: 1000,
      contributionScore: 67,
      gariEarnedViaMining: 2400,
    }));
  }

  getLiveBadgeRequests() {
    return this.badgeRequestsModel.find({ status: 'pending' }).lean();
  }

  updateBadgeRequest(body: any) {
    const { requestId, lenderId, lenderPublicKey, mintAddress, signature } =
      body;
    return this.badgeRequestsModel.findByIdAndUpdate(
      requestId,
      {
        lenderId,
        lenderPublicKey,
        mintAddress,
        allotmentDate: new Date(),
        signature,
        status: 'lent',
      },
      { new: true },
    );
  }

  getLenderPortfolio(lenderPublicKey: string) {
    return this.badgeRequestsModel.find({
      lenderPublicKey,
      status: 'lent',
    });
  }
}
