import { Metaplex } from '@metaplex-foundation/js';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { Model } from 'mongoose';
import {
  BadgeRecordStatusEnum,
  BadgeRequestStatusEnum,
} from '../shared/enum/guilds.enum';
import {
  BadgeRecords,
  BadgeRecordsDocument,
} from './schemas/badge-records.schema';
import {
  BadgeRequests,
  BadgeRequestsDocument,
} from './schemas/badge-requests.schema';
import { Transaction } from '@solana/web3.js';

@Injectable()
export class GuildsService {
  private connection = new Connection(clusterApiUrl('devnet'));
  // private connection = new Connection(constant.SOLANA_API);
  private metaplex = new Metaplex(this.connection);

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

  updateBadgeRecord(publicKey: string, badgeType: string, mintAddress: string) {
    return this.badgeRecordsModel.findOneAndUpdate(
      {
        publicKey,
        badgeType,
        mintAddress,
        status: BadgeRecordStatusEnum.DRAFT,
      },
      { status: 'pending' },
      { new: true },
    );
  }

  raiseBadgeRequest(requesterPublicKey: string, badgeType: string) {
    return this.badgeRequestsModel.create({
      requesterPublicKey,
      badgeType,
      status: BadgeRequestStatusEnum.ACTIVE,
    });
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

  getMyBadges(publicKey: string) {
    return this.metaplex.nfts().findAllByOwner({
      owner: new PublicKey(publicKey),
    });
  }

  getMintAddress(encodetransaction: any) {
    const decodedTransaction = Transaction.from(Buffer.from(encodetransaction, 'base64'));
    const mintAddress = decodedTransaction.signatures[1].publicKey.toString();
    return mintAddress;
  }
}
