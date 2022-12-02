import { Metaplex } from '@metaplex-foundation/js';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  clusterApiUrl,
  Connection,
  Transaction,
  PublicKey,
} from '@solana/web3.js';
import { Model } from 'mongoose';
import { BuyBadgeDto } from './dto/buy-badge.dto';
import { UpdateBadgeRecordDto } from './dto/update-badge-record.dto';
import { BadgeRecordStatusEnum, BadgeTypeEnum } from './enum/guilds.enum';
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
  private connection = new Connection(clusterApiUrl('devnet'));
  private metaplex = new Metaplex(this.connection);

  constructor(
    @InjectModel(BadgeRecords.name)
    private badgeRecordsModel: Model<BadgeRecordsDocument>,
    @InjectModel(BadgeRequests.name)
    private badgeRequestsModel: Model<BadgeRequestsDocument>,
    private readonly httpService: HttpService,
  ) {}

  getBadgeRecords(publicKey: string) {
    return this.badgeRecordsModel.find({
      publicKey,
      status: {
        $in: [BadgeRecordStatusEnum.PENDING, BadgeRecordStatusEnum.SUCCESS],
      },
    });
  }

  async getBadges(publicKey: string) {
    const records = await this.getBadgeRecords(publicKey);
    if (!records.length) {
      const myNfts = await this.metaplex.nfts().findAllByOwner({
        owner: new PublicKey(publicKey),
      });
      myNfts.forEach(async ({ name, symbol, mintAddress }: any) => {
        if (symbol === 'GARI') {
          const badgeType =
            name === 'Petite Pyro' || name === 'Iron Creator'
              ? BadgeTypeEnum.CREATOR
              : BadgeTypeEnum.USER;
          const status = BadgeRecordStatusEnum.SUCCESS;
          await this.badgeRecordsModel.updateOne(
            {
              publicKey,
              badgeType,
              mintAddress,
              status,
            },
            {
              publicKey,
              badgeType,
              mintAddress,
              status,
            },
            { upsert: true },
          );
        }
      });
      return await this.getBadgeRecords(publicKey);
    } else return records;
  }

  async buyBadge(body: BuyBadgeDto) {
    const { publicKey, badgeType } = body;
    const badgeRecord = await this.badgeRecordsModel.findOne({
      publicKey,
      badgeType,
      status: 'draft',
    });
    let response: any, rawTransaction: any;
    if (badgeRecord) {
      response = await this.httpService.axiosRef.post(
        `${process.env.NFT_SERVICE_URL}/nft/V2/update`,
        {
          usdToGari: 1,
          userPublicKey: publicKey,
          mint: badgeRecord.mintAddress,
          badge: '2x',
          type: badgeType,
        },
      );
      rawTransaction = response.data.transaction;
      return { badgeRecord, rawTransaction };
    } else {
      response = await this.httpService.axiosRef.post(
        `${process.env.NFT_SERVICE_URL}/nft/V2/create`,
        {
          usdToGari: 1,
          userPublicKey: publicKey,
          badge: '2x',
          type: badgeType,
          feePayer: publicKey,
        },
      );
      rawTransaction = response.data.transaction;
      const buffer = Buffer.from(rawTransaction, 'base64');
      const decodedTransaction = Transaction.from(buffer);
      const mintAddress = decodedTransaction.signatures[1].publicKey;
      const newBadgeRecord = await this.badgeRecordsModel.create({
        publicKey,
        badgeType,
        mintAddress,
        status: 'draft',
      });
      return { badgeRecord: newBadgeRecord, rawTransaction };
    }
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
